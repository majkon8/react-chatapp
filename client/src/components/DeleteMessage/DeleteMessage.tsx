import React from "react";
import "./DeleteMessage.scss";

interface IProps {
  socket: SocketIOClient.Socket | null;
  messageId: string;
  otherUserId: string;
}

export default function DeleteMessage({
  socket,
  messageId,
  otherUserId,
}: IProps) {
  const handleMessageDelete = () =>
    socket?.emit("deleteMessage", {
      messageId,
      otherUserId,
    });

  return (
    <div onClick={handleMessageDelete} className="chat-message-delete">
      <i className="far fa-trash-alt"></i>
    </div>
  );
}
