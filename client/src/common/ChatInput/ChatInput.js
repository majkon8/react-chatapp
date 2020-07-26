"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ChatInput.scss");
function ChatInput(_a) {
    var hasIcon = _a.hasIcon, value = _a.value, handleChange = _a.handleChange;
    var inputMarkup = hasIcon ? (react_1.default.createElement("div", { className: "control has-icons-left" },
        react_1.default.createElement("input", { type: "text", className: "chat-input input is-rounded", placeholder: "Search for users...", onChange: function (e) { return handleChange(e); }, value: value }),
        react_1.default.createElement("span", { className: "icon is-small is-left" },
            react_1.default.createElement("i", { className: "fa fa-search" })))) : (react_1.default.createElement("input", { type: "text", className: "chat-input input is-rounded", placeholder: "New message...", onChange: function (e) { return handleChange(e); }, value: value }));
    return react_1.default.createElement("div", { className: "chat-input-container" }, inputMarkup);
}
exports.default = ChatInput;
