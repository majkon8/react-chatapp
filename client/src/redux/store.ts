import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import { IUIState } from "./reducers/uiReducer";
import { IUserState } from "./reducers/userReducer";

export interface IState {
  UI: IUIState;
  user: IUserState;
}

const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({ user: userReducer, UI: uiReducer });
const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
