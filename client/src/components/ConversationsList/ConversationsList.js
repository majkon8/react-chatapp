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
var core_1 = require("@material-ui/core");
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapStateToProps = function (state) { return ({ UI: state.UI, data: state.data }); };
var mapActionsToProps = { setIsChatOpen: uiActions_1.setIsChatOpen };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function ConversationsList(_a) {
    var UI = _a.UI, data = _a.data, setIsChatOpen = _a.setIsChatOpen;
    var handleChatOpen = function () { return setIsChatOpen(true); };
    return (react_1.default.createElement("ul", { className: "conversations-list-container " + (UI.isChatOpen && "is-closed") },
        react_1.default.createElement(simplebar_react_1.default, { style: { maxHeight: "calc(100vh - 70px)" } },
            data.searchedUsers.length > 0 && (react_1.default.createElement("p", { className: "conversations-title" }, "Make new conversation with:")),
            UI.loading ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : (data.searchedUsers.map(function (user) { return (react_1.default.createElement(Conversation_1.default, { isNew: true, username: user.username, handleChatOpen: handleChatOpen })); })),
            react_1.default.createElement("p", { className: "conversations-title" }, "Your conversations:"))));
}
exports.default = connector(ConversationsList);
