import React, { useEffect, useRef, MutableRefObject, useState } from "react";
import "./Chat.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Message from "../Message/Message";
import { CircularProgress } from "@material-ui/core";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setNewMessage, getMessages } from "../../redux/actions/dataActions";
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
const mapActionsToProps = { setNewMessage, getMessages };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { socket: SocketIOClient.Socket | null };

export interface INewConversation {
  members: { ids: string[]; usernames: string[] };
  updatedAt: string;
  _id: string;
}

interface IScrollElement extends HTMLDivElement {
  getScrollElement(): any;
  el: any;
}

function Chat({ socket, UI, data, user, setNewMessage, getMessages }: Props) {
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
  useEffect(() => {
    if (isScrolling) {
      // if getting more messages then scroll a little bit down
      if (scrollRef.current.getScrollElement().scrollTop === 0)
        scrollRef.current.getScrollElement().scrollTop = 100;
    } else scrollToBottom();
  }, [data.messages, UI.pending.messages]);

  useEffect(() => {
    socket?.on(
      "receiveMessage",
      (message: {
        createdMessage: IMessage;
        newConversation: INewConversation;
        receiver: IUser;
        sender: IUser;
      }) => {
        if (message.createdMessage.authorId !== user.authenticatedUser?._id) {
          const audio = new Audio(notificationSound);
          audio.play();
        }
        // if the message started new conversation
        if (message.sender && message.receiver) {
          // if the user is a sender, then set another user (receiver) to conversation and vice versa
          const conversationUser =
            message.sender._id === user.authenticatedUser?._id
              ? message.receiver
              : message.sender;
          const messageData = {
            createdMessage: message.createdMessage,
            // set user to newConversation
            newConversation: {
              ...message.newConversation,
              user: conversationUser,
            },
          };
          setNewMessage(messageData);
        } else setNewMessage(message);
      }
    );
    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket, user.authenticatedUser]);

  useEffect(() => {
    if (data.selectedConversation?.id) {
      const messagesCount = data.messages?.length || 0;
      const newMessagesSinceLastMessagesFetch = (page - 1) * 10;
      const count =
        page * 10 + messagesCount - newMessagesSinceLastMessagesFetch;
      getMessages(data.selectedConversation.id, count);
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
    if (scrollBottom > 50) setIsScrolling(true);
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
        {UI.pending.messages ? (
          <CircularProgress color="inherit" />
        ) : (
          data.messages?.map((message, index) => (
            <Message
              key={message._id}
              isOwnMessage={message.authorId === user.authenticatedUser?._id}
              body={message.body}
              file={message.file}
              type={message.type}
              createdAt={message.createdAt}
              isLast={index === data.messages!.length - 1}
            />
          ))
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
