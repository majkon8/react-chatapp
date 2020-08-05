import React, { useEffect } from "react";
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
}

function Chat({ socket, UI, data, user, setNewMessage }: Props) {
  useEffect(() => {
    socket?.on("receiveMessage", (message: IMessage) => setNewMessage(message));
    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <SimpleBar style={{ maxHeight: "calc(100vh - 140px)" }}>
        {UI.loading && !data.messages ? (
          <div className="chat-loading-spinner-container">
            <CircularProgress color="inherit" />
          </div>
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
