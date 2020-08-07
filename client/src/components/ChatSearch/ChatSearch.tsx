import React, { ChangeEvent } from "react";
import "./ChatSearch.scss";
import ChatInput from "../../common/ChatInput/ChatInput";
// redux
import { connect, ConnectedProps } from "react-redux";
import {
  searchForUsers,
  setSearchConversations,
} from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const mapActionsToProps = { searchForUsers, setSearchConversations };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ChatSearch({ UI, searchForUsers, setSearchConversations }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const usernameToSearch = event.target.value;
    searchForUsers(usernameToSearch);
    setSearchConversations(usernameToSearch);
  };

  return (
    <div className={`chat-search-container ${UI.isChatOpen && "is-closed"}`}>
      <ChatInput handleChange={(e) => handleChange(e)} isSearchInput={true} />
    </div>
  );
}

export default connector(ChatSearch);
