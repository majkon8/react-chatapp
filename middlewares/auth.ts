import { NextFunction } from "express";
import { Socket } from "../socket";
import { User } from "../models/user.model";
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";

const secretKey = User.getJWTSecret();

export interface IDecodedUser {
  _id: string;
  username: string;
}

export function tokenAuthSocket(socket: Socket, next: NextFunction) {
  try {
    const accessToken = socket.handshake.query.accessToken;
    verify(accessToken, secretKey, (error: any, decodedToken: any) => {
      if (error) throw new Error(error);
      else {
        socket.user = decodedToken;
        next();
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export type Req = Request & { user?: IDecodedUser };

export function tokenAuth(req: Req, res: Response, next: NextFunction) {
  const accessToken = req.get("x-access-token");
  if (!accessToken) return res.status(401).json({ error: "Unauthorized user" });
  verify(accessToken, secretKey, (error: any, decodedToken: any) => {
    if (error) return res.status(401).json(error);
    req.user = decodedToken;
    next();
  });
}
