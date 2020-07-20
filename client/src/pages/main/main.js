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
require("./main.scss");
var framer_motion_1 = require("framer-motion");
var home_1 = require("../home/home");
function Home() {
    var wrapper = react_1.useRef(null);
    return (react_1.default.createElement(framer_motion_1.motion.div, { ref: wrapper, initial: "initial", animate: "in", exit: "out", variants: home_1.pageVariants, transition: home_1.pageTransition, style: {
            backgroundColor: "white",
            position: "absolute",
            width: "100%",
            overflowX: "hidden",
        } }));
}
exports.default = Home;
