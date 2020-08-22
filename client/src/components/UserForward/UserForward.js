"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./UserForward.scss");
function UserForward(_a) {
    var sent = _a.sent, conversation = _a.conversation, sendMessage = _a.sendMessage, addUserToSent = _a.addUserToSent;
    var handleSend = function () {
        if (sent)
            return;
        sendMessage(conversation._id, conversation.user.username, conversation.user._id);
        addUserToSent(conversation.user._id);
    };
    return (react_1.default.createElement("div", { className: "user-forward-container" },
        react_1.default.createElement("img", { src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" }),
        react_1.default.createElement("p", { className: "user-forward-username" }, conversation.user.username),
        react_1.default.createElement("button", { onClick: handleSend, className: "button is-primary is-outlined user-forward-button", disabled: sent }, sent ? "Sent" : "Send")));
}
exports.default = UserForward;
