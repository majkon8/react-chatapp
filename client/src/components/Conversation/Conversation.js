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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Conversation.scss");
var Message_1 = require("../Message/Message");
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapStateToProps = function (state) { return ({ UI: state.UI, data: state.data }); };
var mapActionsToProps = {
    setIsChatOpen: uiActions_1.setIsChatOpen,
    setSelectedConversation: dataActions_1.setSelectedConversation,
    getMessages: dataActions_1.getMessages,
};
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function Conversation(_a) {
    var isActive = _a.isActive, isNew = _a.isNew, username = _a.username, userId = _a.userId, id = _a.id, message = _a.message, createdAt = _a.createdAt, handleActive = _a.handleActive, setIsChatOpen = _a.setIsChatOpen, setSelectedConversation = _a.setSelectedConversation, getMessages = _a.getMessages;
    react_1.useEffect(function () {
        if (isActive) {
            selectNewConversation(id);
            if (!isNew)
                getMessages(id);
            else
                getMessages(null);
        }
    }, [isActive]);
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
        react_1.default.createElement("img", { src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" }),
        react_1.default.createElement("div", { className: "title-message-container" },
            react_1.default.createElement("span", { className: "conversation-title" }, username),
            !isNew && createdAt && (react_1.default.createElement("span", { className: "conversation-message" },
                message,
                react_1.default.createElement("span", null,
                    " \u00B7 ",
                    Message_1.formatDate(createdAt)))))));
}
exports.default = connector(Conversation);
