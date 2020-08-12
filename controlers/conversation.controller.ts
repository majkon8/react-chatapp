import {
  Conversation,
  IMembers,
  IConversationDocument,
} from "../models/conversation.model";
import { IMessageDocument, Message } from "../models/message.model";
import { Response } from "express";
import { Req } from "../middlewares/auth";
import { User, IUserDocument } from "../models/user.model";

// GET CONVERSATION
export const get = async (conversationId: string) => {
  try {
    return await Conversation.findById(conversationId);
  } catch (error) {
    console.error(error);
  }
};

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
      _id: message.id,
      body: message.body,
      type: message.type,
      file: message.file,
      authorId: message.authorId,
      createdAt: message.createdAt,
    };
    await Conversation.updateLastMessage(message.conversationId, lastMessage);
  } catch (error) {
    console.error(error);
  }
};

// SET CONVERSATION TO DISPLAYED
export const displayLastMessage = async (conversationId: string) => {
  try {
    const updatedConversation = await Conversation.displayLastMessage(
      conversationId
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
    const conversations = await Conversation.getUserConversations(user!._id);
    const conversationsAndUsers = <IConversationWithUsers[]>[
      ...conversations.map((conversation) => conversation.toObject()),
    ];
    for (const conversation of conversationsAndUsers) {
      const otherUserId =
        conversation.members.ids.filter(
          (id) => id.toHexString() !== user!._id
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

// DELETE CONVERSATION
export const deleteConversation = async (req: Req, res: Response) => {
  try {
    const conversationId = req.body.conversationId;
    const user = await User.findById(req.user!._id);
    await user?.addConversationToDeleted(conversationId);
    await Message.addToIsDeletedConversationBy(conversationId, req.user!._id);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// CHECK IF CONVERSATION IS IN USER'S DELETED CONVERSATIONS
export const isDeleted = async (userId: string, conversationId: string) => {
  try {
    const deletedConversationsIds = await getUserDeletedConversationsIds(
      userId
    );
    if (
      deletedConversationsIds &&
      deletedConversationsIds.includes(conversationId)
    )
      return true;
    return false;
  } catch (error) {
    console.error(error);
  }
};

// GET DELETED CONVERSATIONS ARRAY
export const getUserDeletedConversationsIds = async (userId: string) => {
  try {
    return await User.getDeletedConversations(userId);
  } catch (error) {
    console.error(error);
  }
};

// REMOVES CONVERSATION ID FROM DELETED ARRAY
export const undeleteConversation = async (
  conversationId: string,
  userId: string
) => {
  try {
    const user = await User.findById(userId);
    await user?.removeConversationFromDeleted(conversationId);
  } catch (error) {
    console.error(error);
  }
};
