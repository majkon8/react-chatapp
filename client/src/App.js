"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./App.scss");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var home_1 = __importDefault(require("./pages/home/home"));
var Logo_1 = __importDefault(require("./components/Logo/Logo"));
var login_1 = __importDefault(require("./pages/login/login"));
var register_1 = __importDefault(require("./pages/register/register"));
var resetPassword_1 = __importDefault(require("./pages/reset-password/resetPassword"));
function App() {
    var location = react_router_dom_1.useLocation();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "app-container" },
            react_1.default.createElement(Logo_1.default, null),
            react_1.default.createElement(framer_motion_1.AnimatePresence, null,
                react_1.default.createElement(react_router_dom_1.Switch, { location: location, key: location.pathname },
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: home_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/login", component: login_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/register", component: register_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/reset", component: resetPassword_1.default }))))));
}
exports.default = App;
