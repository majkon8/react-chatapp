import express from "express";
import bodyParser from "body-parser";
import path from "path";
import http from "http";
import "./mongoose";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

const userRoutes = require("./routes/user.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messagesRoutes = require("./routes/message.routes");
const fileRoutes = require("./routes/file.routes");
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messagesRoutes);
app.use("/files", fileRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = http.createServer(app);
export const io = require("socket.io")(server);
import "./socket";

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
