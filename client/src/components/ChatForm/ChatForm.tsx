import React from "react";
import "./ChatForm.scss";
import ChatInput from "../../common/ChatInput/ChatInput";

export default function ChatForm() {
  return (
    <div className="chat-form-container">
      <ChatInput hasIcon={false} />
    </div>
  );
}
