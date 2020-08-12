import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFile {
  name: string;
  url: string;
}

export interface IMessageDocument extends Document {
  conversationId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  body: string;
  type: "text" | "image" | "video" | "other";
  file: IFile;
  createdAt: Date;
}

export interface IMessageModel extends Model<IMessageDocument> {
  setMessageToDeleted(messageId: string): Promise<IMessageDocument | null>;

  getMessagesOfConversation(
    conversationId: string,
    count: number
  ): Promise<IMessageDocument[]>;
}

const MessageSchema: Schema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true },
    body: String,
    type: { type: String, required: true },
    file: { name: String, url: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

/*** Model methods (static methods) ***/

MessageSchema.statics.setMessageToDeleted = async function (messageId: string) {
  const Message = this;
  return await Message.findByIdAndUpdate(messageId, {
    body: "",
    type: "text",
    file: undefined,
  });
};

MessageSchema.statics.getMessagesOfConversation = async function (
  conversationId: string,
  count: number
) {
  const Message = this;
  const messages = await Message.find({ conversationId }).limit(count).sort({
    createdAt: "descending",
  });
  return messages.reverse();
};

export const Message: IMessageModel = mongoose.model<
  IMessageDocument,
  IMessageModel
>("Message", MessageSchema);
