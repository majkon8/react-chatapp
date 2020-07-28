import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from "moment/moment";
import process from "process";

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
  createdExternally: boolean;
  generateToken(temporary?: boolean): Promise<string>;
  createEmail(isConfirmationEmail: boolean): IMailOptions;
}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
  findByIdAndToken(
    _id: string | undefined,
    token: string | undefined
  ): IUserDocument;
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
    minlength: [3, "Username too short"],
    trim: true,
  },
  password: {
    // not required for facebook/google signed up users
    type: String,
    minlength: [8, "Password too short"],
    validate: {
      validator: (password: string) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password),
      message: "Password too weak",
    },
  },
  birthDate: {
    type: Date,
    validate: {
      validator: (date: Date) => validAge(date),
      message: "Minimum age is 13",
    },
  },
  refreshToken: String,
  temporaryToken: String, // used for reseting password and confirming user account
  confirmed: { type: Boolean, required: true, default: false },
  createdExternally: { type: Boolean, required: true, default: false },
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
      { _id: user._id.toHexString(), username: user.username },
      jwtSecret,
      { expiresIn: temporary ? "10m" : "9999 years" },
      (error, token) => {
        if (!error) resolve(token);
        else reject(error);
      }
    );
  });
};

UserSchema.methods.createEmail = function (isConfirmationEmail: boolean) {
  const user = this;
  const baseUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "localhost:3001"
      : `https://safe-falls-82651.herokuapp.com`;
  const text = isConfirmationEmail
    ? `Hello, visit the page below to confirm your account. 
${baseUrl}/confirm/${user.temporaryToken}`
    : `Hello, visit the page below to reset your password. 
The link will expire in 10 minutes of sending the email.
${baseUrl}/reset/${user.temporaryToken}`;
  const mailOptions = {
    from: "majkonserver@gmail.com",
    to: user.email,
    subject: "Confirm your ChatApp account",
    text,
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
  if (!user) return Promise.reject({ error: "User not found" });
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (error, res) => {
      if (res) {
        resolve(user);
      } else {
        reject({ error: "Wrong password" });
      }
    });
  });
};

UserSchema.statics.findByIdAndToken = async function (
  _id: string | undefined,
  token: string | undefined
) {
  const User = this;
  const user: IUserDocument = await User.findOne({ _id, refreshToken: token });
  return user;
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
