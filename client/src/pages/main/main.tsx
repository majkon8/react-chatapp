import React from "react";
import "./main.scss";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../home/home";
import Chat from "../../components/Chat/Chat";
import ConversationsList from "../../components/ConversationsList/ConversationsList";
import ChatForm from "../../components/ChatForm/ChatForm";
import ChatSearch from "../../components/ChatSearch/ChatSearch";
import ChatBar from "../../components/ChatBar/ChatBar";
// redux
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Main({ UI }: Props) {
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
      <Chat />
      <ChatForm />
    </motion.div>
  );
}

export default connector(Main);
