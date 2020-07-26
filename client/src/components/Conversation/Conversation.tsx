import React from "react";
import "./Conversation.scss";

interface IProps {
  isActive?: boolean;
  isNew: boolean;
  username: string;
  handleChatOpen(): void;
}

export default function Conversation({
  isActive = false,
  isNew,
  username,
  handleChatOpen,
}: IProps) {
  return (
    <div
      onClick={handleChatOpen}
      className={`conversation-container ${isActive && "active-conversation"}`}
    >
      <img
        src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
        alt="user"
      />
      <div className="title-message-container">
        <span className="conversation-title">{username}</span>
        {!isNew && (
          <span className="conversation-message">
            Hello man<span> &middot; 13:43</span>
          </span>
        )}
      </div>
    </div>
  );
}
