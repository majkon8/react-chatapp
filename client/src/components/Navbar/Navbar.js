"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Navbar.scss");
function Navbar(_a) {
    var isOpen = _a.isOpen, toggleOpen = _a.toggleOpen;
    return (react_1.default.createElement("div", { className: "navBar" },
        react_1.default.createElement("a", { href: "/", className: "logo" },
            react_1.default.createElement("span", { className: "logo-chat" }, "CHAT"),
            react_1.default.createElement("span", { className: "has-text-primary" }, "APP")),
        react_1.default.createElement("nav", { className: "main-nav" },
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Features"),
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "About us"),
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Security"),
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Support")),
        react_1.default.createElement("button", { className: "button is-primary is-rounded is-pulled-right navbar-login-button" }, "Sign in"),
        react_1.default.createElement("button", { onClick: toggleOpen, className: "hamburger hamburger--squeeze" + (isOpen && " is-active"), type: "button" },
            react_1.default.createElement("span", { className: "hamburger-box" },
                react_1.default.createElement("span", { className: "hamburger-inner" })))));
}
exports.default = Navbar;
