import { io } from "./index";
import * as messages from "./controlers/message.controller";
import * as conversations from "./controlers/conversation.controller";
import { tokenAuthSocket, IDecodedUser } from "./middlewares/auth";
import { mongoose } from "./mongoose";
import { User, IUserDocument } from "./models/user.model";
import { IConversationDocument } from "./models/conversation.model";
import { IFile, IReplyData } from "./models/message.model";

interface IConversation {
  new: boolean;
  id: string;
  userId: string;
  username: string;
}

interface IMessage {
  body: string;
  type: "text" | "image" | "video" | "other";
  file: IFile;
  conversation: IConversation;
  replyData: IReplyData;
}

export type Socket = SocketIO.Socket & { user: IDecodedUser };

io.use(tokenAuthSocket);

io.on("connection", (socket: Socket) => {
  socket.join(socket.user._id);
  socket.on("sendMessage", async (message: IMessage) => {
    try {
      let conversationId: string;
      let messageConversation: IConversationDocument | undefined | null;
      // first if message starts a new conversation
      if (message.conversation.new) {
        // first check if the sender had conversation with that user but deleted it, if yes then undelete conversation instead of creating new one
        const deletedConversationsIds =
          (await conversations.getUserDeletedConversationsIds(
            socket.user._id
          )) || [];
        const deletedConversations: IConversationDocument[] = [];
        for (const conversationId of deletedConversationsIds) {
          const conversation = await conversations.get(conversationId);
          if (conversation) deletedConversations.push(conversation);
        }
        const deletedConversation = deletedConversations.filter(
          (conversation) =>
            conversation.members.ids.includes(
              mongoose.Types.ObjectId(message.conversation.userId)
            )
        );
        if (deletedConversation.length === 0) {
          const members = {
            ids: [
              mongoose.Types.ObjectId(socket.user._id),
              mongoose.Types.ObjectId(message.conversation.userId),
            ],
            usernames: [socket.user.username, message.conversation.username],
          };
          messageConversation = await conversations.create(members);
          // we need the conversationId in order to save message to database
          conversationId = messageConversation?._id;
        } else {
          conversationId = deletedConversation[0].id;
          messageConversation = {
            ...deletedConversation[0].toObject(),
            isDisplayed: false,
          };
          await conversations.undeleteConversation(
            conversationId,
            socket.user._id
          );
        }
      } else {
        conversationId = message.conversation.id;
        // undelete conversation for the receiver in case he deleted the conversation
        await conversations.undeleteConversation(
          conversationId,
          message.conversation.userId
        );
      }
      const newMessage = {
        conversationId: mongoose.Types.ObjectId(conversationId),
        authorId: mongoose.Types.ObjectId(socket.user._id),
        body: message.body,
        type: message.type,
        file: message.file,
        replyData: message.replyData,
      };
      const createdMessage = await messages.create(newMessage);
      // in this case, we need to get the message conversation after we create new message
      if (!messageConversation)
        messageConversation = await conversations.get(conversationId);
      if (createdMessage) {
        let sender: IUserDocument | null | undefined;
        let receiver: IUserDocument | null | undefined;
        // now we need to get both users from conversations to send them back and set to conversation
        sender = await User.findById(socket.user._id);
        receiver = await User.findById(message.conversation.userId);
        return (
          io
            //emit created message both to sender and receiver
            .in(message.conversation.userId)
            .in(socket.user._id)
            .emit("receiveMessage", {
              createdMessage,
              messageConversation: messageConversation,
              sender,
              receiver,
            })
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("displayMessage", async (conversationId: string) => {
    try {
      const updatedConversation = await conversations.displayLastMessage(
        conversationId
      );
      return io
        .in(updatedConversation?.members.ids[0])
        .in(updatedConversation?.members.ids[1])
        .emit("messageDisplayed", updatedConversation);
    } catch (error) {
      console.error(error);
    }
  });

  interface IMessageToDeleteData {
    messageId: string;
    otherUserId: string;
  }

  socket.on(
    "deleteMessage",
    async (messageToDeleteData: IMessageToDeleteData) => {
      try {
        await messages.deleteMessage(messageToDeleteData.messageId);
        return io
          .in(socket.user._id)
          .in(messageToDeleteData.otherUserId)
          .emit("messageDeleted", messageToDeleteData.messageId);
      } catch (error) {
        console.error(error);
      }
    }
  );

  interface ITypingData {
    isTyping: boolean;
    userIdToReemit: string;
  }

  socket.on("isTyping", (typingData: ITypingData) => {
    return io.in(typingData.userIdToReemit).emit("receiveIsTyping", {
      isTyping: typingData.isTyping,
      userId: socket.user._id,
    });
  });

  socket.on(
    "reactToMessage",
    async (messageId: string, emote: string, otherUserId: string) => {
      try {
        const emoteToSend = await messages.toggleMessageReactionEmote(
          messageId,
          emote
        );
        return io
          .in(socket.user._id)
          .in(otherUserId)
          .emit("reactedToMessage", messageId, emoteToSend);
      } catch (error) {
        console.error(error);
      }
    }
  );
});
