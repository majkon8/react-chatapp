import React, { ChangeEvent } from "react";
import "./ChatInput.scss";
import { DebounceInput } from "react-debounce-input";

interface IProps {
  isSearchInput: boolean;
  value?: string;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function ChatInput({
  isSearchInput,
  value,
  handleChange,
}: IProps) {
  const inputMarkup = isSearchInput ? (
    <div className="control has-icons-left">
      <DebounceInput
        debounceTimeout={300}
        type="text"
        className="chat-input input is-rounded"
        placeholder="Search for users..."
        onChange={(e) => handleChange(e)}
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
