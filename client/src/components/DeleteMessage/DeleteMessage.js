"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./DeleteMessage.scss");
function DeleteMessage(_a) {
    var socket = _a.socket, messageId = _a.messageId, otherUserId = _a.otherUserId;
    var handleMessageDelete = function () { return socket === null || socket === void 0 ? void 0 : socket.emit("deleteMessage", {
        messageId: messageId,
        otherUserId: otherUserId,
    }); };
    return (react_1.default.createElement("div", { title: "Delete", onClick: handleMessageDelete, className: "chat-message-delete" },
        react_1.default.createElement("i", { className: "far fa-trash-alt" })));
}
exports.default = DeleteMessage;
