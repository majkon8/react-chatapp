import React from "react";
import "./ConversationsList.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Conversation from "../Conversation/Conversation";
import { CircularProgress } from "@material-ui/core";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setIsChatOpen } from "../../redux/actions/uiActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI, data: state.data });
const mapActionsToProps = { setIsChatOpen };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ConversationsList({ UI, data, setIsChatOpen }: Props) {
  const handleChatOpen = () => setIsChatOpen(true);

  return (
    <ul
      className={`conversations-list-container ${UI.isChatOpen && "is-closed"}`}
    >
      <SimpleBar style={{ maxHeight: "calc(100vh - 70px)" }}>
        {data.searchedUsers.length > 0 && (
          <p className="conversations-title">Make new conversation with:</p>
        )}
        {UI.loading ? (
          <CircularProgress color="inherit" />
        ) : (
          data.searchedUsers.map((user) => (
            <Conversation
              isNew={true}
              username={user.username}
              handleChatOpen={handleChatOpen}
            />
          ))
        )}
        <p className="conversations-title">Your conversations:</p>
      </SimpleBar>
    </ul>
  );
}

export default connector(ConversationsList);
