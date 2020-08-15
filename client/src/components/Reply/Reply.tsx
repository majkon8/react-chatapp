import React from "react";
import "./Reply.scss";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setReplyData } from "../../redux/actions/dataActions";

const mapActionsToProps = { setReplyData };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  isOwnMessage: boolean;
  to: string;
  body: string;
  fileName: string;
}

type Props = PropsFromRedux & IProps;

function Reply({ isOwnMessage, to, body, fileName, setReplyData }: Props) {
  const handleReply = () => {
    const replyData = { to, body: body ? body : fileName };
    setReplyData(replyData);
  };

  return (
    <div
      title="Reply"
      className={`reply-trigger-container ${
        isOwnMessage ? "own-message-reply" : "other-message-reply"
      }`}
    >
      <div onClick={handleReply} className="message-action-trigger">
        <i className="fas fa-reply"></i>
      </div>
    </div>
  );
}

export default connector(Reply);
