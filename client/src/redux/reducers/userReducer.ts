import { SET_AUTHENTICATED, UserActionTypes } from "../types";

export interface IUser {
  confirmed: boolean;
  createdExternally: boolean;
  email: string;
  username: string;
  _id: string;
}

export interface IUserState {
  isAuthenticated: boolean;
  authenticatedUser: IUser | null;
}

const initialState: IUserState = {
  isAuthenticated: false,
  authenticatedUser: null,
};

export default function (state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}
