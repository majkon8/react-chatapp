"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./GoogleLogin.scss");
var react_google_login_1 = __importDefault(require("react-google-login"));
// redux
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../redux/actions/userActions");
var mapActionsToProps = { externalLogin: userActions_1.externalLogin };
var connector = react_redux_1.connect(null, mapActionsToProps);
function GoogleLogin(_a) {
    var externalLogin = _a.externalLogin;
    var responseGoogle = function (response) {
        var userData = {
            email: response.profileObj.email,
            username: response.profileObj.name,
        };
        externalLogin(userData);
    };
    return (react_1.default.createElement(react_google_login_1.default, { clientId: "394253008834-vbi64sr39onfv5gnolcpjibg5mv4h3gd.apps.googleusercontent.com", onSuccess: responseGoogle, className: "button form-button google-button", buttonText: "", icon: false, cookiePolicy: "single_host_origin", render: function (renderProps) { return (react_1.default.createElement("button", { className: "button form-button google-button", onClick: renderProps.onClick, disabled: renderProps.disabled, type: "button" },
            react_1.default.createElement("i", { className: "fab fa-google", "aria-hidden": "true" }))); } }));
}
exports.default = connector(GoogleLogin);
