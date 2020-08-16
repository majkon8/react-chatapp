import React, { useEffect } from "react";
import "./Conversation.scss";
import { formatDate } from "../Message/Message";
import TypingIndicator from "../../common/TypingIndicator/TypingIndicator";
import DeleteConversation from "../DeleteConversation/DeleteConversation";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setIsChatOpen } from "../../redux/actions/uiActions";
import {
  setSelectedConversation,
  getInitialMessages,
  deleteConversation,
} from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";
import { IFile, IMessage } from "../../redux/reducers/dataReducer";

const mapStateToProps = (state: IState) => ({ UI: state.UI, data: state.data });
const mapActionsToProps = {
  setIsChatOpen,
  setSelectedConversation,
  getInitialMessages,
  deleteConversation,
};
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isActive?: boolean;
  isNew: boolean;
  lastMessage?: IMessage;
  username: string;
  userId: string;
  id: string;
  isTyping?: boolean;
  isDisplayed?: boolean;
  handleActive(id: string): void;
}

type Props = PropsFromRedux & IProps;

function Conversation({
  isActive,
  isNew,
  lastMessage,
  username,
  userId,
  id,
  isTyping,
  isDisplayed,
  handleActive,
  setIsChatOpen,
  setSelectedConversation,
  getInitialMessages,
  deleteConversation,
}: Props) {
  useEffect(() => {
    if (isActive) {
      selectNewConversation(id);
      if (!isNew) getInitialMessages(id, 20);
      else getInitialMessages(null);
    }
  }, [isActive]);

  const isMessageDeleted =
    lastMessage?.type === "text" && lastMessage.body === "";

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
      {!isNew && (
        <DeleteConversation
          conversationId={id}
          deleteConversation={deleteConversation}
        />
      )}
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
        {!isNew && lastMessage?.createdAt && !isTyping && (
          <span
            className={
              isDisplayed
                ? "conversation-message"
                : "conversation-message-not-displayed"
            }
          >
            <span>{formatDate(lastMessage.createdAt)} &middot; </span>
            {/* if there is no message body and message is not deleted, then there is only a file in the message */}
            {!isMessageDeleted && (
              <span className="conversation-message-body">
                {lastMessage.body ? lastMessage.body : lastMessage.file?.name}
              </span>
            )}
            {isMessageDeleted && (
              <span className="conversation-message-deleted">
                Message deleted
              </span>
            )}
          </span>
        )}
        {isTyping && (
          <TypingIndicator showImage={false} changeBackgroundColor={true} />
        )}
      </div>
    </div>
  );
}

export default connector(Conversation);
