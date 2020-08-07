"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ChatSearch.scss");
var ChatInput_1 = __importDefault(require("../../common/ChatInput/ChatInput"));
// redux
var react_redux_1 = require("react-redux");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var mapActionsToProps = { searchForUsers: dataActions_1.searchForUsers, setSearchConversations: dataActions_1.setSearchConversations };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function ChatSearch(_a) {
    var UI = _a.UI, searchForUsers = _a.searchForUsers, setSearchConversations = _a.setSearchConversations;
    var handleChange = function (event) {
        var usernameToSearch = event.target.value;
        searchForUsers(usernameToSearch);
        setSearchConversations(usernameToSearch);
    };
    return (react_1.default.createElement("div", { className: "chat-search-container " + (UI.isChatOpen && "is-closed") },
        react_1.default.createElement(ChatInput_1.default, { handleChange: function (e) { return handleChange(e); }, isSearchInput: true })));
}
exports.default = connector(ChatSearch);
