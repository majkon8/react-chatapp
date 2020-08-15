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
  const handleMessageDelete = () => {
    const confirmed = confirm(
      "Are you sure you want to delete the message? The process is irreversible"
    );
    if (confirmed)
      socket?.emit("deleteMessage", {
        messageId,
        otherUserId,
      });
  };

  return (
    <div
      title="Delete"
      onClick={handleMessageDelete}
      className="chat-message-delete"
    >
      <i className="far fa-trash-alt"></i>
    </div>
  );
}
