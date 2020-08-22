import React, { ChangeEvent } from "react";
import "./ChatInput.scss";
import { DebounceInput } from "react-debounce-input";

interface IProps {
  value?: string;
  icon?: string;
  debounce?: boolean;
  placeholder: string;
  disabled?: boolean;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function ChatInput({
  value,
  icon,
  debounce,
  placeholder,
  disabled,
  handleChange,
}: IProps) {
  return (
    <div className="chat-input-container">
      <div className="control has-icons-left">
        {debounce && (
          <DebounceInput
            debounceTimeout={300}
            type="text"
            className="chat-input input is-rounded"
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            disabled={disabled}
          />
        )}
        {!debounce && (
          <input
            type="text"
            className="chat-input input is-rounded"
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            value={value}
            disabled={disabled}
          />
        )}
        {icon && (
          <span className="icon is-small is-left">
            <i className={icon}></i>
          </span>
        )}
      </div>
    </div>
  );
}
