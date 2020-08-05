"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Conversation.scss");
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapStateToProps = function (state) { return ({ UI: state.UI, data: state.data }); };
var mapActionsToProps = { setIsChatOpen: uiActions_1.setIsChatOpen, setSelectedConversation: dataActions_1.setSelectedConversation };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function Conversation(_a) {
    var isActive = _a.isActive, isNew = _a.isNew, username = _a.username, userId = _a.userId, id = _a.id, message = _a.message, handleActive = _a.handleActive, setIsChatOpen = _a.setIsChatOpen, setSelectedConversation = _a.setSelectedConversation;
    var handleChatOpen = function () { return setIsChatOpen(true); };
    var selectNewConversation = function (id) {
        var conversation = { new: isNew === true, id: id, username: username, userId: userId };
        setSelectedConversation(conversation);
    };
    var handleClick = function () {
        handleActive(id);
        handleChatOpen();
        selectNewConversation(id);
    };
    return (react_1.default.createElement("div", { onClick: handleClick, className: "conversation-container " + (isActive && "active-conversation") },
        react_1.default.createElement("img", { src: "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" }),
        react_1.default.createElement("div", { className: "title-message-container" },
            react_1.default.createElement("span", { className: "conversation-title" }, username),
            !isNew && (react_1.default.createElement("span", { className: "conversation-message" },
                message,
                react_1.default.createElement("span", null, " \u00B7 13:43"))))));
}
exports.default = connector(Conversation);
