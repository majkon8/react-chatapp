import {
  SET_SEARCHED_USERS,
  DataActionTypes,
  SET_SELECTED_CONVERSATION,
  SET_CONVERSATIONS,
} from "../types";
import { IUser } from "./userReducer";

interface IMessage {
  body: string;
  authorId: string;
  createdAt: Date;
}

interface IMembers {
  ids: string[];
  usernames: string[];
}

export interface IConversation {
  members: IMembers;
  _id: string;
  lastMessage: IMessage;
}

export interface ISelectedConversation {
  new: boolean;
  // if new then id is an id of selected user
  id: string;
  username: string;
}

export interface IDataState {
  searchedUsers: IUser[] | null;
  selectedConversation: ISelectedConversation | null;
  conversations: IConversation[] | null;
}

const initialState: IDataState = {
  searchedUsers: null,
  selectedConversation: null,
  conversations: null,
};

export default function (state = initialState, action: DataActionTypes) {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return { ...state, searchedUsers: action.payload };
    case SET_SELECTED_CONVERSATION:
      return { ...state, selectedConversation: action.payload };
    case SET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    default:
      return state;
  }
}
