import React from "react";
import "./Message.scss";
import moment from "moment";
import File from "../../common/File/File";
import { BrowserView, MobileView } from "react-device-detect";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import ReactionEmotes from "../ReactionEmotes/ReactionEmotes";
import Reply from "../Reply/Reply";
import Forward from "../Forward/Forward";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setImageUrlToOpen } from "../../redux/actions/uiActions";
import { IState } from "../../redux/store";
import { IMessage } from "../../redux/reducers/dataReducer";

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});
const mapActionsToProps = { setImageUrlToOpen };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  message: IMessage;
  isOwnMessage: boolean;
  isLast: boolean;
  socket: SocketIOClient.Socket | null;
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
  message,
  isLast,
  socket,
  setImageUrlToOpen,
}: Props) {
  const isMessageDeleted = message.type === "text" && message.body === "";

  const textColor = [
    "rgb(127, 219, 255)",
    "rgb(1, 255, 112)",
    "rgb(255, 220, 0)",
    "rgb(221, 221, 221)",
  ].includes(UI.color)
    ? "#333"
    : "#eee";

  const formattedCreatedAt = formatDate(message.createdAt);

  const shouldShowThatIsDisplayed = () => {
    const conversation = data.conversations?.filter(
      (conversation) => conversation._id === data.selectedConversation?.id
    )[0];
    return (
      isOwnMessage &&
      // check if conversation which is currently selected is displayed
      conversation?.isDisplayed &&
      conversation?.lastMessage.authorId === user.authenticatedUser!._id &&
      isLast
    );
  };

  const openFullImage = () => setImageUrlToOpen(message.file.url);

  const shorten = (text: String) => {
    return text.length <= 100 ? text : text.slice(0, 98) + "...";
  };

  return (
    <div
      className={`chat-message-container ${
        isOwnMessage ? "own-chat-message" : "other-chat-message"
      }`}
    >
      <div className="chat-message-content">
        {!isOwnMessage && !isMessageDeleted && (
          <ReactionEmotes
            socket={socket}
            messageId={message._id}
            otherUserId={data.selectedConversation!.userId}
          />
        )}
        {!isMessageDeleted && (
          <>
            <Reply
              isOwnMessage={isOwnMessage}
              to={
                isOwnMessage
                  ? user.authenticatedUser!.username
                  : data.selectedConversation!.username
              }
              body={message.body}
              fileName={message.file.name}
            />
            <Forward isOwnMessage={isOwnMessage} />
          </>
        )}
        {isOwnMessage && !isMessageDeleted && (
          <DeleteMessage
            socket={socket}
            messageId={message._id}
            otherUserId={data.selectedConversation!.userId}
          />
        )}
        {!isOwnMessage && (
          <img
            className="chat-message-user-image"
            src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
            alt="user"
          ></img>
        )}
        {shouldShowThatIsDisplayed() && (
          <img
            style={{
              right: message.reactionEmote ? -30 : -20,
              bottom: message.reactionEmote ? 3 : 5,
            }}
            className="is-displayed-indicator"
            src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
            alt="user"
          ></img>
        )}
        <div
          style={{
            backgroundColor: isOwnMessage ? UI.color : "",
            borderColor: isOwnMessage ? UI.color : "",
            color: isOwnMessage ? textColor : "",
          }}
          className="chat-message-text"
        >
          {isMessageDeleted && (
            <p className="chat-message-deleted">Message deleted</p>
          )}
          {!isMessageDeleted && message?.replyData && (
            <div className="chat-message-reply-data">
              <p>{message.replyData.to}:</p>
              <p>{shorten(message.replyData.body)}</p>
            </div>
          )}
          {!isMessageDeleted && message.body}
          {message.type === "other" && (
            <File name={message.file.name} url={message.file.url} />
          )}
          {message.type === "image" && (
            <img
              onClick={openFullImage}
              className="image-small"
              src={message.file.url}
            ></img>
          )}
          {message.type === "video" && (
            <>
              <BrowserView>
                <video className="video" controls>
                  <source src={message.file.url}></source>
                </video>
              </BrowserView>
              {/* displays thumbnail on mobile browsers */}
              <MobileView>
                <video preload="metadata" className="video" controls>
                  <source src={`${message.file.url}#t=0.01`}></source>
                </video>
              </MobileView>
            </>
          )}
        </div>
        {message.reactionEmote && (
          <span className="message-reaction-emotes-container">
            {message.reactionEmote}
          </span>
        )}
      </div>
      <p className="chat-message-time">{formattedCreatedAt}</p>
    </div>
  );
}

export default connector(Message);
