import { mongoose } from "../mongoose";
import { Message } from "../models/message.model";
import { updateLastMessage } from "../controlers/conversation.controller";
import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";

export interface IMessage {
  conversationId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  body: string;
}

// CREATE MESSAGE
export const create = async (message: IMessage) => {
  try {
    const newMessage = new Message(message);
    await newMessage.save();
    await updateLastMessage(newMessage);
    await Conversation.findByIdAndUpdate(newMessage.conversationId, {
      isDisplayed: false,
    });
    return newMessage;
  } catch (error) {
    console.error(error);
  }
};

// GET MESSAGES OF CONVERSATION
export const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({ conversationId }).sort({
      createdAt: "ascending",
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
