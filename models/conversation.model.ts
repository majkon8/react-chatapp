import mongoose, { Schema, Document, Model } from "mongoose";

interface ILastMessage {
  body: string;
  createdAt: Date;
  authorId: mongoose.Types.ObjectId;
}

export interface IMembers {
  ids: mongoose.Types.ObjectId[];
  usernames: string[];
}

export interface IConversationDocument extends Document {
  members: IMembers;
  lastMessage: ILastMessage;
}

export interface IConversationModel extends Model<IConversationDocument> {}

const conversationSchema: Schema = new Schema({
  members: {
    ids: { type: [Schema.Types.ObjectId], required: true },
    usernames: { type: [String], required: true },
  },
  lastMessage: {
    body: String,
    createdAt: Date,
    authorId: Schema.Types.ObjectId,
  },
});

export const Conversation: IConversationModel = mongoose.model<
  IConversationDocument,
  IConversationModel
>("Conversation", conversationSchema);
