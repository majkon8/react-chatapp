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
  // contains ids of users that deleted the conversation in which the message is in
  isDeletedConversationBy: string[];
  reactionEmote: string;
}

export interface IMessageModel extends Model<IMessageDocument> {
  setMessageToDeleted(messageId: string): Promise<IMessageDocument | null>;

  getMessagesOfConversation(
    conversationId: string,
    count: number,
    userId: string
  ): Promise<IMessageDocument[]>;

  addToIsDeletedConversationBy(
    conversationId: string,
    userId: string
  ): Promise<void>;

  toggleMessageReactionEmote(messageId: string, emote: string): Promise<string>;
}

const MessageSchema: Schema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true },
    body: String,
    type: { type: String, required: true },
    file: { name: String, url: String },
    isDeletedConversationBy: [String],
    reactionEmote: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

/*** Instane methods ****/

MessageSchema.methods.toJSON = function (): Object {
  const message = this;
  const { inDeletedConversationBy, ...messageObject } = message.toObject();
  // return the document except fields that shouldn't be made available
  return messageObject;
};

/*** Model methods (static methods) ***/

MessageSchema.statics.setMessageToDeleted = async function (messageId: string) {
  const Message = this;
  return await Message.findByIdAndUpdate(messageId, {
    body: "",
    type: "text",
    file: undefined,
    emote: "",
  });
};

MessageSchema.statics.getMessagesOfConversation = async function (
  conversationId: string,
  count: number,
  userId: string
) {
  const Message = this;
  const messages = await Message.find({
    conversationId,
    isDeletedConversationBy: { $ne: userId },
  })
    .limit(count)
    .sort({
      createdAt: "descending",
    });
  return messages.reverse();
};

MessageSchema.statics.addToIsDeletedConversationBy = async function (
  conversationId: string,
  userId: string
) {
  const Message = this;
  const messages: IMessageDocument[] = await Message.find({ conversationId });
  for (const message of messages) {
    message.isDeletedConversationBy = [
      ...message.isDeletedConversationBy,
      userId,
    ];
    await message.save();
  }
};

MessageSchema.statics.toggleMessageReactionEmote = async function (
  messageId: string,
  emote: string
) {
  const Message = this;
  const message: IMessageDocument = await Message.findById(messageId);
  if (!message.body && !message.file) return ""; // message is deleted
  if (message.reactionEmote === emote) message.reactionEmote = "";
  else message.reactionEmote = emote;
  message.save();
  return message.reactionEmote;
};

export const Message: IMessageModel = mongoose.model<
  IMessageDocument,
  IMessageModel
>("Message", MessageSchema);
