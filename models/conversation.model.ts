import mongoose, { Schema, Document, Model } from "mongoose";
import { IFile } from "./message.model";

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
}

export interface IConversationModel extends Model<IConversationDocument> {}

const conversationSchema: Schema = new Schema(
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

export const Conversation: IConversationModel = mongoose.model<
  IConversationDocument,
  IConversationModel
>("Conversation", conversationSchema);
