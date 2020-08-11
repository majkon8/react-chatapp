import {
  SET_ERROR,
  SET_SUCCESS,
  SET_THEME,
  SET_COLOR,
  UIActionTypes,
  SET_CHAT_OPEN,
  SET_PENDING,
  SET_IMAGE_URL_TO_OPEN,
} from "../types";

export interface IPending {
  // auth is for signup/login/forgot password/reset password
  auth: boolean;
  search: boolean;
  conversations: boolean;
  messages: boolean;
}

export interface IUIState {
  pending: IPending;
  error: string | null;
  success: string | null;
  theme: string;
  color: string;
  isChatOpen: boolean;
  imageUrlToOpen: string | null;
}

const initialState: IUIState = {
  pending: {
    auth: false,
    search: false,
    conversations: false,
    messages: false,
  },
  error: null,
  success: null,
  theme: localStorage.getItem("theme") || "dark",
  color: localStorage.getItem("color") || "rgb(84, 89, 230)",
  // Only usable for screen resolution <= 768px
  isChatOpen: false,
  imageUrlToOpen: null,
};

export default function (state = initialState, action: UIActionTypes) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload, success: null };
    case SET_SUCCESS:
      return { ...state, success: action.payload, error: null };
    case SET_PENDING:
      return { ...state, pending: { ...state.pending, ...action.payload } };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_COLOR:
      return { ...state, color: action.payload };
    case SET_CHAT_OPEN:
      return { ...state, isChatOpen: action.payload };
    case SET_IMAGE_URL_TO_OPEN:
      return { ...state, imageUrlToOpen: action.payload };
    default:
      return state;
  }
}
