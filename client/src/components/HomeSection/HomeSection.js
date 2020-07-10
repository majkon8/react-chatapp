"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./HomeSection.scss");
function HomeSection(_a) {
    var image = _a.image, index = _a.index, name = _a.name, textBig = _a.textBig, textSmall = _a.textSmall;
    return (react_1.default.createElement("section", { id: name, className: "home-section" +
            (index === 0 ? " mobile-welcome-message" : "") +
            (index === 2 || index === 4 ? " wrap-reverse" : "") },
        index !== 0 && index % 2 !== 0 && (react_1.default.createElement("div", { className: "section-image section-image-left" },
            react_1.default.createElement("img", { src: image, alt: name }))),
        react_1.default.createElement("div", { className: "section-text" },
            react_1.default.createElement("div", { className: "section-text-big" }, textBig),
            react_1.default.createElement("div", { className: "section-text-small" }, textSmall)),
        index !== 0 && index % 2 === 0 && (react_1.default.createElement("div", { className: "section-image section-image-right" },
            react_1.default.createElement("img", { src: image, alt: name })))));
}
exports.default = HomeSection;
