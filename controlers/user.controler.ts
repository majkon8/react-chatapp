import { User } from "../models/user.model";

// GET ONE USER
export const findUser = async (req: any, res: any) => {
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
export const update = async (req: any, res: any) => {
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
export const signup = async (req: any, res: any) => {
  const body = req.body;
  const newUser = new User(body);
  try {
    await newUser.save();
    const refreshToken = await newUser.createSession();
    const accessToken = await newUser.generateAccessAuthToken();
    res.header("x-refresh-token", refreshToken);
    res.header("x-access-token", accessToken);
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// LOG IN
export const login = async (req: any, res: any) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    const user = await User.findByCredentials(email, password);
    const refreshToken = await user.createSession();
    // Session created successfully - refreshToken returned.
    // now we generate an access auth token for the user
    const accessToken = await user.generateAccessAuthToken();
    res.header("x-refresh-token", refreshToken);
    res.header("x-access-token", accessToken);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
