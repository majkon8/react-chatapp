// user reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
// UI reducer types
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_LOADING_UI = "SET_LOADING_UI";

// user interfaces
interface ISetAuthenticatedAction {
  type: typeof SET_AUTHENTICATED;
  payload: boolean;
}

export type UserActionTypes = ISetAuthenticatedAction;

// UI interfaces
interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}
interface ISetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}
interface ISetLoadingUIAction {
  type: typeof SET_LOADING_UI;
  payload: boolean;
}

export type UIActionTypes =
  | ISetErrorAction
  | ISetSuccessAction
  | ISetLoadingUIAction;
