import React, { useState, useEffect } from "react";
import "./main.scss";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../home/home";
import Chat from "../../components/Chat/Chat";
import ConversationsList from "../../components/ConversationsList/ConversationsList";
import ChatForm from "../../components/ChatForm/ChatForm";
import ChatSearch from "../../components/ChatSearch/ChatSearch";
import ChatBar from "../../components/ChatBar/ChatBar";
import io from "socket.io-client";
// redux
import { connect, ConnectedProps } from "react-redux";
import { getAuthenticatedUser } from "../../redux/actions/userActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  user: state.user,
  data: state.data,
});
const mapActionsToProps = { getAuthenticatedUser };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Main({ UI, user, data, getAuthenticatedUser }: Props) {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const undisplayedConversations = data.conversations?.filter(
      (conversation) => !conversation.isDisplayed
    );
    if (
      undisplayedConversations &&
      undisplayedConversations.length > 0 &&
      undisplayedConversations.some(
        (conversation) =>
          conversation.lastMessage.authorId !== user.authenticatedUser?._id
      )
    )
      document.title = "(!) Chat App";
    else document.title = "Chat App";
  }, [data.conversations, user.authenticatedUser]);

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  const setupSocket = () => {
    const accessToken = user.accessToken;
    if (accessToken && !socket) {
      const server =
        process.env.NODE_ENV === "production"
          ? window.location.hostname
          : "http://localhost:3000";
      const newSocket = io(server, { query: { accessToken } });
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
      });
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    if (!user.accessToken) return;
    setupSocket();
  }, [user.accessToken]);

  return (
    <motion.div
      className={`main-container ${UI.theme === "light" && "theme-light"}`}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <ChatSearch />
      <ConversationsList socket={socket} />
      <ChatBar />
      <Chat socket={socket} />
      <ChatForm socket={socket} />
    </motion.div>
  );
}

export default connector(Main);
