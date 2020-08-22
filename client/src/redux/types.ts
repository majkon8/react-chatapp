import { IUser } from "./reducers/userReducer";
import {
  ISelectedConversation,
  IConversation,
  IMessage,
  IReplyData,
} from "./reducers/dataReducer";
import { IMessageConversation } from "../components/Chat/Chat";
import { IPending } from "./reducers/uiReducer";

// user reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_AUTHENTICATED_USER = "SET_AUTHENTICATED_USER";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const UPDATE_USER_ACCOUNT_DETAILS = "UPDATE_USER_ACCOUNT_DETAILS";
// UI reducer types
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_PENDING = "SET_PENDING";
export const SET_THEME = "SET_THEME";
export const SET_COLOR = "SET_COLOR";
export const SET_CHAT_OPEN = "SET_IS_CHAT_OPEN";
// data reducer types
export const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
export const SET_SELECTED_CONVERSATION = "SET_SELECTED_CONVERSATION";
export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_NEW_MESSAGE = "SET_NEW_MESSAGE";
export const SEARCH_CONVERSATIONS = "SEARCH_CONVERSATIONS";
export const DISPLAY_MESSAGE = "DISPLAY_MESSAGE";
export const SET_MESSAGE_DELETED = "SET_MESSAGE_DELETED";
export const DELETE_CONVERSATION = "DELETE_CONVERSATION";
export const ADD_REACTION_EMOTE_TO_MESSAGE = "ADD_REACTION_EMOTE_TO_MESSAGE";
export const SET_REPLY_DATA = "SET_REPLY_DATA";
export const UPDATE_LAST_ACTIVE = "UPDATE_LAST_ACTIVE";

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
interface IUpdateUserAccountDetailsAction {
  type: typeof UPDATE_USER_ACCOUNT_DETAILS;
  payload: { bio: string; username: string; imageUrl: string };
}

export type UserActionTypes =
  | ISetAuthenticatedAction
  | ISetAuthenticatedUserAction
  | ISetAccessTokenAction
  | IUpdateUserAccountDetailsAction;

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

export type UIActionTypes =
  | ISetErrorAction
  | ISetSuccessAction
  | ISetPendingAction
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
    messageConversation: IMessageConversation;
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
interface IDeleteConversationAction {
  type: typeof DELETE_CONVERSATION;
  payload: string;
}
interface IAddReactionToMessageAction {
  type: typeof ADD_REACTION_EMOTE_TO_MESSAGE;
  payload: { messageId: string; emote: string };
}
interface ISetReplyAction {
  type: typeof SET_REPLY_DATA;
  payload: IReplyData | null;
}
interface IUpdateLastActiveAction {
  type: typeof UPDATE_LAST_ACTIVE;
  payload: { userId: string; lastActive: string | Date };
}

export type DataActionTypes =
  | ISetSearchedUsersAction
  | ISetSelectedConversationAction
  | ISetConversationsAction
  | ISetMessagesAction
  | ISetNewMessageAction
  | ISearchConversationsAction
  | IDisplayMessageAction
  | ISetMessageDeletedAction
  | IDeleteConversationAction
  | IAddReactionToMessageAction
  | ISetReplyAction
  | IUpdateLastActiveAction;
