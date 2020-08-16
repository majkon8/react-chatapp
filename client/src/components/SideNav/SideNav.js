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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./SideNav.scss");
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("../../hooks/hooks");
function SideNav(_a) {
    var isOpen = _a.isOpen, toggleOpen = _a.toggleOpen;
    var _b = __read(react_1.useState(false), 2), canOpen = _b[0], setCanOpen = _b[1];
    var innerRef = hooks_1.useOuterClick(function () {
        if (!isOpen)
            return;
        toggleOpen();
    });
    react_1.useEffect(function () {
        setTimeout(function () {
            setCanOpen(true);
        }, 800);
    }, []);
    return (react_1.default.createElement("div", { ref: innerRef, className: "side-container" +
            (isOpen ? " side-open" : " side-close") +
            (canOpen ? " is-visible" : "") },
        react_1.default.createElement("button", { onClick: toggleOpen, className: "hamburger hamburger--squeeze" + (isOpen && " is-active"), type: "button" },
            react_1.default.createElement("span", { className: "hamburger-box" },
                react_1.default.createElement("span", { className: "hamburger-inner" }))),
        react_1.default.createElement("nav", { className: "side-nav" },
            react_1.default.createElement("a", { href: "#about_us", className: "has-text-dark nav-item" }, "About us"),
            react_1.default.createElement("a", { href: "#features", className: "has-text-dark nav-item" }, "Features"),
            react_1.default.createElement("a", { href: "#security", className: "has-text-dark nav-item" }, "Security"),
            react_1.default.createElement("a", { href: "#support", className: "has-text-dark nav-item" }, "Support"),
            react_1.default.createElement("a", { href: "#download", className: "has-text-dark nav-item" }, "Download")),
        react_1.default.createElement(react_router_dom_1.NavLink, { to: "/login" },
            react_1.default.createElement("button", { className: "button is-medium is-primary is-rounded side-nav-login-button" }, "Sign in"))));
}
exports.default = SideNav;
