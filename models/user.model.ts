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

export interface IUserDocument extends Document {
  email: string;
  username: string;
  password: string;
  birthDate: Date;
  bio: string;
  imageUrl: string;
  lastActive: Date | "now";
  refreshToken: string;
  temporaryToken: string;
  confirmed: boolean;
  createdExternally: boolean;
  deletedConversations: string[];
  generateToken(temporary?: boolean): Promise<string>;
  createEmail(isConfirmationEmail: boolean): IMailOptions;
  createTokens(): Promise<void>;
  addConversationToDeleted(conversationId: string): Promise<void>;
  removeConversationFromDeleted(conversationId: string): Promise<void>;
}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): Promise<IUserDocument>;

  findByIdAndRefreshToken(
    _id: string | undefined,
    token: string | undefined
  ): Promise<IUserDocument>;

  getJWTSecret(): string;
  findByUsername(usernameRegex: RegExp): Promise<IUserDocument[]>;

  findByIdAndTemporaryToken(
    _id: string | undefined,
    token: string | undefined
  ): Promise<IUserDocument>;

  getDeletedConversations(userId: string): Promise<string[] | undefined>;

  updateUserAccountDetails(
    userId: string,
    bio: string,
    username: string,
    imageUrl: string
  ): Promise<IUserDocument>;

  updateLastActive(userId: string, lastActive: string | Date): Promise<void>;
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
    maxlength: [30, "Username too long"],
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
  bio: { type: String, maxlength: 100 },
  imageUrl: String,
  lastActive: Schema.Types.Mixed,
  refreshToken: String,
  temporaryToken: String, // used for reseting password and confirming user account
  confirmed: { type: Boolean, required: true, default: false },
  createdExternally: { type: Boolean, required: true, default: false },
  deletedConversations: [String],
});

/*** Instance methods ***/

UserSchema.methods.toJSON = function (): Object {
  const user = this;
  const {
    password,
    refreshToken,
    temporaryToken,
    deletedConversations,
    ...userObject
  } = user.toObject();
  // return the document except fields that shouldn't be made available
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

UserSchema.methods.createTokens = async function () {
  const user = this;
  const refreshToken = await user.generateToken();
  const temporaryToken = await user.generateToken();
  user.refreshToken = refreshToken;
  user.temporaryToken = temporaryToken;
};

UserSchema.methods.addConversationToDeleted = async function (
  conversationId: string
) {
  const user = this;
  user.deletedConversations = [...user.deletedConversations, conversationId];
  user.save();
};

UserSchema.methods.removeConversationFromDeleted = async function (
  conversationId: string
) {
  const user = this;
  user.deletedConversations = [
    ...user.deletedConversations.filter(
      (deletedConversationId: string) =>
        deletedConversationId !== conversationId
    ),
  ];
  user.save();
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

UserSchema.statics.findByIdAndRefreshToken = async function (
  _id: string | undefined,
  refreshToken: string | undefined
) {
  const User = this;
  return await User.findOne({ _id, refreshToken });
};

UserSchema.statics.findByIdAndTemporaryToken = async function (
  _id: string | undefined,
  temporaryToken: string | undefined
) {
  const User = this;
  return await User.findOne({ _id, temporaryToken });
};

UserSchema.statics.findByUsername = async function (usernameRegex: RegExp) {
  const User: IUserModel = this;
  return await User.find({
    username: { $regex: usernameRegex, $options: "i" },
    confirmed: true,
  });
};

UserSchema.statics.getDeletedConversations = async function (userId: string) {
  const User: IUserModel = this;
  const user = await User.findById(userId);
  return user?.deletedConversations;
};

UserSchema.statics.updateUserAccountDetails = async function (
  userId: string,
  bio: string,
  username: string,
  imageUrl: string
) {
  const User: IUserModel = this;
  await User.findByIdAndUpdate(userId, { bio, username, imageUrl });
  const updatedUser = await User.findById(userId);
  return updatedUser;
};

UserSchema.statics.updateLastActive = async function (
  userId: string,
  lastActive: string | Date
) {
  const User = this;
  await User.findByIdAndUpdate(userId, { lastActive });
};

/*** Middleware ***/

// hash password
UserSchema.pre<IUserDocument>("save", function (next) {
  const User = this;
  const costFactor = 10;
  if (User.isModified("password")) {
    bcrypt.genSalt(costFactor, (error, salt) => {
      bcrypt.hash(User.password, salt, (error, hash) => {
        User.password = hash;
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
