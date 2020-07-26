import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessageDocument extends Document {
  conversationId: string;
  authorId: string;
  body: string;
}

export interface IMessageModel extends Model<IMessageDocument> {}

const messageSchema: Schema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message: IMessageModel = mongoose.model<
  IMessageDocument,
  IMessageModel
>("Message", messageSchema);
