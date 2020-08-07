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

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});
const mapActionsToProps = { setNewMessage };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  socket: SocketIOClient.Socket | null;
}

type Props = PropsFromRedux & IProps;

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
    if (isScrolling) return;
    const height = scrollRef.current.el.getElementsByClassName(
      "simplebar-content-wrapper"
    )[0].scrollHeight;
    scrollRef.current.getScrollElement().scrollTop = height;
  }, [data.messages]);

  useEffect(() => {
    socket?.on(
      "receiveMessage",
      (message: {
        createdMessage: IMessage;
        newConversation: INewConversation;
      }) => setNewMessage(message)
    );
    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket]);

  const handleScroll = () => {
    const scrollTop = scrollRef.current.getScrollElement().scrollTop;
    const height = scrollRef.current.el.getElementsByClassName(
      "simplebar-content-wrapper"
    )[0].scrollHeight;
    const scrollHeight = scrollRef.current.getScrollElement().clientHeight;
    const scrollBottom = height - (scrollTop + scrollHeight);
    if (scrollBottom > 100) setIsScrolling(true);
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
        {UI.loading && data.selectedConversation && !data.messages ? (
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
