import { io } from "./index";
import * as messages from "./controlers/message.controller";
import { tokenAuthSocket } from "./middlewares/auth";
import { mongoose } from "./mongoose";

export type Socket = SocketIO.Socket & { userId: string };

io.use(tokenAuthSocket);

io.on("connection", (socket: Socket) => {
  console.log(`Connected ${socket.userId}`);

  socket.on("disconnect", () => console.log(`Disconnected ${socket.userId}`));

  socket.on("sendMessage", async (messageBody: string) => {
    try {
      const newMessage = {
        conversationId: mongoose.Types.ObjectId("123456789123456789123456"),
        authorId: mongoose.Types.ObjectId(socket.userId),
        body: messageBody,
      };
      const createdMessage = await messages.create(newMessage);
      if (createdMessage) return io.emit("receiveMessage", createdMessage);
    } catch (error) {
      console.error(error);
    }
  });
});
