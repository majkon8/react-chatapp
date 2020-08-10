"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./File.scss");
function File(_a) {
    var name = _a.name, url = _a.url;
    var downloadUrl = window.URL.createObjectURL(new Blob([url]));
    return (react_1.default.createElement("a", { target: "_blank", download: name, href: downloadUrl, className: "file-name", title: "Download file" },
        react_1.default.createElement("i", { className: "far fa-file-alt" }),
        name));
}
exports.default = File;
