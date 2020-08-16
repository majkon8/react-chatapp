import React, { useState, ChangeEvent } from "react";
import "./ForwardModal.scss";
import { createPortal } from "react-dom";
import { useOuterClick } from "../../hooks/hooks";
import ChatInput from "../../common/ChatInput/ChatInput";
import SimpleBar from "simplebar-react";
import { useWindowWidth } from "../../hooks/hooks";
import UserForward from "../UserForward/UserForward";
import { IConversation, IMessage } from "../../redux/reducers/dataReducer";

interface IForwardModalProps {
  conversations: IConversation[];
  message: IMessage;
  socket: SocketIOClient.Socket | null;
  handleClose(): void;
}

export default function ForwardModal({
  conversations,
  message,
  socket,
  handleClose,
}: IForwardModalProps) {
  const [slideOut, setSlideOut] = useState(false);
  const innerRef = useOuterClick(() => {
    handleClick();
  });
  const windowWidth = useWindowWidth();
  const [filteredConversations, setFilteredConversations] = useState(
    conversations
  );
  const [sentToUsers, setSentToUsers] = useState<string[]>([]);

  const filterUsers = (event: ChangeEvent<HTMLInputElement>) => {
    const usernameToSearch = event.target.value;
    setFilteredConversations(
      conversations.filter((conversation) =>
        conversation.user.username
          .toLowerCase()
          .includes(usernameToSearch.toLowerCase())
      )
    );
  };

  const handleClick = () => {
    setSlideOut(true);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  const sendMessage = (
    conversationId: string,
    username: string,
    userId: string
  ) => {
    const messageData = {
      body: message.body,
      type: message.type,
      file: message.file,
      conversation: { new: false, id: conversationId, username, userId },
    };
    socket?.emit("sendMessage", messageData);
  };

  const addUserToSent = (userId: string) =>
    setSentToUsers([...sentToUsers, userId]);

  return createPortal(
    <div
      className={`forward-users-container background-darken ${
        slideOut && "background-lighten"
      }`}
    >
      <div
        className={`forward-users-list-container slide-in ${
          slideOut && "slide-out"
        }`}
        ref={innerRef}
      >
        <SimpleBar
          style={{
            maxHeight: windowWidth && windowWidth > 768 ? "500px" : "100vh",
          }}
        >
          <div className="forward-users-list">
            <button
              onClick={handleClick}
              className="forward-close action-trigger"
            >
              <i className="fas fa-times"></i>
            </button>
            <h1>Forward message</h1>
            <ChatInput
              handleChange={filterUsers}
              icon="fa fa-search"
              placeholder="Search for users..."
            />
            {filteredConversations.map((conversation) => (
              <UserForward
                key={conversation._id}
                conversation={conversation}
                sent={sentToUsers.includes(conversation.user._id)}
                sendMessage={sendMessage}
                addUserToSent={addUserToSent}
              />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>,
    // @ts-ignore
    document.getElementById("main-container")
  );
}
