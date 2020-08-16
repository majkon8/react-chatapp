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
require("./main.scss");
var framer_motion_1 = require("framer-motion");
var home_1 = require("../home/home");
var Chat_1 = __importDefault(require("../../components/Chat/Chat"));
var ConversationsList_1 = __importDefault(require("../../components/ConversationsList/ConversationsList"));
var ChatForm_1 = __importDefault(require("../../components/ChatForm/ChatForm"));
var ChatSearch_1 = __importDefault(require("../../components/ChatSearch/ChatSearch"));
var ChatBar_1 = __importDefault(require("../../components/ChatBar/ChatBar"));
var socket_io_client_1 = __importDefault(require("socket.io-client"));
// redux
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../redux/actions/userActions");
var mapStateToProps = function (state) { return ({
    UI: state.UI,
    user: state.user,
    data: state.data,
}); };
var mapActionsToProps = { getAuthenticatedUser: userActions_1.getAuthenticatedUser };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function Main(_a) {
    var _b;
    var UI = _a.UI, user = _a.user, data = _a.data, getAuthenticatedUser = _a.getAuthenticatedUser;
    var _c = __read(react_1.useState(null), 2), socket = _c[0], setSocket = _c[1];
    var _d = __read(react_1.useState([]), 2), typingUsersIds = _d[0], setTypingUsersIds = _d[1];
    react_1.useEffect(function () {
        var _a;
        var undisplayedConversations = (_a = data.conversations) === null || _a === void 0 ? void 0 : _a.filter(function (conversation) { return !conversation.isDisplayed; });
        if (undisplayedConversations &&
            undisplayedConversations.length > 0 &&
            undisplayedConversations.some(function (conversation) { var _a; return conversation.lastMessage.authorId !== ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a._id); }))
            document.title = "(!) Chat App";
        else
            document.title = "Chat App";
    }, [data.conversations, user.authenticatedUser]);
    react_1.useEffect(function () {
        getAuthenticatedUser();
    }, []);
    var setupSocket = function () {
        var accessToken = user.accessToken;
        if (accessToken && !socket) {
            var server = process.env.NODE_ENV === "production"
                ? window.location.hostname
                : "http://localhost:3000";
            var newSocket = socket_io_client_1.default(server, { query: { accessToken: accessToken } });
            newSocket.on("disconnect", function () {
                setSocket(null);
                setTimeout(setupSocket, 3000);
            });
            setSocket(newSocket);
        }
    };
    react_1.useEffect(function () {
        socket === null || socket === void 0 ? void 0 : socket.on("receiveIsTyping", function (typingData) {
            if (typingData.isTyping)
                setTypingUsersIds(__spread(typingUsersIds, [typingData.userId]));
            else
                setTypingUsersIds(__spread(typingUsersIds.filter(function (userId) { return userId !== typingData.userId; })));
        });
        return function () {
            socket === null || socket === void 0 ? void 0 : socket.off("receiveIsTyping");
        };
    }, [socket, user.authenticatedUser]);
    react_1.useEffect(function () {
        if (!user.accessToken)
            return;
        setupSocket();
    }, [user.accessToken]);
    return (react_1.default.createElement(framer_motion_1.motion.div, { id: "main-container", className: "main-container " + (UI.theme === "light" && "theme-light"), initial: "initial", animate: "in", exit: "out", variants: home_1.pageVariants, transition: home_1.pageTransition },
        react_1.default.createElement(ChatSearch_1.default, null),
        react_1.default.createElement(ConversationsList_1.default, { socket: socket, typingUsersIds: typingUsersIds }),
        react_1.default.createElement(ChatBar_1.default, null),
        react_1.default.createElement(Chat_1.default, { socket: socket, isTyping: typingUsersIds.includes(((_b = data.selectedConversation) === null || _b === void 0 ? void 0 : _b.userId) || "") }),
        react_1.default.createElement(ChatForm_1.default, { socket: socket })));
}
exports.default = connector(Main);
