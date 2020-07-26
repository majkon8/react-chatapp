import React, { ChangeEvent } from "react";
import "./ChatSearch.scss";
import ChatInput from "../../common/ChatInput/ChatInput";

interface IProps {
  isChatOpen: boolean;
}

export default function ChatSearch({ isChatOpen }: IProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={`chat-search-container ${isChatOpen && "is-closed"}`}>
      <ChatInput handleChange={handleChange} hasIcon={true} value="" />
    </div>
  );
}
