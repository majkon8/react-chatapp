import {
  SET_THEME,
  SET_COLOR,
  SET_CHAT_OPEN,
  SET_IMAGE_URL_TO_OPEN,
} from "../types";
import { Dispatch } from "redux";

export const setTheme = (theme: string) => (dispatch: Dispatch) => {
  localStorage.setItem("theme", theme);
  dispatch({ type: SET_THEME, payload: theme });
};

export const setColor = (color: string) => (dispatch: Dispatch) => {
  localStorage.setItem("color", color);
  dispatch({ type: SET_COLOR, payload: color });
};

export const setIsChatOpen = (isOpen: boolean) => (dispatch: Dispatch) =>
  dispatch({ type: SET_CHAT_OPEN, payload: isOpen });

export const setImageUrlToOpen = (url: string | null) => (dispatch: Dispatch) =>
  dispatch({ type: SET_IMAGE_URL_TO_OPEN, payload: url });
