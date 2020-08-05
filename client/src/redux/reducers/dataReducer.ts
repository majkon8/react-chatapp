import {
  SET_SEARCHED_USERS,
  DataActionTypes,
  SET_SELECTED_CONVERSATION,
  SET_CONVERSATIONS,
  SET_MESSAGES,
  SET_NEW_MESSAGE,
} from "../types";
import { IUser } from "./userReducer";

export interface IMessage {
  _id?: string;
  body: string;
  authorId: string;
  conversationId?: string;
  createdAt: string;
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
  id: string;
  username: string;
}

export interface IDataState {
  searchedUsers: IUser[] | null;
  selectedConversation: ISelectedConversation | null;
  conversations: IConversation[] | null;
  messages: IMessage[] | null;
}

const initialState: IDataState = {
  searchedUsers: null,
  selectedConversation: null,
  conversations: null,
  messages: null,
};

export default function (state = initialState, action: DataActionTypes) {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return { ...state, searchedUsers: action.payload };
    case SET_SELECTED_CONVERSATION:
      return { ...state, selectedConversation: action.payload };
    case SET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_NEW_MESSAGE:
      if (action.payload.conversationId === state.selectedConversation?.id)
        return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}
