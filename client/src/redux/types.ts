import { IUser } from "./reducers/userReducer";
import {
  ISelectedConversation,
  IConversation,
  IMessage,
} from "./reducers/dataReducer";
import { INewConversation } from "../components/Chat/Chat";
import { IPending } from "./reducers/uiReducer";

// user reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_AUTHENTICATED_USER = "SET_AUTHENTICATED_USER";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
// UI reducer types
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_PENDING = "SET_PENDING";
export const SET_THEME = "SET_THEME";
export const SET_COLOR = "SET_COLOR";
export const SET_CHAT_OPEN = "SET_IS_CHAT_OPEN";
export const SET_IMAGE_URL_TO_OPEN = "SET_IMAGE_URL_TO_OPEN";
// data reducer types
export const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
export const SET_SELECTED_CONVERSATION = "SET_SELECTED_CONVERSATION";
export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_NEW_MESSAGE = "SET_NEW_MESSAGE";
export const SEARCH_CONVERSATIONS = "SEARCH_CONVERSATIONS";
export const DISPLAY_MESSAGE = "DISPLAY_MESSAGE";
export const SET_MESSAGE_DELETED = "SET_MESSAGE_DELETED";

// user interfaces
interface ISetAuthenticatedAction {
  type: typeof SET_AUTHENTICATED;
  payload: boolean;
}
interface ISetAuthenticatedUserAction {
  type: typeof SET_AUTHENTICATED_USER;
  payload: IUser;
}
interface ISetAccessTokenAction {
  type: typeof SET_ACCESS_TOKEN;
  payload: string;
}

export type UserActionTypes =
  | ISetAuthenticatedAction
  | ISetAuthenticatedUserAction
  | ISetAccessTokenAction;

// UI interfaces
interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}
interface ISetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string | null;
}
interface ISetPendingAction {
  type: typeof SET_PENDING;
  payload: IPending;
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
interface ISetImageUrlToOpenAction {
  type: typeof SET_IMAGE_URL_TO_OPEN;
  payload: string | null;
}

export type UIActionTypes =
  | ISetErrorAction
  | ISetSuccessAction
  | ISetPendingAction
  | ISetThemeAction
  | ISetColorAction
  | ISetChatOpenAction
  | ISetImageUrlToOpenAction;

// data interfaces
interface ISetSearchedUsersAction {
  type: typeof SET_SEARCHED_USERS;
  payload: IUser[];
}
interface ISetSelectedConversationAction {
  type: typeof SET_SELECTED_CONVERSATION;
  payload: ISelectedConversation;
}
interface ISetConversationsAction {
  type: typeof SET_CONVERSATIONS;
  payload: IConversation;
}
interface ISetMessagesAction {
  type: typeof SET_MESSAGES;
  payload: IMessage[];
}
interface ISetNewMessageAction {
  type: typeof SET_NEW_MESSAGE;
  payload: {
    createdMessage: IMessage;
    newConversation: INewConversation;
  };
}
interface ISearchConversationsAction {
  type: typeof SEARCH_CONVERSATIONS;
  payload: string;
}
interface IDisplayMessageAction {
  type: typeof DISPLAY_MESSAGE;
  payload: IConversation;
}
interface ISetMessageDeletedAction {
  type: typeof SET_MESSAGE_DELETED;
  payload: string;
}

export type DataActionTypes =
  | ISetSearchedUsersAction
  | ISetSelectedConversationAction
  | ISetConversationsAction
  | ISetMessagesAction
  | ISetNewMessageAction
  | ISearchConversationsAction
  | IDisplayMessageAction
  | ISetMessageDeletedAction;
