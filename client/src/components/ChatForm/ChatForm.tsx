import React, { useState, ChangeEvent, FormEvent } from "react";
import "./ChatForm.scss";
import ChatInput from "../../common/ChatInput/ChatInput";
// redux
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ data: state.data });
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { socket: SocketIOClient.Socket | null };

function ChatForm({ data, socket }: Props) {
  const [messageBody, setMessageBody] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMessageBody(event.target.value);

  const submitChatMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data.selectedConversation) return;
    const message = {
      body: messageBody,
      conversation: data.selectedConversation,
    };
    socket?.emit("sendMessage", message);
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

export default connector(ChatForm);
