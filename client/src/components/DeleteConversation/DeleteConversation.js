"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./DeleteConversation.scss");
function DeleteConversation(_a) {
    var conversationId = _a.conversationId, deleteConversation = _a.deleteConversation;
    var handleConversationDelete = function (event) {
        event.stopPropagation();
        var confirmed = confirm("Are you sure you want to delete the conversation? It will be deleted only for you and not for the other user. This process is irreversible.");
        if (confirmed)
            deleteConversation(conversationId);
    };
    return (react_1.default.createElement("div", { onClick: function (e) { return handleConversationDelete(e); }, className: "conversation-delete" },
        react_1.default.createElement("i", { className: "far fa-trash-alt" })));
}
exports.default = DeleteConversation;
