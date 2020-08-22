import React, { useState, useEffect } from "react";
import "./ConversationsList.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Conversation from "../Conversation/Conversation";
import { CircularProgress } from "@material-ui/core";
import { IConversation } from "../../redux/reducers/dataReducer";
// redux
import { connect, ConnectedProps } from "react-redux";
import {
  getAllConversations,
  displayMessage,
} from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});
const mapActionsToProps = { getAllConversations, displayMessage };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  typingUsersIds: string[];
  socket: SocketIOClient.Socket | null;
}

type Props = PropsFromRedux & IProps;

function ConversationsList({
  socket,
  UI,
  data,
  user,
  typingUsersIds,
  getAllConversations,
  displayMessage,
}: Props) {
  const [activeId, setActiveId] = useState("");
  const [filteredConversations, setFilteredConversations] = useState<
    IConversation[] | undefined
  >([]);

  useEffect(() => {
    getAllConversations();
  }, []);

  useEffect(() => {
    socket?.on("messageDisplayed", (updatedConversation: IConversation) =>
      displayMessage(updatedConversation)
    );
    return () => {
      socket?.off("messageDisplayed");
    };
  }, [socket, user.authenticatedUser]);

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
              userImageUrl={searchedUser.imageUrl}
              userId={searchedUser._id}
              lastActive={searchedUser.lastActive}
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
              username={conversation.user.username}
              userImageUrl={conversation.user.imageUrl}
              userId={conversation.user._id}
              lastActive={conversation.user.lastActive}
              id={conversation._id}
              lastMessage={conversation.lastMessage}
              handleActive={handleActive}
              isDisplayed={
                conversation.isDisplayed ||
                conversation.lastMessage.authorId ===
                  user.authenticatedUser?._id
              }
              isTyping={typingUsersIds.includes(conversation.user._id)}
            />
          ))
        )}
      </SimpleBar>
    </ul>
  );
}

export default connector(ConversationsList);
