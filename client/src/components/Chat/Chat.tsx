import React, { useEffect, useRef, MutableRefObject, useState } from "react";
import "./Chat.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Message from "../Message/Message";
import { CircularProgress } from "@material-ui/core";
import TypingIndicator from "../../common/TypingIndicator/TypingIndicator";
// redux
import { connect, ConnectedProps } from "react-redux";
import {
  setNewMessage,
  getMoreMessages,
  setMessageDeleted,
} from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";
import { IUser } from "../../redux/reducers/userReducer";
import { IMessage } from "../../redux/reducers/dataReducer";
// Assets
const notificationSound = require("../../assets/notification_sound.mp3");

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});
const mapActionsToProps = {
  setNewMessage,
  getMoreMessages,
  setMessageDeleted,
};
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isTyping: boolean;
  socket: SocketIOClient.Socket | null;
}

type Props = PropsFromRedux & IProps;

export interface IMessageConversation {
  members: { ids: string[]; usernames: string[] };
  updatedAt: string;
  _id: string;
}

interface IScrollElement extends HTMLDivElement {
  getScrollElement(): any;
  el: any;
}

function Chat({
  socket,
  UI,
  data,
  user,
  isTyping,
  setNewMessage,
  getMoreMessages,
  setMessageDeleted,
}: Props) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [page, setPage] = useState(2);
  const scrollRef = useRef() as MutableRefObject<IScrollElement>;

  useEffect(() => {
    if (data.selectedConversation?.new) return;
    // gets conversation which is selected
    const conversation = data.conversations?.filter(
      (conversation) => conversation._id === data.selectedConversation?.id
    )[0];
    if (conversation?.isDisplayed) return;
    if (conversation?.lastMessage.authorId !== user.authenticatedUser?._id) {
      socket?.emit("displayMessage", conversation?._id);
    }
  }, [data.selectedConversation, data.messages]);

  // scroll chat to bottom when getting new message or selecting new conversation
  // also handle scrolling a bit down when fetching more messages
  useEffect(() => {
    if (isScrolling) {
      // if getting more messages then scroll a little bit down
      if (scrollRef.current.getScrollElement().scrollTop === 0)
        scrollRef.current.getScrollElement().scrollTop = 1;
    } else scrollToBottom();
  }, [data.messages, UI.pending.messages, isTyping]);

  useEffect(() => {
    socket?.on(
      "receiveMessage",
      (message: {
        createdMessage: IMessage;
        messageConversation: IMessageConversation;
        receiver: IUser;
        sender: IUser;
      }) => {
        if (message.createdMessage.authorId !== user.authenticatedUser?._id) {
          const audio = new Audio(notificationSound);
          audio.play();
        }
        // if the user is a sender, then set another user (receiver) to conversation and vice versa
        const conversationUser =
          message.sender._id === user.authenticatedUser?._id
            ? message.receiver
            : message.sender;
        const messageData = {
          createdMessage: message.createdMessage,
          // set user to newConversation
          messageConversation: {
            ...message.messageConversation,
            user: conversationUser,
          },
        };
        setNewMessage(messageData);
      }
    );
    socket?.on("messageDeleted", (messageId: string) =>
      setMessageDeleted(messageId)
    );
    return () => {
      socket?.off("receiveMessage");
      socket?.off("messageDeleted");
    };
  }, [socket, user.authenticatedUser]);

  useEffect(() => {
    if (data.selectedConversation?.id) {
      const messagesCount = data.messages?.length || 0;
      const newMessagesSinceLastMessagesFetch = (page - 1) * 10;
      const count =
        page * 10 + messagesCount - newMessagesSinceLastMessagesFetch;
      getMoreMessages(data.selectedConversation.id, count);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [data.selectedConversation]);

  const handleScroll = () => {
    const scrollTop = scrollRef.current.getScrollElement().scrollTop;
    const height = scrollRef.current.el.getElementsByClassName(
      "simplebar-content-wrapper"
    )[0].scrollHeight;
    const scrollHeight = scrollRef.current.getScrollElement().clientHeight;
    const scrollBottom = height - (scrollTop + scrollHeight);
    if (scrollBottom > 200) setIsScrolling(true);
    else setIsScrolling(false);
    if (data.selectedConversation?.new) return;
    if (scrollTop === 0 && scrollBottom > 0) {
      setPage(page + 1);
    }
  };

  const scrollToBottom = () => {
    const height = scrollRef.current.el.getElementsByClassName(
      "simplebar-content-wrapper"
    )[0].scrollHeight;
    scrollRef.current.getScrollElement().scrollTop = height;
  };

  return (
    <div className="chat-container">
      <SimpleBar
        // @ts-ignore
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ maxHeight: "calc(100vh - 170px)" }}
      >
        {data.messages?.map((message, index) => (
          <Message
            key={message._id}
            isOwnMessage={message.authorId === user.authenticatedUser?._id}
            message={message}
            isLast={index === data.messages!.length - 1}
            socket={socket}
          />
        ))}
        {UI.pending.messages && <CircularProgress color="inherit" />}
        {isTyping && (
          <div style={{ marginBottom: 5 }}>
            <TypingIndicator showImage={true} />
          </div>
        )}
      </SimpleBar>
      <button
        onClick={scrollToBottom}
        style={{
          color: UI.color,
          opacity: isScrolling ? 1 : 0,
          cursor: isScrolling ? "pointer" : "auto",
        }}
        className="button is-rounded scroll-down-button"
      >
        <i className="fas fa-arrow-down"></i>
      </button>
    </div>
  );
}

export default connector(Chat);
