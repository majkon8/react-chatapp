import React from "react";
import "./ConversationsList.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Conversation from "../Conversation/Conversation";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setIsChatOpen } from "../../redux/actions/uiActions";

const mapActionsToProps = { setIsChatOpen };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  isChatOpen: boolean;
};

function ConversationsList({ isChatOpen, setIsChatOpen }: Props) {
  const handleChatOpen = () => setIsChatOpen(true);
  return (
    <ul className={`conversations-list-container ${isChatOpen && "is-closed"}`}>
      <SimpleBar style={{ maxHeight: "calc(100vh - 70px)" }}></SimpleBar>
    </ul>
  );
}

export default connector(ConversationsList);
