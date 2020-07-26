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
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var connector = react_redux_1.connect(mapStateToProps, {});
function Main(_a) {
    var UI = _a.UI;
    var _b = react_1.useState(null), socket = _b[0], setSocket = _b[1];
    var setupSocket = function () {
        var accessToken = localStorage.getItem("accessToken");
        if (accessToken && !socket) {
            var server = "http://localhost:3000";
            var newSocket = socket_io_client_1.default(server, { query: { accessToken: accessToken } });
            newSocket.on("disconnect", function () {
                setSocket(null);
                setTimeout(setupSocket, 3000);
                console.log("socket disconected");
            });
            newSocket.on("connect", function () {
                console.log("socket connected");
            });
            setSocket(newSocket);
        }
    };
    react_1.useEffect(function () {
        setupSocket();
    }, []);
    return (react_1.default.createElement(framer_motion_1.motion.div, { className: "main-container " + (UI.theme === "light" && "theme-light"), initial: "initial", animate: "in", exit: "out", variants: home_1.pageVariants, transition: home_1.pageTransition },
        react_1.default.createElement(ChatSearch_1.default, { isChatOpen: UI.isChatOpen }),
        react_1.default.createElement(ConversationsList_1.default, { isChatOpen: UI.isChatOpen }),
        react_1.default.createElement(ChatBar_1.default, null),
        react_1.default.createElement(Chat_1.default, { socket: socket }),
        react_1.default.createElement(ChatForm_1.default, { socket: socket })));
}
exports.default = connector(Main);
