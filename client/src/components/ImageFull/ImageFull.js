"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ImageFull.scss");
var hooks_1 = require("../../hooks/hooks");
var react_dom_1 = require("react-dom");
function ImageFull(_a) {
    var url = _a.url, closeImage = _a.closeImage;
    var innerRef = hooks_1.useOuterClick(function () { return closeImage(); });
    return react_dom_1.createPortal(react_1.default.createElement("div", { className: "image-full-container" },
        react_1.default.createElement("div", { className: "image-full-close" },
            react_1.default.createElement("i", { className: "fas fa-times" })),
        react_1.default.createElement("img", { ref: innerRef, className: "image-full", src: url })), 
    // @ts-ignore
    document.getElementById("main-container"));
}
exports.default = ImageFull;
