import { NextFunction } from "express";
import { Socket } from "../socket";
import { User } from "../models/user.model";
import { verify } from "jsonwebtoken";

export function tokenAuthSocket(socket: Socket, next: NextFunction) {
  try {
    const accessToken = socket.handshake.query.accessToken;
    const secretKey = User.getJWTSecret();
    verify(accessToken, secretKey, (error: any, decodedToken: any) => {
      if (error) throw new Error(error);
      else {
        socket.userId = decodedToken._id;
        next();
      }
    });
  } catch (error) {
    console.error(error);
  }
}
