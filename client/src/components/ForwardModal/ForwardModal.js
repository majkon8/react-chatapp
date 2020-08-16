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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./ForwardModal.scss");
var react_dom_1 = require("react-dom");
var hooks_1 = require("../../hooks/hooks");
var ChatInput_1 = __importDefault(require("../../common/ChatInput/ChatInput"));
var simplebar_react_1 = __importDefault(require("simplebar-react"));
var hooks_2 = require("../../hooks/hooks");
var UserForward_1 = __importDefault(require("../UserForward/UserForward"));
function ForwardModal(_a) {
    var conversations = _a.conversations, message = _a.message, socket = _a.socket, handleClose = _a.handleClose;
    var _b = __read(react_1.useState(false), 2), slideOut = _b[0], setSlideOut = _b[1];
    var innerRef = hooks_1.useOuterClick(function () {
        handleClick();
    });
    var windowWidth = hooks_2.useWindowWidth();
    var _c = __read(react_1.useState(conversations), 2), filteredConversations = _c[0], setFilteredConversations = _c[1];
    var _d = __read(react_1.useState([]), 2), sentToUsers = _d[0], setSentToUsers = _d[1];
    var filterUsers = function (event) {
        var usernameToSearch = event.target.value;
        setFilteredConversations(conversations.filter(function (conversation) {
            return conversation.user.username
                .toLowerCase()
                .includes(usernameToSearch.toLowerCase());
        }));
    };
    var handleClick = function () {
        setSlideOut(true);
        setTimeout(function () {
            handleClose();
        }, 300);
    };
    var sendMessage = function (conversationId, username, userId) {
        var messageData = {
            body: message.body,
            type: message.type,
            file: message.file,
            conversation: { new: false, id: conversationId, username: username, userId: userId },
        };
        socket === null || socket === void 0 ? void 0 : socket.emit("sendMessage", messageData);
    };
    var addUserToSent = function (userId) {
        return setSentToUsers(__spread(sentToUsers, [userId]));
    };
    return react_dom_1.createPortal(react_1.default.createElement("div", { className: "forward-users-container background-darken " + (slideOut && "background-lighten") },
        react_1.default.createElement("div", { className: "forward-users-list-container slide-in " + (slideOut && "slide-out"), ref: innerRef },
            react_1.default.createElement(simplebar_react_1.default, { style: {
                    maxHeight: windowWidth && windowWidth > 768 ? "500px" : "100vh",
                } },
                react_1.default.createElement("div", { className: "forward-users-list" },
                    react_1.default.createElement("button", { onClick: handleClick, className: "forward-close action-trigger" },
                        react_1.default.createElement("i", { className: "fas fa-times" })),
                    react_1.default.createElement("h1", null, "Forward message"),
                    react_1.default.createElement(ChatInput_1.default, { handleChange: filterUsers, icon: "fa fa-search", placeholder: "Search for users..." }),
                    filteredConversations.map(function (conversation) { return (react_1.default.createElement(UserForward_1.default, { key: conversation._id, conversation: conversation, sent: sentToUsers.includes(conversation.user._id), sendMessage: sendMessage, addUserToSent: addUserToSent })); }))))), 
    // @ts-ignore
    document.getElementById("main-container"));
}
exports.default = ForwardModal;
