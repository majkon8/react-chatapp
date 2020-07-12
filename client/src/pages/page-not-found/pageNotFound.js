"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./pageNotFound.scss");
var react_lottie_1 = __importDefault(require("react-lottie"));
var framer_motion_1 = require("framer-motion");
// Assets
var pageNotFoundAnimation_json_1 = __importDefault(require("../../assets/pageNotFoundAnimation.json"));
function notFound() {
    var pageVariants = {
        initial: {
            opacity: 0,
            x: "-100vw",
            y: "100vh",
        },
        in: {
            opacity: 1,
            x: 0,
            y: 0,
        },
        out: {
            opacity: 0,
            x: "100vw",
            y: "-100vh",
        },
    };
    var pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.8,
    };
    return (react_1.default.createElement(framer_motion_1.motion.div, { initial: "initial", animate: "in", exit: "out", variants: pageVariants, transition: pageTransition, className: "page-not-found-container" },
        react_1.default.createElement(react_lottie_1.default, { style: { position: "relative" }, width: "100%", options: {
                loop: false,
                autoplay: true,
                animationData: pageNotFoundAnimation_json_1.default,
                rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
            }, isClickToPauseDisabled: true })));
}
exports.default = notFound;
