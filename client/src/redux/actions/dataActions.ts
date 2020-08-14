import {
  SET_SEARCHED_USERS,
  SET_PENDING,
  SET_SELECTED_CONVERSATION,
  SEARCH_CONVERSATIONS,
  SET_CONVERSATIONS,
  SET_MESSAGES,
  SET_NEW_MESSAGE,
  DISPLAY_MESSAGE,
  SET_MESSAGE_DELETED,
  DELETE_CONVERSATION,
  ADD_REACTION_EMOTE_TO_MESSAGE,
  SET_REPLY_DATA,
} from "../types";
import { Dispatch } from "redux";
import {
  ISelectedConversation,
  IMessage,
  IConversation,
  IReplyData,
} from "../reducers/dataReducer";
import { IMessageConversation } from "../../components/Chat/Chat";
import api from "../../api/api";

export const searchForUsers = (username: string) => async (
  dispatch: Dispatch
) => {
  if (username.length > 0 && username.length < 3) return;
  dispatch({ type: SET_PENDING, payload: { search: true } });
  try {
    if (username.length === 0) {
      dispatch({ type: SET_SEARCHED_USERS, payload: [] });
    } else {
      const response = await api.searchForUsersByUsername(username);
      dispatch({ type: SET_SEARCHED_USERS, payload: response.data });
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_PENDING, payload: { search: false } });
  }
};

export const setSearchConversations = (username: string) => (
  dispatch: Dispatch
) => dispatch({ type: SEARCH_CONVERSATIONS, payload: username });

export const setSelectedConversation = (
  conversation: ISelectedConversation
) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_CONVERSATION, payload: conversation });
};

export const getAllConversations = () => async (dispatch: Dispatch) => {
  dispatch({ type: SET_PENDING, payload: { conversations: true } });
  try {
    const response = await api.getAllConversations();
    dispatch({ type: SET_CONVERSATIONS, payload: response.data });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_PENDING, payload: { conversations: false } });
  }
};

export const getMessages = (
  conversationId: string | null,
  count?: number
) => async (dispatch: Dispatch) => {
  dispatch({ type: SET_PENDING, payload: { messages: true } });
  try {
    if (conversationId === null) dispatch({ type: SET_MESSAGES, payload: [] });
    else {
      const response = await api.getMessages(conversationId, count);
      dispatch({ type: SET_MESSAGES, payload: response.data });
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_PENDING, payload: { messages: false } });
  }
};

export const setNewMessage = (messageData: {
  createdMessage: IMessage;
  messageConversation: IMessageConversation;
}) => (dispatch: Dispatch) =>
  dispatch({ type: SET_NEW_MESSAGE, payload: messageData });

export const displayMessage = (conversation: IConversation) => (
  dispatch: Dispatch
) => dispatch({ type: DISPLAY_MESSAGE, payload: conversation });

export const setMessageDeleted = (messageId: string) => (dispatch: Dispatch) =>
  dispatch({ type: SET_MESSAGE_DELETED, payload: messageId });

export const deleteConversation = (conversationId: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: DELETE_CONVERSATION, payload: conversationId });
  try {
    await api.deleteConversation(conversationId);
  } catch (error) {
    console.error(error);
  }
};

export const addReactionEmoteToMessage = (messageId: string, emote: string) => (
  dispatch: Dispatch
) =>
  dispatch({
    type: ADD_REACTION_EMOTE_TO_MESSAGE,
    payload: { messageId, emote },
  });

export const setReplyData = (replyData: IReplyData | null) => (
  dispatch: Dispatch
) => dispatch({ type: SET_REPLY_DATA, payload: replyData });
