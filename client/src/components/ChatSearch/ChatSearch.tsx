import React from "react";
import "./ChatSearch.scss";
import ChatInput from "../../common/ChatInput/ChatInput";

interface IProps {
  isChatOpen: boolean;
}

export default function ChatSearch({ isChatOpen }: IProps) {
  return (
    <div className={`chat-search-container ${isChatOpen && "is-closed"}`}>
      <ChatInput hasIcon={true} />
    </div>
  );
}
