import React, { useState } from "react";
import "./Forward.scss";
import ForwardModal from "../ForwardModal/ForwardModal";
// redux
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux/store";
import { IMessage } from "../../redux/reducers/dataReducer";

const mapStateToProps = (state: IState) => ({ data: state.data });
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isOwnMessage: boolean;
  message: IMessage;
  socket: SocketIOClient.Socket | null;
}

type Props = PropsFromRedux & IProps;

function Forward({ isOwnMessage, message, data, socket }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      title="Forward"
      className={`forward-container ${
        isOwnMessage ? "own-message-forward" : "other-message-forward"
      }`}
    >
      <button onClick={toggleOpen} className="action-trigger">
        <i className="fas fa-external-link-alt"></i>
      </button>
      {isOpen && (
        <ForwardModal
          socket={socket}
          message={message}
          handleClose={toggleOpen}
          conversations={data.conversations || []}
        />
      )}
    </div>
  );
}

export default connector(Forward);
