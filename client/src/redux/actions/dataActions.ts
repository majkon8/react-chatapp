import {
  SET_SEARCHED_USERS,
  SET_PENDING,
  SET_SELECTED_CONVERSATION,
  SEARCH_CONVERSATIONS,
  SET_CONVERSATIONS,
  SET_MESSAGES,
  SET_NEW_MESSAGE,
  DISPLAY_MESSAGE,
} from "../types";
import { Dispatch } from "redux";
import axios from "axios";
import {
  ISelectedConversation,
  IMessage,
  IConversation,
} from "../reducers/dataReducer";
import { INewConversation } from "../../components/Chat/Chat";

export const searchForUsers = (username: string) => async (
  dispatch: Dispatch
) => {
  if (username.length > 0 && username.length < 3) return;
  dispatch({ type: SET_PENDING, payload: { search: true } });
  try {
    if (username.length === 0) {
      dispatch({ type: SET_SEARCHED_USERS, payload: [] });
    } else {
      const response = await axios.get(`/users/search/${username}`);
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
    const response = await axios.get("/conversations");
    dispatch({ type: SET_CONVERSATIONS, payload: response.data });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_PENDING, payload: { conversations: false } });
  }
};

export const getMessages = (conversationId: string | null) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_PENDING, payload: { messages: true } });
  try {
    if (conversationId === null) dispatch({ type: SET_MESSAGES, payload: [] });
    else {
      const response = await axios.get(`/messages/${conversationId}`);
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
  newConversation: INewConversation;
}) => (dispatch: Dispatch) =>
  dispatch({ type: SET_NEW_MESSAGE, payload: messageData });

export const displayMessage = (conversation: IConversation) => (
  dispatch: Dispatch
) => dispatch({ type: DISPLAY_MESSAGE, payload: conversation });
