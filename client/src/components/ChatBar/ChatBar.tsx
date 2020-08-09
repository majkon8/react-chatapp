import React from "react";
import "./ChatBar.scss";
import Settings from "../Settings/Settings";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setIsChatOpen } from "../../redux/actions/uiActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({
  data: state.data,
});
const mapActionsToProps = { setIsChatOpen };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ChatBar({ data, setIsChatOpen }: Props) {
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <div className="chat-bar-container">
      <div onClick={handleChatClose} className="return-icon">
        <i className="fa fa-angle-left"></i>
      </div>
      {data.selectedConversation && (
        <div className="user-info">
          <img
            src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
            alt="user"
          />
          <div className="title-active-container">
            <span className="conversation-title"></span>
            <span className="last-active"></span>
          </div>
        </div>
      )}
      <Settings />
    </div>
  );
}

export default connector(ChatBar);
