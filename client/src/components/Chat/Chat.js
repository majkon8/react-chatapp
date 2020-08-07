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
require("./Chat.scss");
var simplebar_react_1 = __importDefault(require("simplebar-react"));
require("simplebar/dist/simplebar.min.css");
var Message_1 = __importDefault(require("../Message/Message"));
var core_1 = require("@material-ui/core");
// redux
var react_redux_1 = require("react-redux");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapStateToProps = function (state) { return ({
    UI: state.UI,
    data: state.data,
    user: state.user,
}); };
var mapActionsToProps = { setNewMessage: dataActions_1.setNewMessage };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function Chat(_a) {
    var _b;
    var socket = _a.socket, UI = _a.UI, data = _a.data, user = _a.user, setNewMessage = _a.setNewMessage;
    var _c = __read(react_1.useState(false), 2), isScrolling = _c[0], setIsScrolling = _c[1];
    var scrollRef = react_1.useRef();
    react_1.useEffect(function () {
        if (isScrolling)
            return;
        var height = scrollRef.current.el.getElementsByClassName("simplebar-content-wrapper")[0].scrollHeight;
        scrollRef.current.getScrollElement().scrollTop = height;
    }, [data.messages]);
    react_1.useEffect(function () {
        socket === null || socket === void 0 ? void 0 : socket.on("receiveMessage", function (message) { return setNewMessage(message); });
        return function () {
            socket === null || socket === void 0 ? void 0 : socket.off("receiveMessage");
        };
    }, [socket]);
    var handleScroll = function () {
        var scrollTop = scrollRef.current.getScrollElement().scrollTop;
        var height = scrollRef.current.el.getElementsByClassName("simplebar-content-wrapper")[0].scrollHeight;
        var scrollHeight = scrollRef.current.getScrollElement().clientHeight;
        var scrollBottom = height - (scrollTop + scrollHeight);
        if (scrollBottom > 100)
            setIsScrolling(true);
        else
            setIsScrolling(false);
    };
    return (react_1.default.createElement("div", { className: "chat-container" },
        react_1.default.createElement(simplebar_react_1.default
        // @ts-ignore
        , { 
            // @ts-ignore
            ref: scrollRef, onScroll: handleScroll, style: { maxHeight: "calc(100vh - 140px)" } }, UI.pending.messages ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : ((_b = data.messages) === null || _b === void 0 ? void 0 : _b.map(function (message) {
            var _a;
            return (react_1.default.createElement(Message_1.default, { key: message._id, isOwnMessage: message.authorId === ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a._id), body: message.body, createdAt: message.createdAt }));
        })))));
}
exports.default = connector(Chat);
