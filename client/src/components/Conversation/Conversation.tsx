import React from "react";
import "./Conversation.scss";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setIsChatOpen } from "../../redux/actions/uiActions";
import { setSelectedConversation } from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI, data: state.data });
const mapActionsToProps = { setIsChatOpen, setSelectedConversation };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isActive?: boolean;
  isNew: boolean;
  username: string;
  id: string;
  message?: string;
  handleActive(id: string): void;
}

type Props = PropsFromRedux & IProps;

function Conversation({
  isActive,
  isNew,
  username,
  id,
  message,
  handleActive,
  setIsChatOpen,
  setSelectedConversation,
}: Props) {
  const handleChatOpen = () => setIsChatOpen(true);

  const selectNewConversation = (id: string) => {
    const conversation = { new: isNew === true, id, username };
    setSelectedConversation(conversation);
  };

  const handleClick = () => {
    handleActive(id);
    handleChatOpen();
    selectNewConversation(id);
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
        {!isNew && (
          <span className="conversation-message">
            {message}
            <span> &middot; 13:43</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default connector(Conversation);
