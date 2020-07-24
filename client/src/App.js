"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./App.scss");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
// redux
var react_redux_1 = require("react-redux");
var store_1 = __importDefault(require("./redux/store"));
var types_1 = require("./redux/types");
// pages and components
var main_1 = __importDefault(require("./pages/main/main"));
var home_1 = __importDefault(require("./pages/home/home"));
var Logo_1 = __importDefault(require("./components/Logo/Logo"));
var login_1 = __importDefault(require("./pages/login/login"));
var register_1 = __importDefault(require("./pages/register/register"));
var resetPassword_1 = __importDefault(require("./pages/resetPassword/resetPassword"));
var AuthRoute_1 = __importDefault(require("./components/AuthRoute/AuthRoute"));
var UnauthRoute_1 = __importDefault(require("./components/UnauthRoute/UnauthRoute"));
var Terms = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require("./pages/terms/terms")); }); });
var PageNotFound = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require("./pages/pageNotFound/pageNotFound")); }); });
var ConfirmAccount = react_1.lazy(function () {
    return Promise.resolve().then(function () { return __importStar(require("./pages/confirmAccount/confirmAccount")); });
});
var refreshToken = localStorage.refreshToken;
if (refreshToken)
    store_1.default.dispatch({ type: types_1.SET_AUTHENTICATED, payload: true });
function App() {
    var location = react_router_dom_1.useLocation();
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement("div", { className: "app-container" },
            react_1.default.createElement(Logo_1.default, { location: location }),
            react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(react_1.default.Fragment, null) },
                react_1.default.createElement(framer_motion_1.AnimatePresence, null,
                    react_1.default.createElement(react_router_dom_1.Switch, { location: location, key: location.pathname },
                        react_1.default.createElement(UnauthRoute_1.default, { exact: true, path: "/", component: home_1.default }),
                        react_1.default.createElement(AuthRoute_1.default, { path: "/main", component: main_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/login", component: login_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/register", component: register_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/reset/:token", component: resetPassword_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/confirm/:token", component: ConfirmAccount }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/terms", component: Terms }),
                        react_1.default.createElement(react_router_dom_1.Route, { component: PageNotFound })))))));
}
exports.default = App;
