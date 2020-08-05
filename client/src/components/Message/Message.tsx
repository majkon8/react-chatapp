import React from "react";
import "./Message.scss";
// redux
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isOwnMessage: boolean;
  body: string;
  createdAt: string;
}

type Props = PropsFromRedux & IProps;

export function formatDate(date: string) {
  const now = new Date();
  const nowDay = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();
  const dateDay = date.slice(8, 10);
  const dateMonth = date.slice(5, 7);
  const dateYear = date.slice(0, 4);
  const formattedTime = date.slice(11, 16);
  if (
    nowYear === +dateYear &&
    nowMonth + 1 === +dateMonth &&
    nowDay === +dateDay
  ) {
    return formattedTime;
  } else if (nowYear === +dateYear) {
    return `${dateDay}.${dateMonth}, ${formattedTime}`;
  } else {
    return `${dateDay}.${dateMonth}.${dateYear}, ${formattedTime}`;
  }
}

function Message({ isOwnMessage, UI, body, createdAt }: Props) {
  const textColor = [
    "rgb(127, 219, 255)",
    "rgb(1, 255, 112)",
    "rgb(255, 220, 0)",
    "rgb(221, 221, 221)",
  ].includes(UI.color)
    ? "#333"
    : "#eee";

  const formattedCreatedAt = formatDate(createdAt);

  return (
    <div
      className={`chat-message-container ${
        isOwnMessage ? "own-chat-message" : "other-chat-message"
      }`}
    >
      <div className="chat-message-content">
        {!isOwnMessage && (
          <img
            className="chat-message-user-image"
            src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
            alt="user"
          ></img>
        )}
        <span
          style={{
            backgroundColor: isOwnMessage ? UI.color : "",
            borderColor: isOwnMessage ? UI.color : "",
            color: isOwnMessage ? textColor : "",
          }}
          className="chat-message-text"
        >
          {body}
        </span>
      </div>
      <span className="chat-message-time">{formattedCreatedAt}</span>
    </div>
  );
}

export default connector(Message);
