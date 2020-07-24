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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Settings.scss");
var ColorPicker_1 = __importDefault(require("../../common/ColorPicker/ColorPicker"));
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapActionsToProps = { setTheme: uiActions_1.setTheme };
var connector = react_redux_1.connect(null, mapActionsToProps);
function Settings(_a) {
    var setTheme = _a.setTheme;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var toggleOpen = function () { return setIsOpen(!isOpen); };
    var setDarkTheme = function () { return setTheme("dark"); };
    var setLightTheme = function () { return setTheme("light"); };
    var logout = function () {
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
    };
    return (react_1.default.createElement("div", { onClick: toggleOpen, className: "settings-container dropdown is-right " + (isOpen && "is-active") },
        react_1.default.createElement("div", { className: "dropdown-trigger" },
            react_1.default.createElement("button", { className: "button is-rounded settings-button", "aria-haspopup": "true", "aria-controls": "dropdown-menu" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement("i", { className: "fa fa-cog", "aria-hidden": "true" })))),
        react_1.default.createElement("div", { className: "dropdown-menu", id: "dropdown-menu", role: "menu" },
            react_1.default.createElement("div", { className: "dropdown-content" },
                react_1.default.createElement("strong", { className: "dropdown-item" }, "Select theme:"),
                react_1.default.createElement("div", { onClick: setDarkTheme, className: "dropdown-item select-theme" }, "Dark theme"),
                react_1.default.createElement("div", { onClick: setLightTheme, className: "dropdown-item select-theme" }, "Light theme"),
                react_1.default.createElement("hr", { className: "break" }),
                react_1.default.createElement("strong", { className: "dropdown-item" }, "Select color:"),
                react_1.default.createElement(ColorPicker_1.default, null),
                react_1.default.createElement("hr", { className: "break" }),
                react_1.default.createElement("strong", { onClick: logout, style: { cursor: "pointer" }, className: "dropdown-item logout" }, "Log out")))));
}
exports.default = connector(Settings);
