import {
  SET_LOADING_UI,
  SET_ERROR,
  SET_SUCCESS,
  SET_AUTHENTICATED,
  SET_AUTHENTICATED_USER,
} from "../types";
import { Dispatch } from "redux";
import axios from "axios";

interface IUserData {
  username?: string;
  email: string;
  birthDate?: Date;
  password?: string;
}

interface IResetPasswordData {
  newPassword: string;
  token: string;
}

interface ITokens {
  refreshToken: string;
  accessToken: string;
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
    const response = await axios.post("/users/login", userData);
    const accessToken: string = response.headers["x-access-token"];
    const refreshToken: string = response.headers["x-refresh-token"];
    setAuthorization({ accessToken, refreshToken });
    dispatch({ type: SET_ERROR, payload: null });
    dispatch({ type: SET_AUTHENTICATED, payload: true });
    dispatch({ type: SET_AUTHENTICATED_USER, payload: response.data });
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

// source is 'facebook' or 'google'
export const externalLogin = (data: IUserData) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    const response = await axios.post("/users/login/external", data);
    const accessToken: string = response.headers["x-access-token"];
    const refreshToken: string = response.headers["x-refresh-token"];
    setAuthorization({ accessToken, refreshToken });
    dispatch({ type: SET_ERROR, payload: null });
    dispatch({ type: SET_AUTHENTICATED, payload: true });
    dispatch({ type: SET_AUTHENTICATED_USER, payload: response.data });
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

// HELPERS
const setAuthorization = (tokens: ITokens) => {
  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;
  axios.defaults.headers.common["x-access-token"] = accessToken;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
