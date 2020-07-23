import { SET_THEME, SET_COLOR, SET_IS_CHAT_OPEN } from "../types";
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
  dispatch({ type: SET_IS_CHAT_OPEN, payload: isOpen });
