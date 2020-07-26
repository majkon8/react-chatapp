import {
  SET_SEARCHED_USERS,
  DataActionTypes,
  SET_SELECTED_CONVERSATION,
} from "../types";
import { IUser } from "./userReducer";

export interface ISelectedConversation {
  new: boolean;
  // if new then id is an id of selected user
  id: string;
}

export interface IDataState {
  searchedUsers: IUser[];
  selectedConversation: ISelectedConversation | null;
}

const initialState: IDataState = {
  searchedUsers: [],
  selectedConversation: null,
};

export default function (state = initialState, action: DataActionTypes) {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return { ...state, searchedUsers: action.payload };
    case SET_SELECTED_CONVERSATION:
      return { ...state, selectedConversation: action.payload };
    default:
      return state;
  }
}
