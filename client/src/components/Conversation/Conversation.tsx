import React, { useEffect } from "react";
import "./Conversation.scss";
import { formatDate } from "../Message/Message";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setIsChatOpen } from "../../redux/actions/uiActions";
import {
  setSelectedConversation,
  getMessages,
} from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";
import { IFile } from "../../redux/reducers/dataReducer";

const mapStateToProps = (state: IState) => ({ UI: state.UI, data: state.data });
const mapActionsToProps = {
  setIsChatOpen,
  setSelectedConversation,
  getMessages,
};
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isActive?: boolean;
  isNew: boolean;
  username: string;
  userId: string;
  id: string;
  messageBody?: string;
  type?: string;
  file?: IFile;
  createdAt?: string;
  isDisplayed?: boolean;
  handleActive(id: string): void;
}

type Props = PropsFromRedux & IProps;

function Conversation({
  isActive,
  isNew,
  username,
  userId,
  id,
  messageBody,
  type,
  file,
  createdAt,
  isDisplayed,
  handleActive,
  setIsChatOpen,
  setSelectedConversation,
  getMessages,
}: Props) {
  useEffect(() => {
    if (isActive) {
      selectNewConversation(id);
      if (!isNew) getMessages(id, 20);
      else getMessages(null);
    }
  }, [isActive]);

  const isMessageDeleted = type === "text" && messageBody === "";

  const handleChatOpen = () => setIsChatOpen(true);

  const selectNewConversation = (id: string) => {
    const conversation = { new: isNew === true, id, username, userId };
    setSelectedConversation(conversation);
  };

  const handleClick = () => {
    handleChatOpen();
    if (isActive) return;
    handleActive(id);
  };

  return (
    <div
      onClick={handleClick}
      className={`conversation-container ${isActive && "active-conversation"}`}
    >
      <img
        src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
        alt="user"
      />
      <div className="title-message-container">
        <span
          style={{ fontWeight: isDisplayed || isNew ? "normal" : "bold" }}
          className="conversation-title"
        >
          {username}
        </span>
        {!isNew && createdAt && (
          <span
            className={
              isDisplayed
                ? "conversation-message"
                : "conversation-message-not-displayed"
            }
          >
            {/* if there is no message body and message is not deleted, then there is only a file in the message */}
            {!isMessageDeleted && (messageBody ? messageBody : file?.name)}
            {isMessageDeleted && (
              <span className="conversation-message-deleted">
                Message deleted
              </span>
            )}
            <span> &middot; {formatDate(createdAt)}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default connector(Conversation);
