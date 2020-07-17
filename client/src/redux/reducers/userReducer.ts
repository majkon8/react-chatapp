import { SET_AUTHENTICATED, UserActionTypes } from "../types";

export interface IUserState {
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  isAuthenticated: false,
};

export default function (state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}
