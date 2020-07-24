"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./main.scss");
var framer_motion_1 = require("framer-motion");
var home_1 = require("../home/home");
var Chat_1 = __importDefault(require("../../components/Chat/Chat"));
var ConversationsList_1 = __importDefault(require("../../components/ConversationsList/ConversationsList"));
var ChatForm_1 = __importDefault(require("../../components/ChatForm/ChatForm"));
var ChatSearch_1 = __importDefault(require("../../components/ChatSearch/ChatSearch"));
var ChatBar_1 = __importDefault(require("../../components/ChatBar/ChatBar"));
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var connector = react_redux_1.connect(mapStateToProps, {});
function Main(_a) {
    var UI = _a.UI;
    return (react_1.default.createElement(framer_motion_1.motion.div, { className: "main-container " + (UI.theme === "light" && "theme-light"), initial: "initial", animate: "in", exit: "out", variants: home_1.pageVariants, transition: home_1.pageTransition },
        react_1.default.createElement(ChatSearch_1.default, { isChatOpen: UI.isChatOpen }),
        react_1.default.createElement(ConversationsList_1.default, { isChatOpen: UI.isChatOpen }),
        react_1.default.createElement(ChatBar_1.default, null),
        react_1.default.createElement(Chat_1.default, null),
        react_1.default.createElement(ChatForm_1.default, null)));
}
exports.default = connector(Main);
