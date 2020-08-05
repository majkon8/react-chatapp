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
  message?: string;
  createdAt?: string;
  handleActive(id: string): void;
}

type Props = PropsFromRedux & IProps;

function Conversation({
  isActive,
  isNew,
  username,
  userId,
  id,
  message,
  createdAt,
  handleActive,
  setIsChatOpen,
  setSelectedConversation,
  getMessages,
}: Props) {
  useEffect(() => {
    if (isActive) {
      selectNewConversation(id);
      getMessages(id);
      handleChatOpen();
    }
  }, [isActive]);

  const handleChatOpen = () => setIsChatOpen(true);

  const selectNewConversation = (id: string) => {
    const conversation = { new: isNew === true, id, username, userId };
    setSelectedConversation(conversation);
  };

  const handleClick = () => {
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
        <span className="conversation-title">{username}</span>
        {!isNew && createdAt && (
          <span className="conversation-message">
            {message}
            <span> &middot; {formatDate(createdAt)}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default connector(Conversation);
