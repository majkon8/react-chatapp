import React from "react";
import "./Forward.scss";

interface IProps {
  isOwnMessage: boolean;
}

export default function Forward({ isOwnMessage }: IProps) {
  return (
    <div
      title="Forward"
      className={`forward-container ${
        isOwnMessage ? "own-message-forward" : "other-message-forward"
      }`}
    >
      <div className="message-action-trigger">
        <i className="fas fa-external-link-alt"></i>
      </div>
    </div>
  );
}
