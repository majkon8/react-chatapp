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
require("./ReactionEmotes.scss");
var Emoji_1 = __importDefault(require("../../common/Emoji/Emoji"));
var hooks_1 = require("../../hooks/hooks");
// redux
var react_redux_1 = require("react-redux");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapActionsToProps = { addReactionEmoteToMessage: dataActions_1.addReactionEmoteToMessage };
var connector = react_redux_1.connect(null, mapActionsToProps);
function ReactionEmotes(_a) {
    var socket = _a.socket, messageId = _a.messageId, otherUserId = _a.otherUserId, addReactionEmoteToMessage = _a.addReactionEmoteToMessage;
    var _b = __read(react_1.useState(false), 2), isEmotesPanelOpen = _b[0], setIsEmotesPanelOpen = _b[1];
    var innerRef = hooks_1.useOuterClick(function () { return setIsEmotesPanelOpen(false); });
    react_1.useEffect(function () {
        socket === null || socket === void 0 ? void 0 : socket.on("reactedToMessage", function (messageId, emote) {
            return addReactionEmoteToMessage(messageId, emote);
        });
        return function () {
            socket === null || socket === void 0 ? void 0 : socket.off("reactedToMessage");
        };
    }, [socket]);
    var toggleEmotesPanelOpen = function () { return setIsEmotesPanelOpen(!isEmotesPanelOpen); };
    var reactToMessage = function (emote) {
        socket === null || socket === void 0 ? void 0 : socket.emit("reactToMessage", messageId, emote, otherUserId);
    };
    return (react_1.default.createElement("div", { ref: innerRef, className: "reaction-emotes-container" },
        isEmotesPanelOpen && (react_1.default.createElement("div", { className: "reaction-emotes-panel" },
            react_1.default.createElement(Emoji_1.default, { handleClick: reactToMessage, emote: "\u2764\uFE0F", label: "heart" }),
            react_1.default.createElement(Emoji_1.default, { handleClick: reactToMessage, emote: "\uD83D\uDE02", label: "laugh" }),
            react_1.default.createElement(Emoji_1.default, { handleClick: reactToMessage, emote: "\uD83D\uDE2E", label: "surprised" }),
            react_1.default.createElement(Emoji_1.default, { handleClick: reactToMessage, emote: "\uD83D\uDE25", label: "sad" }),
            react_1.default.createElement(Emoji_1.default, { handleClick: reactToMessage, emote: "\uD83D\uDE24", label: "angry" }),
            react_1.default.createElement(Emoji_1.default, { handleClick: reactToMessage, emote: "\uD83D\uDC4D", label: "thumb-up" }),
            react_1.default.createElement(Emoji_1.default, { handleClick: reactToMessage, emote: "\uD83D\uDC4E", label: "thumb-down" }))),
        react_1.default.createElement("button", { title: "React", onClick: toggleEmotesPanelOpen, className: "action-trigger" },
            react_1.default.createElement("i", { className: "far fa-smile" }))));
}
exports.default = connector(ReactionEmotes);
