import React from "react";
import "./ChatInput.scss";

interface IProps {
  hasIcon: boolean;
}

export default function ChatInput({ hasIcon }: IProps) {
  const inputMarkup = hasIcon ? (
    <div className="control has-icons-left">
      <input
        type="text"
        className="chat-input input is-rounded"
        placeholder="Search for users..."
      />
      <span className="icon is-small is-left">
        <i className="fa fa-search"></i>
      </span>
    </div>
  ) : (
    <input
      type="text"
      className="chat-input input is-rounded"
      placeholder="New message..."
    />
  );
  return <div className="chat-input-container">{inputMarkup}</div>;
}
