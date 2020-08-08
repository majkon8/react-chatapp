import { io } from "./index";
import * as messages from "./controlers/message.controller";
import * as conversations from "./controlers/conversation.controller";
import { tokenAuthSocket, IDecodedUser } from "./middlewares/auth";
import { mongoose } from "./mongoose";

interface IConversation {
  new: boolean;
  id: string;
  userId: string;
  username: string;
}

interface IMessage {
  body: string;
  conversation: IConversation;
}

export type Socket = SocketIO.Socket & { user: IDecodedUser };

io.use(tokenAuthSocket);

io.on("connection", (socket: Socket) => {
  socket.join(socket.user._id);
  socket.on("sendMessage", async (message: IMessage) => {
    try {
      let conversationId;
      let newConversation;
      // if message starts a new conversation
      if (message.conversation.new) {
        const members = {
          ids: [
            mongoose.Types.ObjectId(socket.user._id),
            // conversation id was a second user id
            mongoose.Types.ObjectId(message.conversation.userId),
          ],
          usernames: [socket.user.username, message.conversation.username],
        };
        newConversation = await conversations.create(members);
        // we need the conversationId in order to save message to database
        conversationId = newConversation?._id;
      } else conversationId = message.conversation.id;
      const newMessage = {
        conversationId: mongoose.Types.ObjectId(conversationId),
        authorId: mongoose.Types.ObjectId(socket.user._id),
        body: message.body,
      };
      const createdMessage = await messages.create(newMessage);
      if (createdMessage) {
        return (
          io
            //emit created message both to sender and receiver
            .in(message.conversation.userId)
            .in(socket.user._id)
            .emit("receiveMessage", {
              createdMessage,
              newConversation: message.conversation.new
                ? newConversation
                : null,
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
});
