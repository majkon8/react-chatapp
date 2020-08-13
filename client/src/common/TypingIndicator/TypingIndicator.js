"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./TypingIndicator.scss");
function TypingIndicator() {
    return (react_1.default.createElement("div", { className: "typing-indicator" },
        react_1.default.createElement("span", null),
        react_1.default.createElement("span", null),
        react_1.default.createElement("span", null)));
}
exports.default = TypingIndicator;
