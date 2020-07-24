import {
  SET_ERROR,
  SET_SUCCESS,
  SET_LOADING_UI,
  SET_THEME,
  SET_COLOR,
  UIActionTypes,
  SET_CHAT_OPEN,
} from "../types";

export interface IUIState {
  loading: boolean;
  error: string | null;
  success: string | null;
  theme: string;
  color: string;
  isChatOpen: boolean;
}

const initialState: IUIState = {
  loading: false,
  error: null,
  success: null,
  theme: localStorage.getItem("theme") || "dark",
  color: localStorage.getItem("color") || "rgb(84, 89, 230)",
  // Only usable for screen resolution <= 768px
  isChatOpen: false,
};

export default function (state = initialState, action: UIActionTypes) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload, success: null };
    case SET_SUCCESS:
      return { ...state, success: action.payload, error: null };
    case SET_LOADING_UI:
      return { ...state, loading: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_COLOR:
      return { ...state, color: action.payload };
    case SET_CHAT_OPEN:
      return { ...state, isChatOpen: action.payload };
    default:
      return state;
  }
}
