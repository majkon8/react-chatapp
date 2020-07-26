"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Chat.scss");
var simplebar_react_1 = __importDefault(require("simplebar-react"));
require("simplebar/dist/simplebar.min.css");
function Chat(_a) {
    var socket = _a.socket;
    socket === null || socket === void 0 ? void 0 : socket.on("receiveMessage", function (message) {
        console.log(message);
    });
    return (react_1.default.createElement("div", { className: "chat-container" },
        react_1.default.createElement(simplebar_react_1.default, { style: { maxHeight: "calc(100vh - 140px)" } })));
}
exports.default = Chat;
