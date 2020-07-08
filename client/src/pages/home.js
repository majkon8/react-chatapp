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
require("./home.scss");
var Navbar_1 = __importDefault(require("../components/Navbar/Navbar"));
var react_lottie_1 = __importDefault(require("react-lottie"));
var homeAnimation_json_1 = __importDefault(require("../assets/homeAnimation.json"));
var SideNav_1 = __importDefault(require("../components/SideNav/SideNav"));
function getWindowWidth() {
    var width = window.innerWidth;
    return width;
}
function useWindowWidth() {
    var _a = react_1.useState(getWindowWidth()), windowWidth = _a[0], setWindowWidth = _a[1];
    react_1.useEffect(function () {
        function handleResize() {
            setWindowWidth(getWindowWidth());
        }
        window.addEventListener("resize", handleResize);
        return function () {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return windowWidth;
}
function Home() {
    var _a = react_1.useState(false), isSideOpen = _a[0], setIsSideOpen = _a[1];
    var width = useWindowWidth();
    var toggleOpen = function () { return setIsSideOpen(!isSideOpen); };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement(Navbar_1.default, { toggleOpen: toggleOpen, isOpen: isSideOpen })),
        react_1.default.createElement(SideNav_1.default, { toggleOpen: toggleOpen, isOpen: isSideOpen }),
        react_1.default.createElement("div", { className: "welcome-message" },
            react_1.default.createElement("div", { className: "big" }, "Your place for chatting"),
            react_1.default.createElement("div", { className: "small" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dictum sapien. Maecenas elementum enim et ullamcorper iaculis. Sed maximus velit et quam ullamcorper, non malesuada purus aliquam.")),
        react_1.default.createElement(react_lottie_1.default, { style: { position: "relative", top: width > 1024 ? -80 : 0 }, width: "100%", options: {
                loop: true,
                autoplay: true,
                animationData: homeAnimation_json_1.default,
                rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
            } })));
}
exports.default = Home;
