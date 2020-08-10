"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ErrorSuccessInfo.scss");
function ErrorSuccessInfo(_a) {
    var error = _a.error, success = _a.success;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        error && (react_1.default.createElement("p", { className: "message error-message has-background-danger" }, error)),
        success && (react_1.default.createElement("p", { className: "message error-message has-background-success" }, success))));
}
exports.default = ErrorSuccessInfo;
