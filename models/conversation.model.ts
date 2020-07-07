import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConversationDocument extends Document {
  members: string[];
}

export interface IConversationModel extends Model<IConversationDocument> {}

const conversationSchema: Schema = new Schema({
  members: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
});

export const Conversation: IConversationModel = mongoose.model<IConversationDocument, IConversationModel>(
  "Conversation",
  conversationSchema
);
