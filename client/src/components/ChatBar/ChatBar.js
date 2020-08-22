"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ChatBar.scss");
var GeneralSettings_1 = __importDefault(require("../GeneralSettings/GeneralSettings"));
var UserSettings_1 = __importDefault(require("../UserSettings/UserSettings"));
var moment_1 = __importDefault(require("moment"));
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapStateToProps = function (state) { return ({
    data: state.data,
}); };
var mapActionsToProps = { setIsChatOpen: uiActions_1.setIsChatOpen };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function ChatBar(_a) {
    var data = _a.data, setIsChatOpen = _a.setIsChatOpen;
    var handleChatClose = function () { return setIsChatOpen(false); };
    return (react_1.default.createElement("div", { className: "chat-bar-container" },
        react_1.default.createElement("div", { onClick: handleChatClose, className: "return-icon" },
            react_1.default.createElement("i", { className: "fa fa-angle-left" })),
        data.selectedConversation && (react_1.default.createElement("div", { className: "user-info" },
            react_1.default.createElement("img", { src: data.selectedConversation.userImageUrl
                    ? data.selectedConversation.userImageUrl
                    : "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user", className: "chat-bar-user-image" }),
            react_1.default.createElement("div", { className: "title-active-container" },
                react_1.default.createElement("span", { className: "chat-bar-conversation-title" }, data.selectedConversation.username),
                react_1.default.createElement("span", { className: "chat-bar-last-active" },
                    data.selectedConversation.lastActive === "now" && (react_1.default.createElement("div", { className: "chat-bar-active-indicator has-background-success" })),
                    react_1.default.createElement("span", { style: { opacity: 0.5 } },
                        "Active",
                        " ",
                        data.selectedConversation.lastActive === "now"
                            ? data.selectedConversation.lastActive
                            : moment_1.default(data.selectedConversation.lastActive).fromNow()))))),
        react_1.default.createElement("div", { className: "chat-bar-settings-container" },
            react_1.default.createElement(UserSettings_1.default, null),
            react_1.default.createElement(GeneralSettings_1.default, null))));
}
exports.default = connector(ChatBar);
