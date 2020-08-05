"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var userReducer_1 = __importDefault(require("./reducers/userReducer"));
var uiReducer_1 = __importDefault(require("./reducers/uiReducer"));
var dataReducer_1 = __importDefault(require("./reducers/dataReducer"));
var initialState = {};
var middleware = [redux_thunk_1.default];
var reducers = redux_1.combineReducers({
    user: userReducer_1.default,
    UI: uiReducer_1.default,
    data: dataReducer_1.default,
});
var composeEnhancers = typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : redux_1.compose;
var enhancer = composeEnhancers(redux_1.applyMiddleware.apply(void 0, __spread(middleware)));
var store = redux_1.createStore(reducers, initialState, enhancer);
exports.default = store;
