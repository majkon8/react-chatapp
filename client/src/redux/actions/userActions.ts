import {
  SET_LOADING_UI,
  SET_ERROR,
  SET_SUCCESS,
  SET_AUTHENTICATED,
} from "../types";
import { Dispatch } from "redux";
import axios from "axios";

interface IUserData {
  username: string;
  email: string;
  birthDate: Date;
  password: string;
}

export const signup = (userData: IUserData) => async (dispatch: Dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    await axios.post("/users", userData);
    dispatch({
      type: SET_SUCCESS,
      payload: "Check you email to confirm an account",
    });
  } catch (error) {
    console.error(error);
    if (error.response.data.code === 11000)
      dispatch({ type: SET_ERROR, payload: "Email already registered" });
    else
      dispatch({
        type: SET_ERROR,
        payload: "Something went wrong. Try again later",
      });
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};
