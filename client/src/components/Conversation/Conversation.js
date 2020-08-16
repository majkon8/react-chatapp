"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Conversation.scss");
var Message_1 = require("../Message/Message");
var TypingIndicator_1 = __importDefault(require("../../common/TypingIndicator/TypingIndicator"));
var DeleteConversation_1 = __importDefault(require("../DeleteConversation/DeleteConversation"));
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapStateToProps = function (state) { return ({ UI: state.UI, data: state.data }); };
var mapActionsToProps = {
    setIsChatOpen: uiActions_1.setIsChatOpen,
    setSelectedConversation: dataActions_1.setSelectedConversation,
    getInitialMessages: dataActions_1.getInitialMessages,
    deleteConversation: dataActions_1.deleteConversation,
};
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function Conversation(_a) {
    var _b;
    var isActive = _a.isActive, isNew = _a.isNew, lastMessage = _a.lastMessage, username = _a.username, userId = _a.userId, id = _a.id, isTyping = _a.isTyping, isDisplayed = _a.isDisplayed, handleActive = _a.handleActive, setIsChatOpen = _a.setIsChatOpen, setSelectedConversation = _a.setSelectedConversation, getInitialMessages = _a.getInitialMessages, deleteConversation = _a.deleteConversation;
    react_1.useEffect(function () {
        if (isActive) {
            selectNewConversation(id);
            if (!isNew)
                getInitialMessages(id, 20);
            else
                getInitialMessages(null);
        }
    }, [isActive]);
    var isMessageDeleted = (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.type) === "text" && lastMessage.body === "";
    var handleChatOpen = function () { return setIsChatOpen(true); };
    var selectNewConversation = function (id) {
        var conversation = { new: isNew === true, id: id, username: username, userId: userId };
        setSelectedConversation(conversation);
    };
    var handleClick = function () {
        handleChatOpen();
        if (isActive)
            return;
        handleActive(id);
    };
    return (react_1.default.createElement("div", { onClick: handleClick, className: "conversation-container " + (isActive && "active-conversation") },
        !isNew && (react_1.default.createElement(DeleteConversation_1.default, { conversationId: id, deleteConversation: deleteConversation })),
        react_1.default.createElement("img", { src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" }),
        react_1.default.createElement("div", { className: "title-message-container" },
            react_1.default.createElement("span", { style: { fontWeight: isDisplayed || isNew ? "normal" : "bold" }, className: "conversation-title" }, username),
            !isNew && (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.createdAt) && !isTyping && (react_1.default.createElement("span", { className: isDisplayed
                    ? "conversation-message"
                    : "conversation-message-not-displayed" },
                react_1.default.createElement("span", null,
                    Message_1.formatDate(lastMessage.createdAt),
                    " \u00B7 "),
                !isMessageDeleted && (react_1.default.createElement("span", { className: "conversation-message-body" }, lastMessage.body ? lastMessage.body : (_b = lastMessage.file) === null || _b === void 0 ? void 0 : _b.name)),
                isMessageDeleted && (react_1.default.createElement("span", { className: "conversation-message-deleted" }, "Message deleted")))),
            isTyping && (react_1.default.createElement(TypingIndicator_1.default, { showImage: false, changeBackgroundColor: true })))));
}
exports.default = connector(Conversation);
