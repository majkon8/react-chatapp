"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ImageFull.scss");
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapActionsToProps = { setImageUrlToOpen: uiActions_1.setImageUrlToOpen };
var connector = react_redux_1.connect(null, mapActionsToProps);
function ImageFull(_a) {
    var url = _a.url, setImageUrlToOpen = _a.setImageUrlToOpen;
    var closeImage = function () { return setImageUrlToOpen(null); };
    return (react_1.default.createElement("div", { onClick: closeImage, className: "image-full-container" },
        react_1.default.createElement("div", { className: "image-full-close" },
            react_1.default.createElement("i", { className: "fas fa-times" })),
        react_1.default.createElement("img", { className: "image-full", src: url })));
}
exports.default = connector(ImageFull);
