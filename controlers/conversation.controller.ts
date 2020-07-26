import { Conversation } from "../models/conversation.model";

// CREATE CONVERSATION
export const create = async (members: string[]) => {
  try {
    const newConversation = new Conversation(members);
    await newConversation.save();
    return newConversation;
  } catch (error) {
    console.error(error);
  }
};
