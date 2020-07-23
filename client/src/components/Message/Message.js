"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Message.scss");
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var connector = react_redux_1.connect(mapStateToProps, {});
function Message(_a) {
    var isMineMessage = _a.isMineMessage, UI = _a.UI;
    var textColor = [
        "rgb(127, 219, 255)",
        "rgb(1, 255, 112)",
        "rgb(255, 220, 0)",
        "rgb(221, 221, 221)",
    ].includes(UI.color)
        ? "#333"
        : "#eee";
    return (react_1.default.createElement("div", { className: "chat-message-container " + (isMineMessage ? "mine-chat-message" : "other-chat-message") },
        react_1.default.createElement("div", { className: "chat-message-content" },
            !isMineMessage && (react_1.default.createElement("img", { className: "chat-message-user-image", src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" })),
            react_1.default.createElement("span", { style: {
                    backgroundColor: isMineMessage ? UI.color : "",
                    borderColor: isMineMessage ? UI.color : "",
                    color: isMineMessage ? textColor : "",
                }, className: "chat-message-text" }, "Hello mate, how are you?")),
        react_1.default.createElement("span", { className: "chat-message-time" }, "23.07.2020, 17:22")));
}
exports.default = connector(Message);
