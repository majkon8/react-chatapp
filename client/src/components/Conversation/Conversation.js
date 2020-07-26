"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Conversation.scss");
function Conversation(_a) {
    var _b = _a.isActive, isActive = _b === void 0 ? false : _b, isNew = _a.isNew, username = _a.username, handleChatOpen = _a.handleChatOpen;
    return (react_1.default.createElement("div", { onClick: handleChatOpen, className: "conversation-container " + (isActive && "active-conversation") },
        react_1.default.createElement("img", { src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" }),
        react_1.default.createElement("div", { className: "title-message-container" },
            react_1.default.createElement("span", { className: "conversation-title" }, username),
            !isNew && (react_1.default.createElement("span", { className: "conversation-message" },
                "Hello man",
                react_1.default.createElement("span", null, " \u00B7 13:43"))))));
}
exports.default = Conversation;
