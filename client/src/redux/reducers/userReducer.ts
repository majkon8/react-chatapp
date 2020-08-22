import {
  SET_AUTHENTICATED,
  SET_AUTHENTICATED_USER,
  SET_ACCESS_TOKEN,
  UserActionTypes,
  UPDATE_USER_ACCOUNT_DETAILS,
} from "../types";

export interface IUser {
  confirmed: boolean;
  createdExternally: boolean;
  email: string;
  username: string;
  bio: string;
  imageUrl: string;
  lastActive: string | Date;
  _id: string;
}

export interface IUserState {
  isAuthenticated: boolean;
  authenticatedUser: IUser | null;
  accessToken: string;
}

const initialState: IUserState = {
  isAuthenticated: false,
  authenticatedUser: null,
  accessToken: "",
};

export default function (state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case SET_AUTHENTICATED_USER:
      return { ...state, authenticatedUser: action.payload };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case UPDATE_USER_ACCOUNT_DETAILS:
      return {
        ...state,
        authenticatedUser: {
          ...state.authenticatedUser,
          bio: action.payload.bio,
          username: action.payload.username,
          imageUrl: action.payload.imageUrl,
        },
      };
    default:
      return state;
  }
}
