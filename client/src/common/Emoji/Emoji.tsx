import React from "react";
import "./Emoji.scss";

interface IProps {
  label: string;
  emote: string;
  handleClick?(emote: string): void;
}

const Emoji = ({ label, emote, handleClick }: IProps) => (
  <span
    onClick={handleClick ? () => handleClick(emote) : () => ""}
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {emote}
  </span>
);
export default Emoji;
