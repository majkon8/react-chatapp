import { mongoose } from "../mongoose";
import {
  Conversation,
  IMembers,
  IConversationDocument,
} from "../models/conversation.model";
import { IMessageDocument } from "../models/message.model";
import { Response } from "express";
import { Req } from "../middlewares/auth";
import { User, IUserDocument } from "../models/user.model";

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

// SET CONVERSATION TO DISPLAYED
export const displayLastMessage = async (conversationId: string) => {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { isDisplayed: true }
    );
    return updatedConversation;
  } catch (error) {
    console.error(error);
  }
};

export interface IConversationWithUsers extends IConversationDocument {
  user: IUserDocument | null;
}

// GET ALL USERS'S CONVERSATIONS
export const getAll = async (req: Req, res: Response) => {
  try {
    const user = req.user;
    const conversations = await Conversation.find({
      "members.ids": mongoose.Types.ObjectId(user?._id),
    }).sort({ updatedAt: "descending" });
    const conversationsAndUsers = <IConversationWithUsers[]>[
      ...conversations.map((conversation) => conversation.toObject()),
    ];
    for (const conversation of conversationsAndUsers) {
      const otherUserId =
        conversation.members.ids.filter(
          (id) => id.toHexString() !== user?._id
        )[0] ||
        // then it is a conversation with user himself
        user?._id;
      const conversationUser = await User.findById(otherUserId);
      conversation.user = conversationUser;
    }
    res.send(conversationsAndUsers);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
