import { mongoose } from "../mongoose";
import { Conversation, IMembers } from "../models/conversation.model";
import { IMessageDocument } from "../models/message.model";
import { Response } from "express";
import { Req } from "../middlewares/auth";

// CREATE CONVERSATION
export const create = async (members: IMembers) => {
  try {
    const newConversation = new Conversation({ members });
    await newConversation.save();
    return newConversation;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE CONVERSATION LAST MESSAGE
export const updateLastMessage = async (message: IMessageDocument) => {
  try {
    const lastMessage = {
      body: message.body,
      authorId: message.authorId,
      createdAt: message.createdAt,
    };
    await Conversation.findByIdAndUpdate(message.conversationId, {
      lastMessage,
    });
  } catch (error) {
    console.error(error);
  }
};

// GET ALL USERS'S CONVERSATIONS
export const getAll = async (req: Req, res: Response) => {
  try {
    const user = req.user;
    const conversations = await Conversation.find({
      "members.ids": mongoose.Types.ObjectId(user?._id),
    });
    res.send(conversations);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
