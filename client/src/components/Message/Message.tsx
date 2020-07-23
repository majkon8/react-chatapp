import React from "react";
import "./Message.scss";
// redux
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { isMineMessage: boolean };

function Message({ isMineMessage, UI }: Props) {
  const textColor = [
    "rgb(127, 219, 255)",
    "rgb(1, 255, 112)",
    "rgb(255, 220, 0)",
    "rgb(221, 221, 221)",
  ].includes(UI.color)
    ? "#333"
    : "#eee";

  return (
    <div
      className={`chat-message-container ${
        isMineMessage ? "mine-chat-message" : "other-chat-message"
      }`}
    >
      <div className="chat-message-content">
        {!isMineMessage && (
          <img
            className="chat-message-user-image"
            src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
            alt="user"
          ></img>
        )}
        <span
          style={{
            backgroundColor: isMineMessage ? UI.color : "",
            borderColor: isMineMessage ? UI.color : "",
            color: isMineMessage ? textColor : "",
          }}
          className="chat-message-text"
        >
          Hello mate, how are you?
        </span>
      </div>
      <span className="chat-message-time">23.07.2020, 17:22</span>
    </div>
  );
}

export default connector(Message);
