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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Logo.scss");
var react_router_dom_1 = require("react-router-dom");
function Logo(_a) {
    var location = _a.location;
    var _b = __read(react_1.useState(false), 2), displayLogo = _b[0], setDisplayLogo = _b[1];
    react_1.useEffect(function () {
        if (location.pathname === "/main")
            setDisplayLogo(false);
        else
            setDisplayLogo(true);
    }, [location]);
    return (react_1.default.createElement(react_1.default.Fragment, null, displayLogo && (react_1.default.createElement("div", { className: "logo-container" },
        react_1.default.createElement(react_router_dom_1.NavLink, { to: "/", className: "main-logo" },
            react_1.default.createElement("span", { className: "logo-chat" }, "CHAT"),
            react_1.default.createElement("span", { className: "has-text-primary" }, "APP"))))));
}
exports.default = Logo;
