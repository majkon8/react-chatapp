import {
  SET_LOADING_UI,
  SET_ERROR,
  SET_SUCCESS,
  SET_AUTHENTICATED,
} from "../types";
import { Dispatch } from "redux";
import axios from "axios";

interface IUserData {
  username?: string;
  email: string;
  birthDate?: Date;
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

export const confirmAccount = (token: string) => async (dispatch: Dispatch) => {
  try {
    await axios.get(`/users/confirm/${token}`);
    dispatch({
      type: SET_SUCCESS,
      payload: "You can now log in",
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: SET_ERROR,
      payload: "Something went wrong. Try again later",
    });
  }
};

export const login = (userData: IUserData) => async (dispatch: Dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    await axios.post("/users/login", userData);
    dispatch({ type: SET_ERROR, payload: null });
    dispatch({ type: SET_AUTHENTICATED, payload: true });
  } catch (error) {
    console.error(error);
    if (error.response.data.error)
      dispatch({ type: SET_ERROR, payload: error.response.data.error });
    else
      dispatch({
        type: SET_ERROR,
        payload: "Something went wrong. Try again later",
      });
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

export const forgotPassword = (email: string) => async (dispatch: Dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    await axios.post("/users/forgot", { email });
    dispatch({
      type: SET_SUCCESS,
      payload: "Reset password email sent",
    });
  } catch (error) {
    console.error(error);
    if (error.response.data.error)
      dispatch({ type: SET_ERROR, payload: error.response.data.error });
    else
      dispatch({
        type: SET_ERROR,
        payload: "Something went wrong. Try again later",
      });
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

interface IResetPasswordData {
  newPassword: string;
  token: string;
}

export const resetPassword = (data: IResetPasswordData) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    await axios.post("/users/reset", data);
    dispatch({
      type: SET_SUCCESS,
      payload: "Password changed",
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: SET_ERROR,
      payload: "Something went wrong. Try again later",
    });
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};
