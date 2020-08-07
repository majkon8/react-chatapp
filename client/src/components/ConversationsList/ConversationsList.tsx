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
import { IConversation } from "../../redux/reducers/dataReducer";

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
  const [filteredConversations, setFilteredConversations] = useState<
    IConversation[] | undefined
  >([]);

  useEffect(() => {
    getAllConversations();
  }, []);

  useEffect(() => {
    const id = data.selectedConversation?.id || "";
    setActiveId(id);
  }, [data.selectedConversation]);

  useEffect(() => {
    const filtered = data.conversations?.filter((conversation) => {
      const searchString = data.searchConversations.toLowerCase();
      const username =
        conversation.members.usernames.filter(
          (username) => username != user.authenticatedUser?.username
        )[0] || conversation.members.usernames[0];
      if (username.toLowerCase().includes(searchString)) return true;
      return false;
    });
    setFilteredConversations(filtered);
  }, [data.conversations, data.searchConversations]);

  const handleActive = (id: string) => setActiveId(id);

  return (
    <ul
      className={`conversations-list-container ${UI.isChatOpen && "is-closed"}`}
    >
      <SimpleBar style={{ maxHeight: "calc(100vh - 70px)" }}>
        {UI.pending.search ? (
          <CircularProgress color="inherit" />
        ) : (
          data.searchedUsers?.map((searchedUser) => (
            <Conversation
              isActive={activeId === searchedUser._id}
              key={searchedUser._id}
              isNew={true}
              username={searchedUser.username}
              userId={searchedUser._id}
              id={searchedUser._id}
              handleActive={handleActive}
            />
          ))
        )}
        {UI.pending.conversations || UI.pending.auth ? (
          <CircularProgress color="inherit" />
        ) : (
          filteredConversations?.map((conversation, index) => (
            <Conversation
              isActive={
                activeId === "" ? index === 0 : activeId === conversation._id
              }
              key={conversation._id}
              isNew={false}
              username={
                conversation.members.usernames.filter(
                  (username) => username != user.authenticatedUser?.username
                )[0] || conversation.members.usernames[0] // if user messaged himself
              }
              userId={
                conversation.members.ids.filter(
                  (id) => id != user.authenticatedUser?._id
                )[0]
              }
              id={conversation._id}
              message={conversation.lastMessage.body}
              createdAt={conversation.lastMessage.createdAt}
              handleActive={handleActive}
            />
          ))
        )}
      </SimpleBar>
    </ul>
  );
}

export default connector(ConversationsList);
