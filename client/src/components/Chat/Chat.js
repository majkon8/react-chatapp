"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Chat.scss");
var simplebar_react_1 = __importDefault(require("simplebar-react"));
require("simplebar/dist/simplebar.min.css");
var Message_1 = __importDefault(require("../Message/Message"));
function Chat() {
    return (react_1.default.createElement("div", { className: "chat-container" },
        react_1.default.createElement(simplebar_react_1.default, { style: { maxHeight: "calc(100vh - 140px)" } },
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: false }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: false }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: false }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: false }),
            react_1.default.createElement(Message_1.default, { isMineMessage: false }),
            react_1.default.createElement(Message_1.default, { isMineMessage: false }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: false }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }),
            react_1.default.createElement(Message_1.default, { isMineMessage: true }))));
}
exports.default = Chat;
