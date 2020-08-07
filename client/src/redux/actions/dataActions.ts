import {
  SET_SEARCHED_USERS,
  SET_LOADING_UI,
  SET_SELECTED_CONVERSATION,
  SET_CONVERSATIONS,
  SET_MESSAGES,
  SET_NEW_MESSAGE,
} from "../types";
import { Dispatch } from "redux";
import axios from "axios";
import { ISelectedConversation, IMessage } from "../reducers/dataReducer";
import { INewConversation } from "../../components/Chat/Chat";

export const searchForUsers = (username: string) => async (
  dispatch: Dispatch
) => {
  if (username.length > 0 && username.length < 3) return;
  dispatch({ type: SET_LOADING_UI, payload: true });
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
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

export const setSelectedConversation = (
  conversation: ISelectedConversation
) => (dispatch: Dispatch) => {
  dispatch({ type: SET_SELECTED_CONVERSATION, payload: conversation });
};

export const getAllConversations = () => async (dispatch: Dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    const response = await axios.get("/conversations");
    dispatch({ type: SET_CONVERSATIONS, payload: response.data });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

export const getMessages = (conversationId: string | null) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  dispatch({ type: SET_MESSAGES, payload: null });
  try {
    if (conversationId === null) dispatch({ type: SET_MESSAGES, payload: [] });
    else {
      const response = await axios.get(`/messages/${conversationId}`);
      dispatch({ type: SET_MESSAGES, payload: response.data });
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

export const setNewMessage = (messageData: {
  createdMessage: IMessage;
  newConversation: INewConversation;
}) => (dispatch: Dispatch) =>
  dispatch({ type: SET_NEW_MESSAGE, payload: messageData });
