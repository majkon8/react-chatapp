"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ChatBar.scss");
var Settings_1 = __importDefault(require("../Settings/Settings"));
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapActionsToProps = { setIsChatOpen: uiActions_1.setIsChatOpen };
var connector = react_redux_1.connect(null, mapActionsToProps);
function ChatBar(_a) {
    var setIsChatOpen = _a.setIsChatOpen;
    var handleChatClose = function () { return setIsChatOpen(false); };
    return (react_1.default.createElement("div", { className: "chat-bar-container" },
        react_1.default.createElement("div", { onClick: handleChatClose, className: "return-icon" },
            react_1.default.createElement("i", { className: "fa fa-angle-left" })),
        react_1.default.createElement("div", { className: "user-info" },
            react_1.default.createElement("img", { src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" }),
            react_1.default.createElement("div", { className: "title-active-container" },
                react_1.default.createElement("span", { className: "conversation-title" }),
                react_1.default.createElement("span", { className: "last-active" }))),
        react_1.default.createElement(Settings_1.default, null)));
}
exports.default = connector(ChatBar);
