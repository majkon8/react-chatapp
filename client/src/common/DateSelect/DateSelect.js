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
function DateSelect(props, ref) {
    var name = props.name, defaultValue = props.defaultValue, options = props.options, optionsAreMonths = props.optionsAreMonths;
    return (react_1.default.createElement("div", { className: "select" },
        react_1.default.createElement("select", { name: name, ref: ref, defaultValue: defaultValue },
            react_1.default.createElement("option", { value: defaultValue, disabled: true, hidden: true }, defaultValue),
            !optionsAreMonths
                ? options.map(function (option) { return (react_1.default.createElement("option", { value: option, key: option }, option)); })
                : options.map(function (option, index) { return (react_1.default.createElement("option", { value: index, key: index }, option)); }))));
}
exports.default = react_1.forwardRef(DateSelect);
