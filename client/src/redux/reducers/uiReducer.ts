import {
  SET_ERROR,
  SET_SUCCESS,
  SET_LOADING_UI,
  UIActionTypes,
} from "../types";

export interface IUIState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: IUIState = {
  loading: false,
  error: null,
  success: null,
};

export default function (state = initialState, action: UIActionTypes) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload, success: null };
    case SET_SUCCESS:
      return { ...state, success: action.payload, error: null };
    case SET_LOADING_UI:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
