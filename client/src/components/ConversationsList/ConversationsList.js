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
require("./ConversationsList.scss");
var simplebar_react_1 = __importDefault(require("simplebar-react"));
require("simplebar/dist/simplebar.min.css");
var Conversation_1 = __importDefault(require("../Conversation/Conversation"));
var core_1 = require("@material-ui/core");
// redux
var react_redux_1 = require("react-redux");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapStateToProps = function (state) { return ({
    UI: state.UI,
    data: state.data,
    user: state.user,
}); };
var mapActionsToProps = { getAllConversations: dataActions_1.getAllConversations };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function ConversationsList(_a) {
    var _b, _c;
    var UI = _a.UI, data = _a.data, user = _a.user, getAllConversations = _a.getAllConversations;
    var _d = react_1.useState(""), activeId = _d[0], setActiveId = _d[1];
    react_1.useEffect(function () {
        getAllConversations();
    }, []);
    var handleActive = function (id) { return setActiveId(id); };
    return (react_1.default.createElement("ul", { className: "conversations-list-container " + (UI.isChatOpen && "is-closed") },
        react_1.default.createElement(simplebar_react_1.default, { style: { maxHeight: "calc(100vh - 70px)" } },
            data.searchedUsers && data.searchedUsers.length > 0 && (react_1.default.createElement("p", { className: "conversations-title" }, "Make new conversation with:")),
            UI.loading && data.searchedUsers ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : ((_b = data.searchedUsers) === null || _b === void 0 ? void 0 : _b.map(function (searchedUser) { return (react_1.default.createElement(Conversation_1.default, { isActive: activeId === searchedUser._id, key: searchedUser._id, isNew: true, username: searchedUser.username, userId: searchedUser._id, id: searchedUser._id, handleActive: handleActive })); })),
            react_1.default.createElement("p", { className: "conversations-title" }, "Your conversations:"),
            (UI.loading && !data.conversations) || !user.authenticatedUser ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : ((_c = data.conversations) === null || _c === void 0 ? void 0 : _c.map(function (conversation) { return (react_1.default.createElement(Conversation_1.default, { isActive: activeId === conversation._id, key: conversation._id, isNew: false, username: conversation.members.usernames.filter(function (username) { var _a; return username != ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a.username); })[0], userId: conversation.members.ids.filter(function (id) { var _a; return id != ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a._id); })[0], id: conversation._id, message: conversation.lastMessage.body, handleActive: handleActive })); })))));
}
exports.default = connector(ConversationsList);
