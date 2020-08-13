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
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapStateToProps = function (state) { return ({
    UI: state.UI,
    data: state.data,
    user: state.user,
}); };
var mapActionsToProps = { setImageUrlToOpen: uiActions_1.setImageUrlToOpen };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
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
    var isOwnMessage = _a.isOwnMessage, UI = _a.UI, data = _a.data, user = _a.user, messageId = _a.messageId, body = _a.body, type = _a.type, file = _a.file, createdAt = _a.createdAt, isLast = _a.isLast, socket = _a.socket, setImageUrlToOpen = _a.setImageUrlToOpen;
    var isMessageDeleted = type === "text" && body === "";
    var textColor = [
        "rgb(127, 219, 255)",
        "rgb(1, 255, 112)",
        "rgb(255, 220, 0)",
        "rgb(221, 221, 221)",
    ].includes(UI.color)
        ? "#333"
        : "#eee";
    var formattedCreatedAt = formatDate(createdAt);
    var shouldShowThatIsDisplayed = function () {
        var _a, _b;
        var conversation = (_a = data.conversations) === null || _a === void 0 ? void 0 : _a.filter(function (conversation) { var _a; return conversation._id === ((_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.id); })[0];
        return (isOwnMessage && (
        // check if conversation which is currently selected is displayed
        conversation === null || 
        // check if conversation which is currently selected is displayed
        conversation === void 0 ? void 0 : 
        // check if conversation which is currently selected is displayed
        conversation.isDisplayed) &&
            (conversation === null || conversation === void 0 ? void 0 : conversation.lastMessage.authorId) === ((_b = user.authenticatedUser) === null || _b === void 0 ? void 0 : _b._id) &&
            isLast);
    };
    var openFullImage = function () { return setImageUrlToOpen(file.url); };
    var handleMessageDelete = function () { var _a; return socket === null || socket === void 0 ? void 0 : socket.emit("deleteMessage", {
        messageId: messageId,
        otherUserId: (_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.userId,
    }); };
    return (react_1.default.createElement("div", { className: "chat-message-container " + (isOwnMessage ? "own-chat-message" : "other-chat-message") },
        react_1.default.createElement("div", { className: "chat-message-content" },
            isOwnMessage && !isMessageDeleted && (react_1.default.createElement("div", { onClick: handleMessageDelete, className: "chat-message-delete" },
                react_1.default.createElement("i", { className: "far fa-trash-alt" }))),
            !isOwnMessage && (react_1.default.createElement("img", { className: "chat-message-user-image", src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" })),
            shouldShowThatIsDisplayed() && (react_1.default.createElement("img", { className: "is-displayed-indicator", src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" })),
            react_1.default.createElement("span", { style: {
                    backgroundColor: isOwnMessage ? UI.color : "",
                    borderColor: isOwnMessage ? UI.color : "",
                    color: isOwnMessage ? textColor : "",
                }, className: "chat-message-text" },
                isMessageDeleted && (react_1.default.createElement("span", { className: "chat-message-deleted" }, "Message deleted")),
                !isMessageDeleted && body,
                type === "other" && react_1.default.createElement(File_1.default, { name: file.name, url: file.url }),
                type === "image" && (react_1.default.createElement("img", { onClick: openFullImage, className: "image-small", src: file.url })),
                type === "video" && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(react_device_detect_1.BrowserView, null,
                        react_1.default.createElement("video", { className: "video", controls: true },
                            react_1.default.createElement("source", { src: file.url }))),
                    react_1.default.createElement(react_device_detect_1.MobileView, null,
                        react_1.default.createElement("video", { preload: "metadata", className: "video", controls: true },
                            react_1.default.createElement("source", { src: file.url + "#t=0.01" }))))))),
        react_1.default.createElement("span", { className: "chat-message-time" }, formattedCreatedAt)));
}
exports.default = connector(Message);
