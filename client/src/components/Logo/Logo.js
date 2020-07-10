"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Logo.scss");
function Logo() {
    return (react_1.default.createElement("a", { href: "/", className: "main-logo" },
        react_1.default.createElement("span", { className: "logo-chat" }, "CHAT"),
        react_1.default.createElement("span", { className: "has-text-primary" }, "APP")));
}
exports.default = Logo;
