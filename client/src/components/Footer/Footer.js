"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Footer.scss");
// Icons
var GitHub_1 = __importDefault(require("@material-ui/icons/GitHub"));
var Facebook_1 = __importDefault(require("@material-ui/icons/Facebook"));
var Twitter_1 = __importDefault(require("@material-ui/icons/Twitter"));
function Footer() {
    return (react_1.default.createElement("footer", { className: "my-footer" },
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
        react_1.default.createElement("span", { className: "copyrights" }, "Copyright \u00AE All rights reserved ChatApp")));
}
exports.default = Footer;
