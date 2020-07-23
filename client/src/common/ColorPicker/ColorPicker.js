"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./ColorPicker.scss");
// redux
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../../redux/actions/uiActions");
var mapActionsToProps = { setColor: uiActions_1.setColor };
var connector = react_redux_1.connect(null, mapActionsToProps);
function ColorPicker(_a) {
    var setColor = _a.setColor;
    var handleColorChange = function (color) { return setColor(color); };
    var colors = [
        "rgb(84, 89, 230)",
        "rgb(0, 31, 63)",
        "rgb(127, 219, 255)",
        "rgb(57, 204, 204)",
        "rgb(61, 153, 112)",
        "rgb(46, 204, 64)",
        "rgb(1, 255, 112)",
        "rgb(255, 220, 0)",
        "rgb(255, 133, 27)",
        "rgb(255, 65, 54)",
        "rgb(133, 20, 75)",
        "rgb(240, 18, 190)",
        "rgb(177, 13, 201)",
        "rgb(17, 17, 17)",
        "rgb(170, 170, 170)",
        "rgb(221, 221, 221)",
    ];
    return (react_1.default.createElement("div", { className: "color-picker-container" }, colors.map(function (color) { return (react_1.default.createElement("div", { key: color, style: { backgroundColor: color }, className: "color", onClick: function () { return handleColorChange(color); } })); })));
}
exports.default = connector(ColorPicker);
