import { mongoose } from "../mongoose";
import { Message } from "../models/message.model";
import { updateLastMessage } from "../controlers/conversation.controller";

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
    return newMessage;
  } catch (error) {
    console.error(error);
  }
};
