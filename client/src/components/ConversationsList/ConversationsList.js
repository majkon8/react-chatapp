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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
var mapActionsToProps = { getAllConversations: dataActions_1.getAllConversations, displayMessage: dataActions_1.displayMessage };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function ConversationsList(_a) {
    var _b;
    var socket = _a.socket, UI = _a.UI, data = _a.data, user = _a.user, getAllConversations = _a.getAllConversations, displayMessage = _a.displayMessage;
    var _c = __read(react_1.useState(""), 2), activeId = _c[0], setActiveId = _c[1];
    var _d = __read(react_1.useState([]), 2), filteredConversations = _d[0], setFilteredConversations = _d[1];
    react_1.useEffect(function () {
        getAllConversations();
    }, []);
    react_1.useEffect(function () {
        socket === null || socket === void 0 ? void 0 : socket.on("messageDisplayed", function (updatedConversation) {
            return displayMessage(updatedConversation);
        });
        return function () {
            socket === null || socket === void 0 ? void 0 : socket.off("messageDisplayed");
        };
    }, [socket, user.authenticatedUser]);
    react_1.useEffect(function () {
        var _a;
        var id = ((_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.id) || "";
        setActiveId(id);
    }, [data.selectedConversation]);
    react_1.useEffect(function () {
        var _a;
        var filtered = (_a = data.conversations) === null || _a === void 0 ? void 0 : _a.filter(function (conversation) {
            var searchString = data.searchConversations.toLowerCase();
            var username = conversation.members.usernames.filter(function (username) { var _a; return username != ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a.username); })[0] || conversation.members.usernames[0];
            if (username.toLowerCase().includes(searchString))
                return true;
            return false;
        });
        setFilteredConversations(filtered);
    }, [data.conversations, data.searchConversations]);
    var handleActive = function (id) { return setActiveId(id); };
    return (react_1.default.createElement("ul", { className: "conversations-list-container " + (UI.isChatOpen && "is-closed") },
        react_1.default.createElement(simplebar_react_1.default, { style: { maxHeight: "calc(100vh - 70px)" } },
            UI.pending.search ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : ((_b = data.searchedUsers) === null || _b === void 0 ? void 0 : _b.map(function (searchedUser) { return (react_1.default.createElement(Conversation_1.default, { isActive: activeId === searchedUser._id, key: searchedUser._id, isNew: true, username: searchedUser.username, userId: searchedUser._id, id: searchedUser._id, handleActive: handleActive })); })),
            UI.pending.conversations || UI.pending.auth ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : (filteredConversations === null || filteredConversations === void 0 ? void 0 : filteredConversations.map(function (conversation, index) {
                var _a;
                return (react_1.default.createElement(Conversation_1.default, { isActive: activeId === "" ? index === 0 : activeId === conversation._id, key: conversation._id, isNew: false, username: conversation.user.username, userId: conversation.user._id, id: conversation._id, message: conversation.lastMessage.body, createdAt: conversation.lastMessage.createdAt, handleActive: handleActive, isDisplayed: conversation.isDisplayed ||
                        conversation.lastMessage.authorId === ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a._id) }));
            })))));
}
exports.default = connector(ConversationsList);
