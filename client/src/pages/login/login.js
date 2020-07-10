"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./login.scss");
var Logo_1 = __importDefault(require("../../components/Logo/Logo"));
var LoginForm_1 = __importDefault(require("../../components/LoginForm/LoginForm"));
function Login() {
    return (react_1.default.createElement("div", { className: "login-page-container" },
        react_1.default.createElement(Logo_1.default, null),
        react_1.default.createElement(LoginForm_1.default, null)));
}
exports.default = Login;
