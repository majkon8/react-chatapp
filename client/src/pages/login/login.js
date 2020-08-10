"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageTransition = exports.pageVariants = void 0;
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
require("./login.scss");
var LoginForm_1 = __importDefault(require("../../components/LoginForm/LoginForm"));
exports.pageVariants = {
    initial: {
        opacity: 0,
        x: "-100vw",
        scale: 0.8,
    },
    in: {
        opacity: 1,
        x: 0,
        scale: 1,
    },
    out: {
        opacity: 0,
        x: "100vw",
        scale: 1.2,
    },
};
exports.pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
};
function Login() {
    return (react_1.default.createElement(framer_motion_1.motion.div, { initial: "initial", animate: "in", exit: "out", variants: exports.pageVariants, transition: exports.pageTransition, className: "login-page-container", style: { overflowX: "hidden" } },
        react_1.default.createElement(LoginForm_1.default, null)));
}
exports.default = Login;
