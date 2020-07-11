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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Navbar.scss");
var gsap_1 = require("gsap");
var react_router_dom_1 = require("react-router-dom");
function Navbar(_a) {
    var isOpen = _a.isOpen, toggleOpen = _a.toggleOpen;
    var nav = react_1.useRef(null);
    var loginButton = react_1.useRef(null);
    react_1.useEffect(function () {
        var navElements = nav.current.children;
        var timeline = gsap_1.gsap.timeline({
            defaults: { ease: "Power3.inOut" },
            delay: 0.5,
        });
        var from = { y: -100 };
        var to = { opacity: 1, y: 0, duration: 0.1 };
        timeline
            .fromTo(loginButton.current, from, to)
            .fromTo(navElements[4], from, to)
            .fromTo(navElements[3], from, to)
            .fromTo(navElements[2], from, to)
            .fromTo(navElements[1], from, to)
            .fromTo(navElements[0], from, to);
    }, []);
    return (react_1.default.createElement("div", { className: "navBar" },
        react_1.default.createElement("nav", { ref: nav, className: "main-nav" },
            react_1.default.createElement("a", { href: "#about_us", className: "has-text-dark nav-item" }, "About us"),
            react_1.default.createElement("a", { href: "#features", className: "has-text-dark nav-item" }, "Features"),
            react_1.default.createElement("a", { href: "#security", className: "has-text-dark nav-item" }, "Security"),
            react_1.default.createElement("a", { href: "#support", className: "has-text-dark nav-item" }, "Support"),
            react_1.default.createElement("a", { href: "#download", className: "has-text-dark nav-item" }, "Download")),
        react_1.default.createElement(react_router_dom_1.NavLink, { to: "/login", className: "login" },
            react_1.default.createElement("button", { ref: loginButton, className: "button is-primary is-rounded is-pulled-right navbar-login-button" }, "Sign in")),
        react_1.default.createElement("button", { onClick: toggleOpen, className: "hamburger hamburger--squeeze" + (isOpen && " is-active"), type: "button" },
            react_1.default.createElement("span", { className: "hamburger-box" },
                react_1.default.createElement("span", { className: "hamburger-inner" })))));
}
exports.default = Navbar;
