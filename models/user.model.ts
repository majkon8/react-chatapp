import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const jwtSecret =
  "2Z9M3M0YNxb770Gqog2ZzCqyXJXFkFCj5u1elOo509DGbO8fo5TQslzqTW9e2JYS";

export interface IToken {
  token: string;
  expiresAt: number;
}

export interface IUserDocument extends Document {
  email: string;
  password: string;
  sessions: IToken[];
  resetPasswordToken: IToken;
  generateAccessAuthToken(): Promise<string>;
  generateToken(): Promise<void>;
  createSession(): Promise<string>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Number,
        required: true,
      },
    },
  ],
  resetPasswordToken: {
    token: {
      type: String,
    },
    expiresAt: {
      type: Number,
    },
  },
});

/*** Instance methods ***/

UserSchema.methods.toJSON = function (): Object {
  const user = this;
  const {
    password,
    sessions,
    resetPasswordToken,
    ...userObject
  } = user.toObject();
  // return the document except the password and sessions (these shouldn't be made available)
  return userObject;
};

UserSchema.methods.generateAccessAuthToken = function (): Promise<string> {
  const user = this;
  return new Promise((resolve, reject) => {
    // Create the JSON Web Token and return that
    jwt.sign(
      { _id: user._id.toHexString() },
      jwtSecret,
      { expiresIn: "10m" },
      (error, token) => {
        if (!error) resolve(token);
        else reject(error);
      }
    );
  });
};

UserSchema.methods.generateToken = async function (): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (error, buf) => {
      if (!error) {
        const token = buf.toString("hex");
        return resolve(token);
      } else {
        reject(error);
      }
    });
  });
};

UserSchema.methods.createSession = async function (): Promise<string> {
  const user = this;
  try {
    const refreshToken = await user.generateToken();
    await saveSessionToDatabase(user, refreshToken);
    return refreshToken;
  } catch (error) {
    throw new Error("Failed to save session to database.\n" + error.toString());
  }
};

/*** Model methods (static methods) ***/

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
        reject(error);
      }
    });
  });
};

/*** Middleware ***/

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

const saveSessionToDatabase = async (user: any, refreshToken: string) => {
  const expiresAt = generateRefreshTokenExpiryTime();
  user.sessions.push({ token: refreshToken, expiresAt });
  try {
    await user.save();
    // saved session successfully
    return refreshToken;
  } catch (error) {
    Promise.reject(error.toString());
  }
};

const generateRefreshTokenExpiryTime = () => {
  const daysUntilExpire = "10";
  const secondsUntilExpire = +daysUntilExpire * 24 * 60 * 60;
  return Date.now() / 1000 + secondsUntilExpire;
};

export const User: IUserModel = mongoose.model<IUserDocument, IUserModel>(
  "User",
  UserSchema
);