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
  console.log(`Connected ${socket.user._id}`);
  socket.join(socket.user._id);

  socket.on("disconnect", () => console.log(`Disconnected ${socket.user._id}`));

  socket.on("sendMessage", async (message: IMessage) => {
    try {
      let conversationId;
      if (message.conversation.new) {
        const members = {
          ids: [
            mongoose.Types.ObjectId(socket.user._id),
            mongoose.Types.ObjectId(message.conversation.userId),
          ],
          usernames: [socket.user.username, message.conversation.username],
        };
        const newConversation = await conversations.create(members);
        conversationId = newConversation?._id;
      } else conversationId = message.conversation.id;
      const newMessage = {
        conversationId: mongoose.Types.ObjectId(conversationId),
        authorId: mongoose.Types.ObjectId(socket.user._id),
        body: message.body,
      };
      const createdMessage = await messages.create(newMessage);
      if (createdMessage)
        return io
          .in(message.conversation.userId)
          .in(socket.user._id)
          .emit("receiveMessage", createdMessage);
    } catch (error) {
      console.error(error);
    }
  });
});
