import mongoose, { Schema, Document, Model } from "mongoose";
import { IFile } from "./message.model";
import { User } from "./user.model";

interface ILastMessage {
  _id: mongoose.Types.ObjectId;
  body: string;
  createdAt: Date;
  authorId: mongoose.Types.ObjectId;
  type: "text" | "image" | "video" | "other";
  file: IFile;
}

export interface IMembers {
  ids: mongoose.Types.ObjectId[];
  usernames: string[];
}

export interface IConversationDocument extends Document {
  members: IMembers;
  lastMessage: ILastMessage;
  isDisplayed: boolean;
  setLastMessageToDeleted(): Promise<void>;
}

export interface IConversationModel extends Model<IConversationDocument> {
  setConversationToNotDisplayed(
    conversationId: mongoose.Types.ObjectId
  ): Promise<void>;

  updateLastMessage(
    conversationId: mongoose.Types.ObjectId,
    lastMessage: ILastMessage
  ): Promise<void>;

  displayLastMessage(
    conversationId: string
  ): Promise<IConversationDocument | null>;

  getUserConversations(
    userId: string | undefined
  ): Promise<IConversationDocument[]>;
}

const ConversationSchema: Schema = new Schema(
  {
    members: {
      ids: { type: [Schema.Types.ObjectId], required: true },
      usernames: { type: [String], required: true },
    },
    lastMessage: {
      _id: Schema.Types.ObjectId,
      body: String,
      createdAt: Date,
      authorId: Schema.Types.ObjectId,
      type: { type: String },
      file: { name: String, url: String },
    },
    isDisplayed: { type: Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

/*** Instance methods ***/

ConversationSchema.methods.setLastMessageToDeleted = async function () {
  const conversation = this;
  conversation.lastMessage.type = "text";
  conversation.lastMessage.body = "";
  conversation.save();
};

/*** Model methods (static methods) ***/

ConversationSchema.statics.setConversationToNotDisplayed = async function (
  conversationId: mongoose.Types.ObjectId
) {
  const Conversation = this;
  await Conversation.findByIdAndUpdate(conversationId, {
    isDisplayed: false,
  });
};

ConversationSchema.statics.updateLastMessage = async function (
  conversationId: mongoose.Types.ObjectId,
  lastMessage: ILastMessage
) {
  const Conversation = this;
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage,
  });
};

ConversationSchema.statics.displayLastMessage = async function (
  conversationId: string
) {
  const Conversation = this;
  return await Conversation.findByIdAndUpdate(conversationId, {
    isDisplayed: true,
  });
};

ConversationSchema.statics.getUserConversations = async function (
  userId: string
) {
  const Conversation = this;
  const deletedConversations = await User.getDeletedConversations(userId);
  return await Conversation.find({
    "members.ids": mongoose.Types.ObjectId(userId),
    _id: { $nin: deletedConversations },
  }).sort({ updatedAt: "descending" });
};

ConversationSchema.statics.getUserDeletedConversations = async function (
  userId: string
) {
  return await Conversation.find({
    "members.ids": mongoose.Types.ObjectId(userId),
  });
};

export const Conversation: IConversationModel = mongoose.model<
  IConversationDocument,
  IConversationModel
>("Conversation", ConversationSchema);
