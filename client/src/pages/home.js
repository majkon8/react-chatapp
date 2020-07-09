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
var SideNav_1 = __importDefault(require("../components/SideNav/SideNav"));
// Assets
var homeAnimation_json_1 = __importDefault(require("../assets/homeAnimation.json"));
var about_us_jpg_1 = __importDefault(require("../assets/about_us.jpg"));
var features_jpg_1 = __importDefault(require("../assets/features.jpg"));
var security_jpg_1 = __importDefault(require("../assets/security.jpg"));
var support_jpg_1 = __importDefault(require("../assets/support.jpg"));
var download_jpg_1 = __importDefault(require("../assets/download.jpg"));
// Icons
var GitHub_1 = __importDefault(require("@material-ui/icons/GitHub"));
var Facebook_1 = __importDefault(require("@material-ui/icons/Facebook"));
var Twitter_1 = __importDefault(require("@material-ui/icons/Twitter"));
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
            } }),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("section", { className: "home-section mobile-welcome-message" },
                react_1.default.createElement("div", { className: "section-text" },
                    react_1.default.createElement("div", { className: "section-text-big" }, "Your place for chatting"),
                    react_1.default.createElement("div", { className: "section-text-small" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dictum sapien. Maecenas elementum enim et ullamcorper iaculis. Sed maximus velit et quam ullamcorper, non malesuada purus aliquam."))),
            react_1.default.createElement("section", { id: "about_us", className: "home-section" },
                react_1.default.createElement("div", { className: "section-image" },
                    react_1.default.createElement("img", { src: about_us_jpg_1.default, alt: "about us" })),
                react_1.default.createElement("div", { className: "section-text" },
                    react_1.default.createElement("div", { className: "section-text-big" }, "From passionate team to everyone of you"),
                    react_1.default.createElement("div", { className: "section-text-small" }, "Fusce in dolor ac ex semper rutrum et rutrum nunc. Maecenas ac posuere orci. Cras quis ipsum tortor. Suspendisse potenti. Proin viverra porttitor interdum. Pellentesque in elit dui."))),
            react_1.default.createElement("section", { id: "features", className: "home-section wrap-reverse" },
                react_1.default.createElement("div", { className: "section-text" },
                    react_1.default.createElement("div", { className: "section-text-big" }, "Chat with friend or group of friends"),
                    react_1.default.createElement("div", { className: "section-text-small" }, "Maecenas elementum non orci id sagittis. Ut efficitur lacinia lorem, sed tincidunt elit egestas in. Quisque dapibus tortor mi nec consequat nulla purus in nulla.")),
                react_1.default.createElement("div", { className: "section-image" },
                    react_1.default.createElement("img", { src: features_jpg_1.default, alt: "features" }))),
            react_1.default.createElement("section", { id: "security", className: "home-section" },
                react_1.default.createElement("div", { className: "section-image" },
                    react_1.default.createElement("img", { src: security_jpg_1.default, alt: "security" })),
                react_1.default.createElement("div", { className: "section-text" },
                    react_1.default.createElement("div", { className: "section-text-big" }, "Designed with security in mind"),
                    react_1.default.createElement("div", { className: "section-text-small" }, "In non sapien vitae dui pulvinar accumsan. Nam gravida, elit bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci lorem, laoreet ac sem in."))),
            react_1.default.createElement("section", { id: "support", className: "home-section wrap-reverse" },
                react_1.default.createElement("div", { className: "section-text" },
                    react_1.default.createElement("div", { className: "section-text-big" }, "You can always get help from our team"),
                    react_1.default.createElement("div", { className: "section-text-small" }, "Cras rutrum facilisis posuere. Suspendisse facilisis mollis leo. Phasellus sed fermentum ante, ut fermentum lacus. In non sapien vitae dui pulvinar accumsan.")),
                react_1.default.createElement("div", { className: "section-image" },
                    react_1.default.createElement("img", { src: support_jpg_1.default, alt: "support" }))),
            react_1.default.createElement("section", { id: "download", className: "home-section" },
                react_1.default.createElement("div", { className: "section-image" },
                    react_1.default.createElement("img", { src: download_jpg_1.default, alt: "download" })),
                react_1.default.createElement("div", { className: "section-text" },
                    react_1.default.createElement("div", { className: "section-text-big" }, "Available on every device for every user"),
                    react_1.default.createElement("div", { className: "section-text-small" }, "In non sapien vitae dui pulvinar accumsan. Nam gravida, elit bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci lorem, laoreet ac sem in.")))),
        react_1.default.createElement("footer", { className: "my-footer" },
            react_1.default.createElement("a", { href: "/", className: "logo" },
                react_1.default.createElement("span", { className: "has-text-white" }, "CHAT"),
                react_1.default.createElement("span", { className: "has-text-primary" }, "APP")),
            react_1.default.createElement("span", { className: "socials" },
                react_1.default.createElement("a", { href: "https://www.facebook.com/" },
                    react_1.default.createElement(Facebook_1.default, null)),
                react_1.default.createElement("a", { href: "https://www.github.com/majkon8/chatapp" },
                    react_1.default.createElement(GitHub_1.default, null)),
                react_1.default.createElement("a", { href: "https://www.twitter.com/" },
                    react_1.default.createElement(Twitter_1.default, null))),
            react_1.default.createElement("span", { className: "copyrights" }, "Copyright \u00AE All rights reserved ChatApp"))));
}
exports.default = Home;
