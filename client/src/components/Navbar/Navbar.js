"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
require("./Navbar.scss");
var SideNav_1 = __importDefault(require("../SideNav/SideNav"));
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navbar.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "navBar" },
            react_1.default.createElement("a", { href: "/", className: "logo" },
                react_1.default.createElement("span", { className: "logo-chat" }, "CHAT"),
                react_1.default.createElement("span", { className: "has-text-primary" }, "APP")),
            react_1.default.createElement("nav", null,
                react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Features"),
                react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "About us"),
                react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Security"),
                react_1.default.createElement("a", { href: "/", className: "has-text-dark nav-item" }, "Support")),
            react_1.default.createElement("button", { className: "button is-primary is-rounded is-pulled-right login-button" }, "Sign in"),
            react_1.default.createElement(SideNav_1.default, null)));
    };
    return Navbar;
}(react_1.Component));
exports.default = Navbar;
