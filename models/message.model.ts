import mongoose, { Schema, Document, Model } from "mongoose";

interface IFile {
  name: string;
  url: string;
}

export interface IMessageDocument extends Document {
  conversationId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  body: string;
  type: "text" | "image" | "other";
  file: IFile;
  createdAt: Date;
}

export interface IMessageModel extends Model<IMessageDocument> {}

const messageSchema: Schema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true },
    body: String,
    type: { type: String, required: true },
    file: { name: String, url: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Message: IMessageModel = mongoose.model<
  IMessageDocument,
  IMessageModel
>("Message", messageSchema);
