import React, { useEffect, useRef, MutableRefObject, useState } from "react";
import "./Chat.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Message from "../Message/Message";
import { CircularProgress } from "@material-ui/core";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setNewMessage } from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";
import { IUser } from "../../redux/reducers/userReducer";
// Assets
const notificationSound = require("../../assets/notification_sound.mp3");

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});
const mapActionsToProps = { setNewMessage };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { socket: SocketIOClient.Socket | null };

interface IMessage {
  conversationId: string;
  authorId: string;
  body: string;
  createdAt: string;
  newConversation: boolean;
}

export interface INewConversation {
  members: { ids: string[]; usernames: string[] };
  updatedAt: string;
  _id: string;
}

interface IScrollElement extends HTMLDivElement {
  getScrollElement(): any;
  el: any;
}

function Chat({ socket, UI, data, user, setNewMessage }: Props) {
  const [isScrolling, setIsScrolling] = useState(false);
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

  useEffect(() => {
    if (isScrolling) return;
    const height = scrollRef.current.el.getElementsByClassName(
      "simplebar-content-wrapper"
    )[0].scrollHeight;
    scrollRef.current.getScrollElement().scrollTop = height;
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

  const handleScroll = () => {
    const scrollTop = scrollRef.current.getScrollElement().scrollTop;
    const height = scrollRef.current.el.getElementsByClassName(
      "simplebar-content-wrapper"
    )[0].scrollHeight;
    const scrollHeight = scrollRef.current.getScrollElement().clientHeight;
    const scrollBottom = height - (scrollTop + scrollHeight);
    if (scrollBottom > 300) setIsScrolling(true);
    else setIsScrolling(false);
  };

  return (
    <div className="chat-container">
      <SimpleBar
        // @ts-ignore
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ maxHeight: "calc(100vh - 140px)" }}
      >
        {UI.pending.messages ? (
          <CircularProgress color="inherit" />
        ) : (
          data.messages?.map((message) => (
            <Message
              key={message._id}
              isOwnMessage={message.authorId === user.authenticatedUser?._id}
              body={message.body}
              createdAt={message.createdAt}
            />
          ))
        )}
      </SimpleBar>
    </div>
  );
}

export default connector(Chat);
