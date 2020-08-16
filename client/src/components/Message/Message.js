"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
var react_1 = __importDefault(require("react"));
require("./Message.scss");
var moment_1 = __importDefault(require("moment"));
var File_1 = __importDefault(require("../../common/File/File"));
var react_device_detect_1 = require("react-device-detect");
var DeleteMessage_1 = __importDefault(require("../DeleteMessage/DeleteMessage"));
var ReactionEmotes_1 = __importDefault(require("../ReactionEmotes/ReactionEmotes"));
var Reply_1 = __importDefault(require("../Reply/Reply"));
var Forward_1 = __importDefault(require("../Forward/Forward"));
var MessageImage_1 = __importDefault(require("../MessageImage/MessageImage"));
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({
    UI: state.UI,
    data: state.data,
    user: state.user,
}); };
var connector = react_redux_1.connect(mapStateToProps, {});
function formatDate(date) {
    if (moment_1.default().format("DD.MM.YYYY") === moment_1.default(date).format("DD.MM.YYYY")) {
        return moment_1.default(date).format("HH:mm");
    }
    else if (moment_1.default().format("YYYY") === moment_1.default(date).format("YYYY")) {
        return moment_1.default(date).format("DD.MM, HH:mm");
    }
    else {
        return moment_1.default(date).format("DD.MM.YYYY, HH:mm");
    }
}
exports.formatDate = formatDate;
function Message(_a) {
    var isOwnMessage = _a.isOwnMessage, UI = _a.UI, data = _a.data, user = _a.user, message = _a.message, isLast = _a.isLast, socket = _a.socket;
    var isMessageDeleted = message.type === "text" && message.body === "";
    var textColor = [
        "rgb(127, 219, 255)",
        "rgb(1, 255, 112)",
        "rgb(255, 220, 0)",
        "rgb(221, 221, 221)",
    ].includes(UI.color)
        ? "#333"
        : "#eee";
    var formattedCreatedAt = formatDate(message.createdAt);
    var shouldShowThatIsDisplayed = function () {
        var _a;
        var conversation = (_a = data.conversations) === null || _a === void 0 ? void 0 : _a.filter(function (conversation) { var _a; return conversation._id === ((_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.id); })[0];
        return (isOwnMessage && (
        // check if conversation which is currently selected is displayed
        conversation === null || 
        // check if conversation which is currently selected is displayed
        conversation === void 0 ? void 0 : 
        // check if conversation which is currently selected is displayed
        conversation.isDisplayed) &&
            (conversation === null || conversation === void 0 ? void 0 : conversation.lastMessage.authorId) === user.authenticatedUser._id &&
            isLast);
    };
    var shorten = function (text) {
        return text.length <= 100 ? text : text.slice(0, 98) + "...";
    };
    return (react_1.default.createElement("div", { className: "chat-message-container " + (isOwnMessage ? "own-chat-message" : "other-chat-message") },
        react_1.default.createElement("div", { className: "chat-message-content" },
            !isOwnMessage && !isMessageDeleted && (react_1.default.createElement(ReactionEmotes_1.default, { socket: socket, messageId: message._id, otherUserId: data.selectedConversation.userId })),
            !isMessageDeleted && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Reply_1.default, { isOwnMessage: isOwnMessage, to: isOwnMessage
                        ? user.authenticatedUser.username
                        : data.selectedConversation.username, body: message.body, fileName: message.file.name }),
                react_1.default.createElement(Forward_1.default, { isOwnMessage: isOwnMessage, message: message, socket: socket }))),
            isOwnMessage && !isMessageDeleted && (react_1.default.createElement(DeleteMessage_1.default, { socket: socket, messageId: message._id, otherUserId: data.selectedConversation.userId })),
            !isOwnMessage && (react_1.default.createElement("img", { className: "chat-message-user-image", src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" })),
            shouldShowThatIsDisplayed() && (react_1.default.createElement("img", { style: {
                    right: message.reactionEmote ? -30 : -20,
                    bottom: message.reactionEmote ? 3 : 5,
                }, className: "is-displayed-indicator", src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" })),
            react_1.default.createElement("div", { style: {
                    backgroundColor: isOwnMessage ? UI.color : "",
                    borderColor: isOwnMessage ? UI.color : "",
                    color: isOwnMessage ? textColor : "",
                }, className: "chat-message-text" },
                isMessageDeleted && (react_1.default.createElement("p", { className: "chat-message-deleted" }, "Message deleted")),
                !isMessageDeleted && (message === null || message === void 0 ? void 0 : message.replyData) && (react_1.default.createElement("div", { className: "chat-message-reply-data" },
                    react_1.default.createElement("p", null,
                        message.replyData.to,
                        ":"),
                    react_1.default.createElement("p", null, shorten(message.replyData.body)))),
                !isMessageDeleted && message.body,
                message.type === "other" && (react_1.default.createElement(File_1.default, { name: message.file.name, url: message.file.url })),
                message.type === "image" && react_1.default.createElement(MessageImage_1.default, { url: message.file.url }),
                message.type === "video" && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(react_device_detect_1.BrowserView, null,
                        react_1.default.createElement("video", { className: "video", controls: true },
                            react_1.default.createElement("source", { src: message.file.url }))),
                    react_1.default.createElement(react_device_detect_1.MobileView, null,
                        react_1.default.createElement("video", { preload: "metadata", className: "video", controls: true },
                            react_1.default.createElement("source", { src: message.file.url + "#t=0.01" })))))),
            message.reactionEmote && (react_1.default.createElement("span", { className: "message-reaction-emotes-container" }, message.reactionEmote))),
        react_1.default.createElement("p", { className: "chat-message-time" }, formattedCreatedAt)));
}
exports.default = connector(Message);
