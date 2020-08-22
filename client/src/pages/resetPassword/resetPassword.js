"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var ResetPasswordForm_1 = __importDefault(require("../../components/ResetPasswordForm/ResetPasswordForm"));
var login_1 = require("../login/login");
function Login(_a) {
    var match = _a.match;
    return (react_1.default.createElement(framer_motion_1.motion.div, { initial: "initial", animate: "in", exit: "out", variants: login_1.pageVariants, transition: login_1.pageTransition, className: "login-page-container", style: { overflowX: "hidden" } },
        react_1.default.createElement(ResetPasswordForm_1.default, { token: match.params.token })));
}
exports.default = Login;
