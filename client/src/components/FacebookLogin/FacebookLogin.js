"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./FacebookLogin.scss");
var react_facebook_login_1 = __importDefault(require("react-facebook-login"));
// redux
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../redux/actions/userActions");
var mapActionsToProps = { externalLogin: userActions_1.externalLogin };
var connector = react_redux_1.connect(null, mapActionsToProps);
function FacebookLogin(_a) {
    var externalLogin = _a.externalLogin;
    var responseFacebook = function (response) {
        var userData = { email: response.email, username: response.name };
        externalLogin(userData);
    };
    return (react_1.default.createElement(react_facebook_login_1.default, { appId: "563972124299753", autoLoad: false, fields: "name,email,picture", callback: responseFacebook, cssClass: "button form-button facebook-button", icon: "fab fa-facebook-f", textButton: "" }));
}
exports.default = connector(FacebookLogin);
