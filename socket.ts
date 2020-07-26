import { io } from "./index";
import * as messages from "./controlers/message.controller";
import * as conversations from "./controlers/conversation.controller";
import { tokenAuthSocket } from "./middlewares/auth";
import { mongoose } from "./mongoose";

interface IConversation {
  new: boolean;
  id: string;
}

interface IMessage {
  body: string;
  conversation: IConversation;
}

export type Socket = SocketIO.Socket & { userId: string };

io.use(tokenAuthSocket);

io.on("connection", (socket: Socket) => {
  console.log(`Connected ${socket.userId}`);

  socket.on("disconnect", () => console.log(`Disconnected ${socket.userId}`));

  socket.on("sendMessage", async (message: IMessage) => {
    try {
      let conversationId;
      if (message.conversation.new) {
        const members = [socket.userId, message.conversation.id];
        const newConversation = await conversations.create(members);
        conversationId = newConversation?._id;
      } else conversationId = message.conversation.id;
      const newMessage = {
        conversationId: mongoose.Types.ObjectId(conversationId),
        authorId: mongoose.Types.ObjectId(socket.userId),
        body: message.body,
      };
      const createdMessage = await messages.create(newMessage);
      if (createdMessage) return io.emit("receiveMessage", createdMessage);
    } catch (error) {
      console.error(error);
    }
  });
});