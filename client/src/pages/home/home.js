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
exports.pageTransition = exports.pageVariants = void 0;
var react_1 = __importStar(require("react"));
require("./home.scss");
var framer_motion_1 = require("framer-motion");
var Navbar_1 = __importDefault(require("../../components/Navbar/Navbar"));
var react_lottie_1 = __importDefault(require("react-lottie"));
var SideNav_1 = __importDefault(require("../../components/SideNav/SideNav"));
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var HomeSection_1 = __importDefault(require("../../components/HomeSection/HomeSection"));
var Footer_1 = __importDefault(require("../../components/Footer/Footer"));
// Assets
var homeAnimation_json_1 = __importDefault(require("../../assets/homeAnimation.json"));
var about_us_jpg_1 = __importDefault(require("../../assets/about_us.jpg"));
var features_jpg_1 = __importDefault(require("../../assets/features.jpg"));
var security_jpg_1 = __importDefault(require("../../assets/security.jpg"));
var support_jpg_1 = __importDefault(require("../../assets/support.jpg"));
var download_jpg_1 = __importDefault(require("../../assets/download.jpg"));
exports.pageVariants = {
    initial: {
        opacity: 0,
        x: "-100vw",
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: "100vw",
    },
};
exports.pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
};
function Home() {
    var _a = react_1.useState(false), isSideOpen = _a[0], setIsSideOpen = _a[1];
    var wrapper = react_1.useRef(null);
    var welcomeMessageBig = react_1.useRef(null);
    var welcomeMessageSmall = react_1.useRef(null);
    react_1.useEffect(function () {
        gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
        var elements = wrapper.current.children[3];
        var sectionTextElements = elements.querySelectorAll(".section-text-big, .section-text-small");
        var sectionImageLeftElements = elements.querySelectorAll(".section-image-left");
        var sectionImageRightElements = elements.querySelectorAll(".section-image-right");
        sectionTextElements.forEach(function (element) {
            ScrollTrigger_1.ScrollTrigger.create({
                trigger: element,
                start: "top bottom",
                onEnter: function () {
                    gsap_1.gsap.from(element, 0.5, {
                        autoAlpha: 0,
                        y: 100,
                        ease: "Power3.inOut",
                    });
                },
                onEnterBack: function () {
                    gsap_1.gsap.from(element, 0.5, {
                        autoAlpha: 0,
                        y: -100,
                        ease: "Power3.inOut",
                    });
                },
            });
        });
        sectionImageLeftElements.forEach(function (element) {
            gsap_1.gsap.from(element, 1, {
                scrollTrigger: {
                    trigger: element,
                    toggleActions: "restart none restart none",
                    start: "top bottom",
                },
                autoAlpha: 0,
                x: -100,
                ease: "Power3.inOut",
            });
        });
        sectionImageRightElements.forEach(function (element) {
            gsap_1.gsap.from(element, 1, {
                scrollTrigger: {
                    trigger: element,
                    toggleActions: "restart none restart none",
                    start: "top bottom",
                },
                autoAlpha: 0,
                x: 100,
                ease: "Power3.inOut",
            });
        });
        var timeline = gsap_1.gsap.timeline();
        timeline
            .to(welcomeMessageBig.current, 0.5, { opacity: 0 })
            .to(welcomeMessageBig.current, 0.5, { opacity: 1 })
            .to(welcomeMessageSmall.current, 0.5, { opacity: 1 });
    }, []);
    var toggleOpen = function () { return setIsSideOpen(!isSideOpen); };
    return (react_1.default.createElement(framer_motion_1.motion.div, { ref: wrapper, initial: "initial", animate: "in", exit: "out", variants: exports.pageVariants, transition: exports.pageTransition, style: {
            backgroundColor: "white",
            position: "absolute",
            width: "100%",
            overflowX: "hidden",
            zIndex: 100,
        } },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement(Navbar_1.default, null),
            react_1.default.createElement(SideNav_1.default, { toggleOpen: toggleOpen, isOpen: isSideOpen })),
        react_1.default.createElement("div", { className: "welcome-message" },
            react_1.default.createElement("div", { ref: welcomeMessageBig, className: "big" }, "Your place for chatting"),
            react_1.default.createElement("div", { ref: welcomeMessageSmall, className: "small" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dictum sapien. Maecenas elementum enim et ullamcorper iaculis. Sed maximus velit et quam ullamcorper, non malesuada purus aliquam.")),
        react_1.default.createElement(react_lottie_1.default, { style: { position: "relative", top: 0 }, width: "100%", options: {
                loop: true,
                autoplay: true,
                animationData: homeAnimation_json_1.default,
                rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
            }, isClickToPauseDisabled: true }),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement(HomeSection_1.default, { index: 0, textBig: "Your place for chatting", textSmall: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut\r\n              dictum sapien. Maecenas elementum enim et ullamcorper iaculis. Sed\r\n              maximus velit et quam ullamcorper, non malesuada purus aliquam." }),
            react_1.default.createElement(HomeSection_1.default, { image: about_us_jpg_1.default, index: 1, name: "about_us", textBig: "From passionate team to everyone of you", textSmall: "Fusce in dolor ac ex semper rutrum et rutrum nunc. Maecenas ac\r\n              posuere orci. Cras quis ipsum tortor. Suspendisse potenti. Proin\r\n              viverra porttitor interdum. Pellentesque in elit dui." }),
            react_1.default.createElement(HomeSection_1.default, { image: features_jpg_1.default, index: 2, name: "features", textBig: "Chat with friend or group of friends", textSmall: "Maecenas elementum non orci id sagittis. Ut efficitur lacinia\r\n              lorem, sed tincidunt elit egestas in. Quisque dapibus tortor mi\r\n              nec consequat nulla purus in nulla." }),
            react_1.default.createElement(HomeSection_1.default, { image: security_jpg_1.default, index: 3, name: "security", textBig: "Designed with security in mind", textSmall: "In non sapien vitae dui pulvinar accumsan. Nam gravida, elit\r\n              bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci\r\n              lorem, laoreet ac sem in." }),
            react_1.default.createElement(HomeSection_1.default, { image: support_jpg_1.default, index: 4, name: "support", textBig: "You can always get help from our team", textSmall: "Cras rutrum facilisis posuere. Suspendisse facilisis mollis leo.\r\n              Phasellus sed fermentum ante, ut fermentum lacus. In non sapien\r\n              vitae dui pulvinar accumsan." }),
            react_1.default.createElement(HomeSection_1.default, { image: download_jpg_1.default, index: 5, name: "download", textBig: "Available on every device for every user", textSmall: "In non sapien vitae dui pulvinar accumsan. Nam gravida, elit\r\n              bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci\r\n              lorem, laoreet ac sem in." })),
        react_1.default.createElement(Footer_1.default, null)));
}
exports.default = Home;
