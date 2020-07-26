import React, { ChangeEvent } from "react";
import "./ChatInput.scss";

interface IProps {
  hasIcon: boolean;
  value: string;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function ChatInput({ hasIcon, value, handleChange }: IProps) {
  const inputMarkup = hasIcon ? (
    <div className="control has-icons-left">
      <input
        type="text"
        className="chat-input input is-rounded"
        placeholder="Search for users..."
        onChange={(e) => handleChange(e)}
        value={value}
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
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
  return <div className="chat-input-container">{inputMarkup}</div>;
}
