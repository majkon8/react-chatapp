import React from "react";
import "./Chat.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Message from "../Message/Message";

export default function Chat() {
  return (
    <div className="chat-container">
      <SimpleBar style={{ maxHeight: "calc(100vh - 140px)" }}>
        <Message isMineMessage={true} />
        <Message isMineMessage={false} />
        <Message isMineMessage={true} />
        <Message isMineMessage={false} />
        <Message isMineMessage={true} />
        <Message isMineMessage={true} />
        <Message isMineMessage={false} />
        <Message isMineMessage={true} />
        <Message isMineMessage={false} />
        <Message isMineMessage={false} />
        <Message isMineMessage={false} />
        <Message isMineMessage={true} />
        <Message isMineMessage={false} />
        <Message isMineMessage={true} />
        <Message isMineMessage={true} />
        <Message isMineMessage={true} />
        <Message isMineMessage={true} />
      </SimpleBar>
    </div>
  );
}
