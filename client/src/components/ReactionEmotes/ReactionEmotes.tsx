import React, { useState, useEffect } from "react";
import "./ReactionEmotes.scss";
import Emoji from "../../common/Emoji/Emoji";
import { useOuterClick } from "../../hooks/hooks";
// redux
import { connect, ConnectedProps } from "react-redux";
import { addReactionEmoteToMessage } from "../../redux/actions/dataActions";

const mapActionsToProps = { addReactionEmoteToMessage };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  socket: SocketIOClient.Socket | null;
  messageId: string;
  otherUserId: string;
}

type Props = PropsFromRedux & IProps;

function ReactionEmotes({
  socket,
  messageId,
  otherUserId,
  addReactionEmoteToMessage,
}: Props) {
  const [isEmotesPanelOpen, setIsEmotesPanelOpen] = useState(false);
  const innerRef = useOuterClick(() => setIsEmotesPanelOpen(false));

  useEffect(() => {
    socket?.on("reactedToMessage", (messageId: string, emote: string) =>
      addReactionEmoteToMessage(messageId, emote)
    );
    return () => {
      socket?.off("reactedToMessage");
    };
  }, [socket]);

  const toggleEmotesPanelOpen = () => setIsEmotesPanelOpen(!isEmotesPanelOpen);

  const reactToMessage = (emote: string) => {
    socket?.emit("reactToMessage", messageId, emote, otherUserId);
  };

  return (
    <div ref={innerRef} className="reaction-emotes-container">
      {isEmotesPanelOpen && (
        <div className="reaction-emotes-panel">
          <Emoji handleClick={reactToMessage} emote="❤️" label="heart" />
          <Emoji handleClick={reactToMessage} emote="😂" label="laugh" />
          <Emoji handleClick={reactToMessage} emote="😮" label="surprised" />
          <Emoji handleClick={reactToMessage} emote="😥" label="sad" />
          <Emoji handleClick={reactToMessage} emote="😤" label="angry" />
          <Emoji handleClick={reactToMessage} emote="👍" label="thumb-up" />
          <Emoji handleClick={reactToMessage} emote="👎" label="thumb-down" />
        </div>
      )}
      <div
        title="React"
        onClick={toggleEmotesPanelOpen}
        className="message-action-trigger"
      >
        <i className="far fa-smile"></i>
      </div>
    </div>
  );
}

export default connector(ReactionEmotes);
