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
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Main({ UI }: Props) {
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
    setupSocket();
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
      <ChatSearch isChatOpen={UI.isChatOpen} />
      <ConversationsList isChatOpen={UI.isChatOpen} />
      <ChatBar />
      <Chat socket={socket} />
      <ChatForm socket={socket} />
    </motion.div>
  );
}

export default connector(Main);
