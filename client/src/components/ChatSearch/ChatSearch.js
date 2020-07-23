"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ChatSearch.scss");
var ChatInput_1 = __importDefault(require("../../common/ChatInput/ChatInput"));
function ChatSearch(_a) {
    var isChatOpen = _a.isChatOpen;
    return (react_1.default.createElement("div", { className: "chat-search-container " + (isChatOpen && "is-closed") },
        react_1.default.createElement(ChatInput_1.default, { hasIcon: true })));
}
exports.default = ChatSearch;
