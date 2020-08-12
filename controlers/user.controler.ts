import { User } from "../models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { transporter } from "../helpers/mailerConfig";
import { Req } from "../middlewares/auth";

interface ISignupBody {
  email: string;
  username: string;
  password: string;
  birthDate: string;
}

// GET AUTHENTICATED USER
export const getAuthenticatedUser = async (req: Req, res: Response) => {
  try {
    const refreshToken = req.get("x-refresh-token");
    const userId = req.user?._id;
    const user = await User.findByIdAndRefreshToken(userId, refreshToken);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// SEARCH FOR USERS BY NAME
export const searchForUsers = async (req: Req, res: Response) => {
  try {
    const username = req.params.username;
    const usernameRegex = new RegExp(username);
    const users = await User.findByUsername(usernameRegex);
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// CREATE USER (SIGN UP)
export const signup = async (req: Request, res: Response) => {
  try {
    const body: ISignupBody = req.body;
    const newUser = new User(body);
    await newUser.createTokens();
    await newUser.save();
    const mailOptions = newUser.createEmail(true);
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(400).json(error);
      return res.json("success");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// LOG IN
export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user.confirmed)
      return res.status(400).json({ error: "Account not confirmed" });
    const refreshToken = user.refreshToken;
    const accessToken = await user.generateToken(true);
    res.header("x-refresh-token", refreshToken);
    res.header("x-access-token", accessToken);
    return res.json(user);
  } catch (error) {
    console.error(error);
    if (error.error === "User not found") res.status(404);
    else res.status(400);
    return res.json(error);
  }
};

// CONFIRM AN ACCOUNT
export const confirmAccount = async (req: Request, res: Response) => {
  try {
    const temporaryToken = req.params.token;
    let decodedToken: any;
    jwt.verify(temporaryToken, User.getJWTSecret(), (error, decoded) => {
      if (error) return res.status(400).json(error);
      decodedToken = decoded;
    });
    const user = await User.findByIdAndTemporaryToken(
      decodedToken._id,
      temporaryToken
    );
    if (!user) res.status(404).json({ error: "User not found" });
    user!.confirmed = true;
    await user?.save();
    return res.json("success");
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// SEND FORGOT PASSWORD EMAIL
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const temporaryToken = await user.generateToken(true);
    user.temporaryToken = temporaryToken;
    await user.save();
    const mailOptions = user.createEmail(false);
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(400).json(error);
      return res.json("success");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const newPassword: string = req.body.newPassword;
    const temporaryToken: string = req.body.token;
    let decodedToken: any;
    jwt.verify(temporaryToken, User.getJWTSecret(), (error, decoded) => {
      if (error) return res.status(400).json(error);
      decodedToken = decoded;
    });
    const user = await User.findByIdAndTemporaryToken(
      decodedToken._id,
      temporaryToken
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    user.password = newPassword;
    await user.save();
    res.json("success");
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// LOG IN WITH FACEBOOK/GOOGLE
export const externalLogin = async (req: Request, res: Response) => {
  try {
    const body: ISignupBody = req.body;
    const user = await User.findOne({ email: body.email });
    // user already created an account with that email address internally
    if (user && !user.createdExternally)
      return res.status(400).json({ error: "Email already registered" });
    // create new account with user's facebook/google data and log him in
    if (!user) {
      const newUser = new User(body);
      await newUser.createTokens();
      newUser.createdExternally = true;
      newUser.confirmed = true;
      const createdUser = await newUser.save();
      const accessToken = await newUser.generateToken(true);
      res.header("x-refresh-token", createdUser.refreshToken);
      res.header("x-access-token", accessToken);
      return res.json("success");
    }
    // log in with facebook/google data
    if (user && user.createdExternally) {
      const refreshToken = user.refreshToken;
      const accessToken = await user.generateToken(true);
      res.header("x-refresh-token", refreshToken);
      res.header("x-access-token", accessToken);
      return res.json(user);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// REFRESH ACCESS TOKEN
export const refreshAccessToken = (req: Req, res: Response) => {
  const refreshToken = req.get("x-refresh-token");
  if (!refreshToken)
    return res.status(400).json({ error: "No refresh token provided" });
  jwt.verify(refreshToken, User.getJWTSecret(), (error, decoded: any) => {
    if (error) {
      console.error(error);
      return res.status(400).json(error);
    }
    jwt.sign(
      { _id: decoded._id, username: decoded.username },
      User.getJWTSecret(),
      { expiresIn: "10m" },
      (error, token) => {
        if (error) {
          console.error(error);
          return res.status(400).json(error);
        }
        return res.json(token);
      }
    );
  });
};
