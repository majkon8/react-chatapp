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
import { updateLastActive } from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  user: state.user,
  data: state.data,
});
const mapActionsToProps = { getAuthenticatedUser, updateLastActive };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ITypingData {
  isTyping: boolean;
  userId: string;
}

function Main({
  UI,
  user,
  data,
  getAuthenticatedUser,
  updateLastActive,
}: Props) {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [typingUsersIds, setTypingUsersIds] = useState<string[]>([]);

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
    socket?.on("receiveIsTyping", (typingData: ITypingData) => {
      if (typingData.isTyping)
        setTypingUsersIds([...typingUsersIds, typingData.userId]);
      else
        setTypingUsersIds([
          ...typingUsersIds.filter((userId) => userId !== typingData.userId),
        ]);
    });
    return () => {
      socket?.off("receiveIsTyping");
    };
  }, [socket, user.authenticatedUser]);

  useEffect(() => {
    socket?.on("lastActive", (userId: string, lastActive: string | Date) => {
      updateLastActive(userId, lastActive);
    });
    return () => {
      socket?.off("lastActive");
    };
  }, [socket, user.authenticatedUser]);

  useEffect(() => {
    if (!user.accessToken) return;
    setupSocket();
  }, [user.accessToken]);

  return (
    <motion.div
      id="main-container"
      className={`main-container ${UI.theme === "light" && "theme-light"}`}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <ChatSearch />
      <ConversationsList socket={socket} typingUsersIds={typingUsersIds} />
      <ChatBar />
      {
        <Chat
          socket={socket}
          isTyping={typingUsersIds.includes(
            data.selectedConversation?.userId || ""
          )}
        />
      }
      <ChatForm socket={socket} />
    </motion.div>
  );
}

export default connector(Main);
