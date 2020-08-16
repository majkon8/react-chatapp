import React from "react";
import "./UserForward.scss";
import { IConversation } from "../../redux/reducers/dataReducer";

interface IProps {
  sent: boolean;
  conversation: IConversation;
  sendMessage(conversationId: string, username: string, userId: string): void;
  addUserToSent(userId: string): void;
}

export default function UserForward({
  sent,
  conversation,
  sendMessage,
  addUserToSent,
}: IProps) {
  const handleSend = () => {
    if (sent) return;
    sendMessage(
      conversation._id,
      conversation.user.username,
      conversation.user._id
    );
    addUserToSent(conversation.user._id);
  };

  return (
    <div className="user-forward-container">
      <img
        src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
        alt="user"
      />
      <p className="user-forward-username">{conversation.user.username}</p>
      <button
        onClick={handleSend}
        className="button is-primary is-outlined user-forward-button"
        disabled={sent}
      >
        {sent ? "Sent" : "Send"}
      </button>
    </div>
  );
}
