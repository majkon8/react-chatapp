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
require("./FormInput.scss");
function FormInput(props, ref) {
    var _a = props.showEmailError, showEmailError = _a === void 0 ? false : _a, isSubmitted = props.isSubmitted, error = props.error, name = props.name, type = props.type, placeholder = props.placeholder, iconClass = props.iconClass;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        ((isSubmitted && error) || (error && showEmailError)) && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left" }, error.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white\n            " + (((isSubmitted && error) || (error && showEmailError)) &&
                    "is-error"), name: name, type: type, placeholder: placeholder, ref: ref }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: iconClass })))));
}
exports.default = react_1.forwardRef(FormInput);
