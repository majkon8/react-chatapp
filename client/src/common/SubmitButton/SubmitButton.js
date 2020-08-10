"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./SubmitButton.scss");
var core_1 = require("@material-ui/core");
function SubmitButton(_a) {
    var loading = _a.loading, disabled = _a.disabled, hasMarginTop = _a.hasMarginTop, text = _a.text;
    return (react_1.default.createElement("button", { className: "button form-button is-primary is-medium " + (!hasMarginTop && "register-button"), type: "submit", disabled: disabled }, loading ? react_1.default.createElement(core_1.CircularProgress, { color: "inherit" }) : text));
}
exports.default = SubmitButton;
