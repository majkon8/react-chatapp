"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Emoji.scss");
var Emoji = function (_a) {
    var label = _a.label, emote = _a.emote, handleClick = _a.handleClick;
    return (react_1.default.createElement("span", { onClick: handleClick ? function () { return handleClick(emote); } : function () { return ""; }, className: "emoji", role: "img", "aria-label": label ? label : "", "aria-hidden": label ? "false" : "true" }, emote));
};
exports.default = Emoji;
