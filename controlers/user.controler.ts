import { User } from "../models/user.model";
import { Request, Response } from "express";
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";

// GET ONE USER
export const findUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
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
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// CREATE USER (SIGN UP)
export const signup = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newUser = new User(body);
    const refreshToken = await newUser.generateToken();
    const temporaryToken = await newUser.generateToken();
    newUser.refreshToken = refreshToken;
    newUser.temporaryToken = temporaryToken;
    await newUser.save();
    const mailOptions = newUser.createConfirmationEmail();
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(400).send(error);
      return res.send("success");
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// LOG IN
export const login = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    const user = await User.findByCredentials(email, password);
    const refreshToken = user.refreshToken;
    const accessToken = await user.generateToken(true);
    res.header("x-refresh-token", refreshToken);
    res.header("x-access-token", accessToken);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// CONFIRM AN ACCOUNT
export const confirmAccount = async (req: Request, res: Response) => {
  const temporaryToken = req.params.token;
  let decodedToken: any;
  jwt.verify(temporaryToken, User.getJWTSecret(), (error, decoded) => {
    if (error) return res.status(400).send(error);
    decodedToken = decoded;
  });
  const user = await User.findOne({
    _id: decodedToken!._id,
    temporaryToken,
  }).exec();
  if (!user) res.status(400).send({ error: "User not found" });
  user!.confirmed = true;
  await user?.save();
  return res.send("success");
};

// HELPERS

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "majkonserver@gmail.com",
    pass: "hp l1706",
  },
});
