import { User } from "../models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { transporter } from "../helpers/mailerConfig";

interface ISignupBody {
  email: string;
  username: string;
  password: string;
  birthDate: string;
}

// GET ONE USER
export const findUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// UPDATE USER
export const update = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body.result },
      { new: true }
    );
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// CREATE USER (SIGN UP)
export const signup = async (req: Request, res: Response) => {
  const body: ISignupBody = req.body;
  try {
    const newUser = new User(body);
    const refreshToken = await newUser.generateToken();
    const temporaryToken = await newUser.generateToken();
    newUser.refreshToken = refreshToken;
    newUser.temporaryToken = temporaryToken;
    await newUser.save();
    const mailOptions = newUser.createEmail(true);
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(400).send(error);
      return res.send("success");
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// LOG IN
export const login = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    const user = await User.findByCredentials(email, password);
    if (!user.confirmed)
      return res.status(400).send({ error: "Account not confirmed" });
    const refreshToken = user.refreshToken;
    const accessToken = await user.generateToken(true);
    res.header("x-refresh-token", refreshToken);
    res.header("x-access-token", accessToken);
    return res.send("success");
  } catch (error) {
    console.error(error);
    if (error.error === "User not found") res.status(404);
    else res.status(400);
    return res.send(error);
  }
};

// CONFIRM AN ACCOUNT
export const confirmAccount = async (req: Request, res: Response) => {
  const temporaryToken = req.params.token;
  let decodedToken: any;
  try {
    jwt.verify(temporaryToken, User.getJWTSecret(), (error, decoded) => {
      if (error) return res.status(400).send(error);
      decodedToken = decoded;
    });
    const user = await User.findOne({
      _id: decodedToken!._id,
      temporaryToken,
    });
    if (!user) res.status(404).send({ error: "User not found" });
    user!.confirmed = true;
    await user?.save();
    return res.send("success");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// SEND FORGOT PASSWORD EMAIL
export const forgotPassword = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "User not found" });
    const temporaryToken = await user.generateToken(true);
    user.temporaryToken = temporaryToken;
    await user.save();
    const mailOptions = user.createEmail(false);
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(400).send(error);
      return res.send("success");
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  const newPassword: string = req.body.newPassword;
  const temporaryToken: string = req.body.token;
  let decodedToken: any;
  try {
    jwt.verify(temporaryToken, User.getJWTSecret(), (error, decoded) => {
      if (error) return res.status(400).send(error);
      decodedToken = decoded;
    });
    const user = await User.findOne({
      _id: decodedToken!._id,
      temporaryToken,
    });
    if (!user) return res.status(404).send({ error: "User not found" });
    user.password = newPassword;
    await user.save();
    res.send("success");
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

// LOG IN WITH FACEBOOK/GOOGLE
export const externalLogin = async (req: Request, res: Response) => {
  const body: ISignupBody = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    // user already created an account with that email address internally
    if (user && !user.createdExternally)
      res.status(400).send({ error: "Email already registered" });
    // create new account with user's facebook/google data and log him in
    if (!user) {
      const newUser = new User(body);
      const refreshToken = await newUser.generateToken();
      const temporaryToken = await newUser.generateToken();
      newUser.refreshToken = refreshToken;
      newUser.temporaryToken = temporaryToken;
      newUser.createdExternally = true;
      newUser.confirmed = true;
      await newUser.save();
      const accessToken = await newUser.generateToken(true);
      res.header("x-refresh-token", refreshToken);
      res.header("x-access-token", accessToken);
      res.send("success");
    }
    // log in with facebook/google data
    if (user && user.createdExternally) {
      const refreshToken = user.refreshToken;
      const accessToken = await user.generateToken(true);
      res.header("x-refresh-token", refreshToken);
      res.header("x-access-token", accessToken);
      return res.send("success");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
