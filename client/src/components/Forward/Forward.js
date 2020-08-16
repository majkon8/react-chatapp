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
require("./Forward.scss");
var ForwardModal_1 = __importDefault(require("../ForwardModal/ForwardModal"));
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({ data: state.data }); };
var connector = react_redux_1.connect(mapStateToProps, {});
function Forward(_a) {
    var isOwnMessage = _a.isOwnMessage, message = _a.message, data = _a.data, socket = _a.socket;
    var _b = __read(react_1.useState(false), 2), isOpen = _b[0], setIsOpen = _b[1];
    var toggleOpen = function () { return setIsOpen(!isOpen); };
    return (react_1.default.createElement("div", { title: "Forward", className: "forward-container " + (isOwnMessage ? "own-message-forward" : "other-message-forward") },
        react_1.default.createElement("button", { onClick: toggleOpen, className: "action-trigger" },
            react_1.default.createElement("i", { className: "fas fa-external-link-alt" })),
        isOpen && (react_1.default.createElement(ForwardModal_1.default, { socket: socket, message: message, handleClose: toggleOpen, conversations: data.conversations || [] }))));
}
exports.default = connector(Forward);
