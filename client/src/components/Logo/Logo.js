"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Logo.scss");
var react_router_dom_1 = require("react-router-dom");
function Logo() {
    return (react_1.default.createElement("div", { className: "logo-container" },
        react_1.default.createElement(react_router_dom_1.NavLink, { to: "/home", className: "main-logo" },
            react_1.default.createElement("span", { className: "logo-chat" }, "CHAT"),
            react_1.default.createElement("span", { className: "has-text-primary" }, "APP"))));
}
exports.default = Logo;
