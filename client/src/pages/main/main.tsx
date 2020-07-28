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

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const mapActionsToProps = { getAuthenticatedUser };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Main({ UI, getAuthenticatedUser }: Props) {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  const setupSocket = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !socket) {
      const server = "http://localhost:3000";
      const newSocket = io(server, { query: { accessToken } });
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log("socket disconected");
      });
      newSocket.on("connect", () => {
        console.log("socket connected");
      });
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    getAuthenticatedUser();
    // timeout needed for access token refresh
    setTimeout(() => {
      setupSocket();
    }, 1000);
  }, []);

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
      <ConversationsList />
      <ChatBar />
      <Chat socket={socket} />
      <ChatForm socket={socket} />
    </motion.div>
  );
}

export default connector(Main);
