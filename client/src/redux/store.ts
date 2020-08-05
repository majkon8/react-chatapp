import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer, { IUserState } from "./reducers/userReducer";
import uiReducer, { IUIState } from "./reducers/uiReducer";
import dataReducer, { IDataState } from "./reducers/dataReducer";

export interface IState {
  UI: IUIState;
  user: IUserState;
  data: IDataState;
}

const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  data: dataReducer,
});
const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
