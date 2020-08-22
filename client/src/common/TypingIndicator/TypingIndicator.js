"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./TypingIndicator.scss");
function TypingIndicator(_a) {
    var imageUrl = _a.imageUrl, changeBackgroundColor = _a.changeBackgroundColor;
    return (react_1.default.createElement("div", { className: "typing-indicator-container" },
        imageUrl && (react_1.default.createElement("img", { className: "typing-indicator-user-image", src: imageUrl
                ? imageUrl
                : "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user" })),
        react_1.default.createElement("div", { className: "typing-indicator " + (changeBackgroundColor && "typing-indicator-change-background-color") },
            react_1.default.createElement("span", null),
            react_1.default.createElement("span", null),
            react_1.default.createElement("span", null))));
}
exports.default = TypingIndicator;
