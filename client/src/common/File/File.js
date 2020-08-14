"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./File.scss");
var file_saver_1 = require("file-saver");
var react_device_detect_1 = require("react-device-detect");
function File(_a) {
    var name = _a.name, url = _a.url;
    var handleDownload = function () {
        file_saver_1.saveAs(url, name);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_device_detect_1.BrowserView, null,
            react_1.default.createElement("a", { onClick: handleDownload, className: "file-name", title: "Download file" },
                react_1.default.createElement("i", { className: "far fa-file-alt" }),
                name)),
        react_1.default.createElement(react_device_detect_1.MobileView, null,
            react_1.default.createElement("a", { href: url, target: "_blank", className: "file-name", title: "Download file", style: { marginLeft: -5 } },
                react_1.default.createElement("i", { className: "far fa-file-alt" }),
                name))));
}
exports.default = File;
