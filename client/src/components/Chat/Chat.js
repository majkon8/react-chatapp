"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
require("./Chat.scss");
var simplebar_react_1 = __importDefault(require("simplebar-react"));
require("simplebar/dist/simplebar.min.css");
var Message_1 = __importDefault(require("../Message/Message"));
var core_1 = require("@material-ui/core");
// redux
var react_redux_1 = require("react-redux");
var dataActions_1 = require("../../redux/actions/dataActions");
// Assets
var notificationSound = require("../../assets/notification_sound.mp3");
var mapStateToProps = function (state) { return ({
    UI: state.UI,
    data: state.data,
    user: state.user,
}); };
var mapActionsToProps = { setNewMessage: dataActions_1.setNewMessage, getMessages: dataActions_1.getMessages };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function Chat(_a) {
    var _b;
    var socket = _a.socket, UI = _a.UI, data = _a.data, user = _a.user, setNewMessage = _a.setNewMessage, getMessages = _a.getMessages;
    var _c = __read(react_1.useState(false), 2), isScrolling = _c[0], setIsScrolling = _c[1];
    var _d = __read(react_1.useState(2), 2), page = _d[0], setPage = _d[1];
    var scrollRef = react_1.useRef();
    react_1.useEffect(function () {
        var _a, _b, _c;
        if ((_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.new)
            return;
        // gets conversation which is selected
        var conversation = (_b = data.conversations) === null || _b === void 0 ? void 0 : _b.filter(function (conversation) { var _a; return conversation._id === ((_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.id); })[0];
        if (conversation === null || conversation === void 0 ? void 0 : conversation.isDisplayed)
            return;
        if ((conversation === null || conversation === void 0 ? void 0 : conversation.lastMessage.authorId) !== ((_c = user.authenticatedUser) === null || _c === void 0 ? void 0 : _c._id)) {
            socket === null || socket === void 0 ? void 0 : socket.emit("displayMessage", conversation === null || conversation === void 0 ? void 0 : conversation._id);
        }
    }, [data.selectedConversation, data.messages]);
    // scroll chat to bottom when getting new message or selecting new conversation
    react_1.useEffect(function () {
        if (isScrolling) {
            // if getting more messages then scroll a little bit down
            if (scrollRef.current.getScrollElement().scrollTop === 0)
                scrollRef.current.getScrollElement().scrollTop = 100;
        }
        else
            scrollToBottom();
    }, [data.messages, UI.pending.messages]);
    react_1.useEffect(function () {
        socket === null || socket === void 0 ? void 0 : socket.on("receiveMessage", function (message) {
            var _a, _b;
            if (message.createdMessage.authorId !== ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a._id)) {
                var audio = new Audio(notificationSound);
                audio.play();
            }
            // if the message started new conversation
            if (message.sender && message.receiver) {
                // if the user is a sender, then set another user (receiver) to conversation and vice versa
                var conversationUser = message.sender._id === ((_b = user.authenticatedUser) === null || _b === void 0 ? void 0 : _b._id)
                    ? message.receiver
                    : message.sender;
                var messageData = {
                    createdMessage: message.createdMessage,
                    // set user to newConversation
                    newConversation: __assign(__assign({}, message.newConversation), { user: conversationUser }),
                };
                setNewMessage(messageData);
            }
            else
                setNewMessage(message);
        });
        return function () {
            socket === null || socket === void 0 ? void 0 : socket.off("receiveMessage");
        };
    }, [socket, user.authenticatedUser]);
    react_1.useEffect(function () {
        var _a, _b;
        if ((_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.id) {
            var messagesCount = ((_b = data.messages) === null || _b === void 0 ? void 0 : _b.length) || 0;
            var newMessagesSinceLastMessagesFetch = (page - 1) * 10;
            var count = page * 10 + messagesCount - newMessagesSinceLastMessagesFetch;
            getMessages(data.selectedConversation.id, count);
        }
    }, [page]);
    react_1.useEffect(function () {
        setPage(1);
    }, [data.selectedConversation]);
    var handleScroll = function () {
        var _a;
        var scrollTop = scrollRef.current.getScrollElement().scrollTop;
        var height = scrollRef.current.el.getElementsByClassName("simplebar-content-wrapper")[0].scrollHeight;
        var scrollHeight = scrollRef.current.getScrollElement().clientHeight;
        var scrollBottom = height - (scrollTop + scrollHeight);
        if (scrollBottom > 50)
            setIsScrolling(true);
        else
            setIsScrolling(false);
        if ((_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.new)
            return;
        if (scrollTop === 0 && scrollBottom > 0) {
            setPage(page + 1);
        }
    };
    var scrollToBottom = function () {
        var height = scrollRef.current.el.getElementsByClassName("simplebar-content-wrapper")[0].scrollHeight;
        scrollRef.current.getScrollElement().scrollTop = height;
    };
    return (react_1.default.createElement("div", { className: "chat-container" },
        react_1.default.createElement(simplebar_react_1.default
        // @ts-ignore
        , { 
            // @ts-ignore
            ref: scrollRef, onScroll: handleScroll, style: { maxHeight: "calc(100vh - 140px)" } }, UI.pending.messages ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : ((_b = data.messages) === null || _b === void 0 ? void 0 : _b.map(function (message, index) {
            var _a;
            return (react_1.default.createElement(Message_1.default, { key: message._id, isOwnMessage: message.authorId === ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a._id), body: message.body, createdAt: message.createdAt, isLast: index === data.messages.length - 1 }));
        }))),
        react_1.default.createElement("button", { onClick: scrollToBottom, style: {
                color: UI.color,
                opacity: isScrolling ? 1 : 0,
                cursor: isScrolling ? "pointer" : "auto",
            }, className: "button is-rounded scroll-down-button" },
            react_1.default.createElement("i", { className: "fas fa-arrow-down" }))));
}
exports.default = connector(Chat);
