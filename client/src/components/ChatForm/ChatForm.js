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
require("./ChatForm.scss");
var ChatInput_1 = __importDefault(require("../../common/ChatInput/ChatInput"));
function ChatForm(_a) {
    var socket = _a.socket;
    var _b = react_1.useState(""), messageBody = _b[0], setMessageBody = _b[1];
    var handleChange = function (event) {
        return setMessageBody(event.target.value);
    };
    var submitChatMessage = function (event) {
        event.preventDefault();
        socket === null || socket === void 0 ? void 0 : socket.emit("sendMessage", messageBody);
        setMessageBody("");
    };
    return (react_1.default.createElement("form", { className: "chat-form-container", onSubmit: submitChatMessage },
        react_1.default.createElement(ChatInput_1.default, { handleChange: handleChange, hasIcon: false, value: messageBody }),
        react_1.default.createElement("button", { className: "button is-rounded submit-button", type: "submit", disabled: messageBody.length === 0 }, "Send")));
}
exports.default = ChatForm;
