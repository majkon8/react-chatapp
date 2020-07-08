"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./SideNav.scss");
function SideNav(_a) {
    var isOpen = _a.isOpen, toggleOpen = _a.toggleOpen;
    return (react_1.default.createElement("div", { className: "side-container" + (isOpen ? " side-open" : " side-close") },
        react_1.default.createElement("button", { onClick: toggleOpen, className: "hamburger hamburger--squeeze" + (isOpen && " is-active"), type: "button" },
            react_1.default.createElement("span", { className: "hamburger-box" },
                react_1.default.createElement("span", { className: "hamburger-inner" }))),
        react_1.default.createElement("nav", { className: "side-nav" },
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Features"),
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "About us"),
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Security"),
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Support"),
            react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Download")),
        react_1.default.createElement("button", { className: "button is-medium is-primary is-rounded side-nav-login-button" }, "Sign in")));
}
exports.default = SideNav;
