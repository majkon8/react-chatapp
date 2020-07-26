import { SET_SEARCHED_USERS, DataActionTypes } from "../types";
import { IUser } from "./userReducer";

export interface IDataState {
  searchedUsers: IUser[];
}

const initialState: IDataState = {
  searchedUsers: [],
};

export default function (state = initialState, action: DataActionTypes) {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return { ...state, searchedUsers: action.payload };
    default:
      return state;
  }
}
