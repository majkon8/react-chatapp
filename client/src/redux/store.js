"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var userReducer_1 = __importDefault(require("./reducers/userReducer"));
var uiReducer_1 = __importDefault(require("./reducers/uiReducer"));
var initialState = {};
var middleware = [redux_thunk_1.default];
var reducers = redux_1.combineReducers({ user: userReducer_1.default, UI: uiReducer_1.default });
var composeEnhancers = typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : redux_1.compose;
var enhancer = composeEnhancers(redux_1.applyMiddleware.apply(void 0, middleware));
var store = redux_1.createStore(reducers, initialState, enhancer);
exports.default = store;
