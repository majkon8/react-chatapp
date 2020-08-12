import { mongoose } from "../mongoose";
import { Message } from "../models/message.model";
import { updateLastMessage } from "../controlers/conversation.controller";
import { Response } from "express";
import { Conversation } from "../models/conversation.model";
import { Req } from "../middlewares/auth";

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
    await Conversation.setConversationToNotDisplayed(newMessage.conversationId);
    return newMessage;
  } catch (error) {
    console.error(error);
  }
};

// DELETE MESSAGE
export const deleteMessage = async (messageId: string) => {
  try {
    const updatedMessage = await Message.setMessageToDeleted(messageId);
    const conversationOfUpdatedMessage = await Conversation.findById(
      updatedMessage?.conversationId
    );
    // if the last message was the deleted one then we need to change some data of it
    if (
      conversationOfUpdatedMessage?.lastMessage._id.toHexString() === messageId
    )
      conversationOfUpdatedMessage.setLastMessageToDeleted();
  } catch (error) {
    console.error(error);
  }
};

// GET MESSAGES OF CONVERSATION
export const getConversationMessages = async (req: Req, res: Response) => {
  try {
    const conversationId = req.params.conversationId;
    const count = +req.params.count;
    const messages = await Message.getMessagesOfConversation(
      conversationId,
      count,
      req.user!._id
    );
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
