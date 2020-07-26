import {
  SET_SEARCHED_USERS,
  SET_LOADING_UI,
  SET_SELECTED_CONVERSATION,
} from "../types";
import { Dispatch } from "redux";
import axios from "axios";
import { ISelectedConversation } from "../reducers/dataReducer";

export const searchForUsers = (username: string) => async (
  dispatch: Dispatch
) => {
  if (username.length > 0 && username.length < 3) return;
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    if (username.length === 0) {
      dispatch({ type: SET_SEARCHED_USERS, payload: [] });
    } else {
      const response = await axios.get(`/users/${username}`);
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
