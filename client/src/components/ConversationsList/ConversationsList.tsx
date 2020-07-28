import React, { useState, useEffect } from "react";
import "./ConversationsList.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Conversation from "../Conversation/Conversation";
import { CircularProgress } from "@material-ui/core";
// redux
import { connect, ConnectedProps } from "react-redux";
import { getAllConversations } from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});
const mapActionsToProps = { getAllConversations };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ConversationsList({ UI, data, user, getAllConversations }: Props) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    getAllConversations();
  }, []);

  const handleActive = (id: string) => setActiveId(id);

  return (
    <ul
      className={`conversations-list-container ${UI.isChatOpen && "is-closed"}`}
    >
      <SimpleBar style={{ maxHeight: "calc(100vh - 70px)" }}>
        {data.searchedUsers && (
          <p className="conversations-title">Make new conversation with:</p>
        )}
        {UI.loading && data.searchedUsers ? (
          <CircularProgress color="inherit" />
        ) : (
          data.searchedUsers?.map((searchedUser) => (
            <Conversation
              isActive={activeId === searchedUser._id}
              key={searchedUser._id}
              isNew={true}
              username={searchedUser.username}
              id={searchedUser._id}
              handleActive={handleActive}
            />
          ))
        )}
        <p className="conversations-title">Your conversations:</p>
        {UI.loading ? (
          <CircularProgress color="inherit" />
        ) : (
          data.conversations?.map((conversation) => (
            <Conversation
              isActive={activeId === conversation._id}
              key={conversation._id}
              isNew={false}
              username={
                conversation.members.usernames.filter(
                  (username) => username != user.authenticatedUser?.username
                )[0]
              }
              id={conversation._id}
              message={conversation.lastMessage.body}
              handleActive={handleActive}
            />
          ))
        )}
      </SimpleBar>
    </ul>
  );
}

export default connector(ConversationsList);
