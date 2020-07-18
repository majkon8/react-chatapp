import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import moment from "moment/moment";

const jwtSecret =
  "2Z9M3M0YNxb770Gqog2ZzCqyXJXFkFCj5u1elOo509DGbO8fo5TQslzqTW9e2JYS";

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

interface IUserDocument extends Document {
  email: string;
  username: string;
  password: string;
  birthDate: Date;
  refreshToken: string;
  temporaryToken: string;
  confirmed: boolean;
  generateToken(temporary?: boolean): Promise<string>;
  createConfirmationEmail(): IMailOptions;
}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
  getJWTSecret(): string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: 3,
    trim: true,
    unique: [true, "Email already used"],
    validate: {
      validator: (email: string) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: "Email address incorrect",
    },
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: 1,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password too short"],
    validate: {
      validator: (password: string) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password),
      message: "Password too weak",
    },
  },
  birthDate: {
    type: Date,
    required: [true, "Birth date is required"],
    validate: {
      validator: (date: Date) => validAge(date),
      message: "Minimum age is 13",
    },
  },
  refreshToken: String,
  temporaryToken: String, // used for reseting password and cofirming user account
  confirmed: { type: Boolean, required: true, default: false },
});

/*** Instance methods ***/

UserSchema.methods.toJSON = function (): Object {
  const user = this;
  const {
    password,
    refreshToken,
    temporaryToken,
    ...userObject
  } = user.toObject();
  // return the document except the password and tokens (these shouldn't be made available)
  return userObject;
};

UserSchema.methods.generateToken = function (
  temporary = false
): Promise<string> {
  const user = this;
  return new Promise((resolve, reject) => {
    // Create the JSON Web Token and return that
    jwt.sign(
      { _id: user._id.toHexString() },
      jwtSecret,
      { expiresIn: temporary ? "10m" : "9999 year" },
      (error, token) => {
        if (!error) resolve(token);
        else reject(error);
      }
    );
  });
};

UserSchema.methods.createConfirmationEmail = function () {
  const user = this;
  const mailOptions = {
    from: "majkonserver@gmail.com",
    to: user.email,
    subject: "Confirm your ChatApp account",
    text: `Hello, visit the link below to confirm your account. 
localhost:3001/confirm/${user.temporaryToken}`,
  };
  return mailOptions;
};

/*** Model methods (static methods) ***/

UserSchema.statics.getJWTSecret = () => jwtSecret;

UserSchema.statics.findByCredentials = async function (
  email: string,
  password: string
): Promise<IUserDocument> {
  const User = this;
  const user: IUserDocument = await User.findOne({ email });
  if (!user) return Promise.reject("User not found");
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (error, res) => {
      if (res) {
        resolve(user);
      } else {
        reject("Wrong password");
      }
    });
  });
};

/*** Middleware ***/

// hash password
UserSchema.pre<IUserDocument>("save", function (next) {
  const user = this;
  const costFactor = 10;
  if (user.isModified("password")) {
    bcrypt.genSalt(costFactor, (error, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        next();
      });
    });
  } else next();
});

/*** Helpers ***/

const validAge = (date: Date) => {
  const today = moment();
  const birthDay = moment(date, "DD-MM-YYYY");
  const difference = today.diff(birthDay, "years", true);
  if (difference <= 13) return false;
  return true;
};

export const User: IUserModel = mongoose.model<IUserDocument, IUserModel>(
  "User",
  UserSchema
);
