import { IUser } from "./reducers/userReducer";
import { ISelectedConversation } from "./reducers/dataReducer";

// user reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
// UI reducer types
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_LOADING_UI = "SET_LOADING_UI";
export const SET_THEME = "SET_THEME";
export const SET_COLOR = "SET_COLOR";
export const SET_CHAT_OPEN = "SET_IS_CHAT_OPEN";
// data reducer types
export const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
export const SET_SELECTED_CONVERSATION = "SET_SELECTED_CONVERSATION";

// user interfaces
interface ISetAuthenticatedAction {
  type: typeof SET_AUTHENTICATED;
  payload: boolean;
}

export type UserActionTypes = ISetAuthenticatedAction;

// UI interfaces
interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}
interface ISetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string | null;
}
interface ISetLoadingUIAction {
  type: typeof SET_LOADING_UI;
  payload: boolean;
}
interface ISetThemeAction {
  type: typeof SET_THEME;
  payload: string;
}
interface ISetColorAction {
  type: typeof SET_COLOR;
  payload: string;
}
interface ISetChatOpenAction {
  type: typeof SET_CHAT_OPEN;
  payload: boolean;
}

export type UIActionTypes =
  | ISetErrorAction
  | ISetSuccessAction
  | ISetLoadingUIAction
  | ISetThemeAction
  | ISetColorAction
  | ISetChatOpenAction;

// data interfaces
interface ISetSearchedUsersAction {
  type: typeof SET_SEARCHED_USERS;
  payload: IUser[];
}
interface ISetSelectedConversationAction {
  type: typeof SET_SELECTED_CONVERSATION;
  payload: ISelectedConversation;
}

export type DataActionTypes =
  | ISetSearchedUsersAction
  | ISetSelectedConversationAction;
