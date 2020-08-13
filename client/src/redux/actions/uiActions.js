"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setImageUrlToOpen = exports.setIsChatOpen = exports.setColor = exports.setTheme = void 0;
var types_1 = require("../types");
exports.setTheme = function (theme) { return function (dispatch) {
    localStorage.setItem("theme", theme);
    dispatch({ type: types_1.SET_THEME, payload: theme });
}; };
exports.setColor = function (color) { return function (dispatch) {
    localStorage.setItem("color", color);
    dispatch({ type: types_1.SET_COLOR, payload: color });
}; };
exports.setIsChatOpen = function (isOpen) { return function (dispatch) {
    return dispatch({ type: types_1.SET_CHAT_OPEN, payload: isOpen });
}; };
exports.setImageUrlToOpen = function (url) { return function (dispatch) {
    return dispatch({ type: types_1.SET_IMAGE_URL_TO_OPEN, payload: url });
}; };
