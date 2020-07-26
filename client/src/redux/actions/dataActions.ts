import { SET_SEARCHED_USERS, SET_LOADING_UI } from "../types";
import { Dispatch } from "redux";
import axios from "axios";

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
