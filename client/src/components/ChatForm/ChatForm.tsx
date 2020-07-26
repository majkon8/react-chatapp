import React, { useState, ChangeEvent, FormEvent } from "react";
import "./ChatForm.scss";
import ChatInput from "../../common/ChatInput/ChatInput";

interface IProps {
  socket: SocketIOClient.Socket | null;
}

export default function ChatForm({ socket }: IProps) {
  const [messageBody, setMessageBody] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMessageBody(event.target.value);

  const submitChatMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket?.emit("sendMessage", messageBody);
    setMessageBody("");
  };

  return (
    <form className="chat-form-container" onSubmit={submitChatMessage}>
      <ChatInput
        handleChange={handleChange}
        isSearchInput={false}
        value={messageBody}
      />
      <button
        className="button is-rounded submit-button"
        type="submit"
        disabled={messageBody.length === 0}
      >
        Send
      </button>
    </form>
  );
}
