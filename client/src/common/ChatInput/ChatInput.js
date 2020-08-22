"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ChatInput.scss");
var react_debounce_input_1 = require("react-debounce-input");
function ChatInput(_a) {
    var value = _a.value, icon = _a.icon, debounce = _a.debounce, placeholder = _a.placeholder, disabled = _a.disabled, handleChange = _a.handleChange;
    return (react_1.default.createElement("div", { className: "chat-input-container" },
        react_1.default.createElement("div", { className: "control has-icons-left" },
            debounce && (react_1.default.createElement(react_debounce_input_1.DebounceInput, { debounceTimeout: 300, type: "text", className: "chat-input input is-rounded", placeholder: placeholder, onChange: function (e) { return handleChange(e); }, disabled: disabled })),
            !debounce && (react_1.default.createElement("input", { type: "text", className: "chat-input input is-rounded", placeholder: placeholder, onChange: function (e) { return handleChange(e); }, value: value, disabled: disabled })),
            icon && (react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: icon }))))));
}
exports.default = ChatInput;
