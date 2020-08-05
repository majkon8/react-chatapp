import React, { useEffect } from "react";
import "./Chat.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Message from "../Message/Message";

interface IMessage {
  conversationId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

interface IProps {
  socket: SocketIOClient.Socket | null;
}

export default function Chat({ socket }: IProps) {
  useEffect(() => {
    socket?.on("receiveMessage", (message: IMessage) => {
      console.log(message);
    });
    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <SimpleBar style={{ maxHeight: "calc(100vh - 140px)" }}></SimpleBar>
    </div>
  );
}
