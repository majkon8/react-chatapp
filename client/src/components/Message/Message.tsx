import React, { useState } from "react";
import "./Message.scss";
import moment from "moment";
import File from "../../common/File/File";
import { BrowserView, MobileView } from "react-device-detect";
// redux
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux/store";
import { IFile } from "../../redux/reducers/dataReducer";

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isOwnMessage: boolean;
  body: string;
  type: "text" | "image" | "video" | "other";
  file: IFile;
  createdAt: string;
  isLast: boolean;
}

type Props = PropsFromRedux & IProps;

export function formatDate(date: string) {
  if (moment().format("DD.MM.YYYY") === moment(date).format("DD.MM.YYYY")) {
    return moment(date).format("HH:mm");
  } else if (moment().format("YYYY") === moment(date).format("YYYY")) {
    return moment(date).format("DD.MM, HH:mm");
  } else {
    return moment(date).format("DD.MM.YYYY, HH:mm");
  }
}

function Message({
  isOwnMessage,
  UI,
  data,
  user,
  body,
  type,
  file,
  createdAt,
  isLast,
}: Props) {
  const textColor = [
    "rgb(127, 219, 255)",
    "rgb(1, 255, 112)",
    "rgb(255, 220, 0)",
    "rgb(221, 221, 221)",
  ].includes(UI.color)
    ? "#333"
    : "#eee";

  const formattedCreatedAt = formatDate(createdAt);

  const shouldShowIsDisplayed = () => {
    const conversation = data.conversations?.filter(
      (conversation) => conversation._id === data.selectedConversation?.id
    )[0];
    return (
      isOwnMessage &&
      // check if conversation which is currently selected is displayed
      conversation?.isDisplayed &&
      conversation?.lastMessage.authorId === user.authenticatedUser?._id &&
      isLast
    );
  };

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
        {shouldShowIsDisplayed() && (
          <img
            className="is-displayed-indicator"
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
          {type === "other" && <File name={file.name} url={file.url} />}
          {type === "image" && (
            <img className="image-small" src={file.url}></img>
          )}
          {type === "video" && (
            <>
              <BrowserView>
                <video className="video" controls>
                  <source src={file.url}></source>
                </video>
              </BrowserView>
              {/* displays thumbnail on mobile browsers */}
              <MobileView>
                <video preload="metadata" className="video" controls>
                  <source src={`${file.url}#t=0.01`}></source>
                </video>
              </MobileView>
            </>
          )}
        </span>
      </div>
      <span className="chat-message-time">{formattedCreatedAt}</span>
    </div>
  );
}

export default connector(Message);
