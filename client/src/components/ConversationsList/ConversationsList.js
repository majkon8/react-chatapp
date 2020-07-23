"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ConversationsList.scss");
var simplebar_react_1 = __importDefault(require("simplebar-react"));
require("simplebar/dist/simplebar.min.css");
var Conversation_1 = __importDefault(require("../Conversation/Conversation"));
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapActionsToProps = { setIsChatOpen: uiActions_1.setIsChatOpen };
var connector = react_redux_1.connect(null, mapActionsToProps);
function ConversationsList(_a) {
    var isChatOpen = _a.isChatOpen, setIsChatOpen = _a.setIsChatOpen;
    var handleChatOpen = function () { return setIsChatOpen(true); };
    return (react_1.default.createElement("ul", { className: "conversations-list-container " + (isChatOpen && "is-closed") },
        react_1.default.createElement(simplebar_react_1.default, { style: { maxHeight: "calc(100vh - 70px)" } },
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen, isActive: true })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Conversation_1.default, { handleChatOpen: handleChatOpen })))));
}
exports.default = connector(ConversationsList);
