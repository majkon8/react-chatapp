"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
var react_1 = __importDefault(require("react"));
require("./Message.scss");
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var connector = react_redux_1.connect(mapStateToProps, {});
function formatDate(date) {
    var now = new Date();
    var nowDay = now.getDate();
    var nowMonth = now.getMonth();
    var nowYear = now.getFullYear();
    var dateDay = date.slice(8, 10);
    var dateMonth = date.slice(5, 7);
    var dateYear = date.slice(0, 4);
    var formattedTime = date.slice(11, 16);
    if (nowYear === +dateYear &&
        nowMonth + 1 === +dateMonth &&
        nowDay === +dateDay) {
        return formattedTime;
    }
    else if (nowYear === +dateYear) {
        return dateDay + "." + dateMonth + ", " + formattedTime;
    }
    else {
        return dateDay + "." + dateMonth + "." + dateYear + ", " + formattedTime;
    }
}
exports.formatDate = formatDate;
function Message(_a) {
    var isOwnMessage = _a.isOwnMessage, UI = _a.UI, body = _a.body, createdAt = _a.createdAt;
    var textColor = [
        "rgb(127, 219, 255)",
        "rgb(1, 255, 112)",
        "rgb(255, 220, 0)",
        "rgb(221, 221, 221)",
    ].includes(UI.color)
        ? "#333"
        : "#eee";
    var formattedCreatedAt = formatDate(createdAt);
    return (react_1.default.createElement("div", { className: "chat-message-container " + (isOwnMessage ? "own-chat-message" : "other-chat-message") },
        react_1.default.createElement("div", { className: "chat-message-content" },
            !isOwnMessage && (react_1.default.createElement("img", { className: "chat-message-user-image", src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" })),
            react_1.default.createElement("span", { style: {
                    backgroundColor: isOwnMessage ? UI.color : "",
                    borderColor: isOwnMessage ? UI.color : "",
                    color: isOwnMessage ? textColor : "",
                }, className: "chat-message-text" }, body)),
        react_1.default.createElement("span", { className: "chat-message-time" }, formattedCreatedAt)));
}
exports.default = connector(Message);
