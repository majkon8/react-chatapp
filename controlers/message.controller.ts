import { Message } from "../models/message.model";
import { mongoose } from "../mongoose";

export interface IMessage {
  conversationId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  body: string;
}

// CREATE CONVERSATION
export const create = async (message: IMessage) => {
  try {
    const newMessage = new Message(message);
    await newMessage.save();
    return newMessage;
  } catch (error) {
    console.error(error);
  }
};
