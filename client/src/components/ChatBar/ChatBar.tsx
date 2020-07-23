import React from "react";
import "./ChatBar.scss";
import Settings from "../Settings/Settings";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setIsChatOpen } from "../../redux/actions/uiActions";

const mapActionsToProps = { setIsChatOpen };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ChatBar({ setIsChatOpen }: Props) {
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <div className="chat-bar-container">
      <div onClick={handleChatClose} className="return-icon">
        <i className="fa fa-angle-left"></i>
      </div>
      <div className="user-info">
        <img
          src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
          alt="user"
        />
        <div className="title-active-container">
          <span className="conversation-title">User Userski</span>
          <span className="last-active">Last active: 5 minutes ago</span>
        </div>
      </div>
      <Settings />
    </div>
  );
}

export default connector(ChatBar);
