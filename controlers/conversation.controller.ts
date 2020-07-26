import { Conversation } from "../models/conversation.model";
import { Request, Response } from "express";

// CREATE CONVERSATION
export const create = async (req: Request, res: Response) => {
  try {
    const body: string[] = req.body;
    const newConversation = new Conversation(body);
    await newConversation.save();
    return res.send("success");
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};
