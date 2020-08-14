"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Reply.scss");
// redux
var react_redux_1 = require("react-redux");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapActionsToProps = { setReplyData: dataActions_1.setReplyData };
var connector = react_redux_1.connect(null, mapActionsToProps);
function Reply(_a) {
    var isOwnMessage = _a.isOwnMessage, to = _a.to, body = _a.body, fileName = _a.fileName, setReplyData = _a.setReplyData;
    var handleReply = function () {
        var replyData = { to: to, body: body ? body : fileName };
        setReplyData(replyData);
    };
    return (react_1.default.createElement("div", { title: "Reply", className: "reply-trigger-container " + (isOwnMessage ? "own-message" : "other-message") },
        react_1.default.createElement("div", { onClick: handleReply, className: "message-action-trigger" },
            react_1.default.createElement("i", { className: "fas fa-reply" }))));
}
exports.default = connector(Reply);
