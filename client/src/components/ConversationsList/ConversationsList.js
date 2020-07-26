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
require("./ConversationsList.scss");
var simplebar_react_1 = __importDefault(require("simplebar-react"));
require("simplebar/dist/simplebar.min.css");
var Conversation_1 = __importDefault(require("../Conversation/Conversation"));
var core_1 = require("@material-ui/core");
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({ UI: state.UI, data: state.data }); };
var connector = react_redux_1.connect(mapStateToProps, {});
function ConversationsList(_a) {
    var UI = _a.UI, data = _a.data;
    var _b = react_1.useState(""), activeId = _b[0], setActiveId = _b[1];
    var handleActive = function (id) { return setActiveId(id); };
    return (react_1.default.createElement("ul", { className: "conversations-list-container " + (UI.isChatOpen && "is-closed") },
        react_1.default.createElement(simplebar_react_1.default, { style: { maxHeight: "calc(100vh - 70px)" } },
            data.searchedUsers.length > 0 && (react_1.default.createElement("p", { className: "conversations-title" }, "Make new conversation with:")),
            UI.loading ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : (data.searchedUsers.map(function (user) { return (react_1.default.createElement(Conversation_1.default, { isActive: activeId === user._id, key: user._id, isNew: true, username: user.username, id: user._id, handleActive: handleActive })); })),
            react_1.default.createElement("p", { className: "conversations-title" }, "Your conversations:"))));
}
exports.default = connector(ConversationsList);
