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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
require("./LoginForm.scss");
var react_router_dom_1 = require("react-router-dom");
var FormInput_1 = __importDefault(require("../../common/FormInput/FormInput"));
var ErrorSuccessInfo_1 = __importDefault(require("../../common/ErrorSuccessInfo/ErrorSuccessInfo"));
var SubmitButton_1 = __importDefault(require("../../common/SubmitButton/SubmitButton"));
var FacebookLogin_1 = __importDefault(require("../FacebookLogin/FacebookLogin"));
var GoogleLogin_1 = __importDefault(require("../GoogleLogin/GoogleLogin"));
// redux
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../redux/actions/userActions");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var mapActionsToProps = { login: userActions_1.login, forgotPassword: userActions_1.forgotPassword };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function LoginForm(_a) {
    var login = _a.login, forgotPassword = _a.forgotPassword, UI = _a.UI;
    var _b = __read(react_1.useState(false), 2), showEmailError = _b[0], setShowEmailError = _b[1];
    var _c = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.errors, formState = _c.formState, getValues = _c.getValues, setError = _c.setError;
    var dirtyFields = formState.dirtyFields;
    var isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) {
        var userData = { email: data.email, password: data.password };
        if (!(Object.keys(errors).length === 0))
            return;
        login(userData);
    };
    var handleForgotPassword = function () {
        var email = getValues("email");
        if (!email)
            setError("email", {
                type: "manual",
                message: "This field is required",
            });
        if (errors.email) {
            setShowEmailError(true);
            return;
        }
        forgotPassword(email);
    };
    return (react_1.default.createElement("form", { className: "form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", { className: "title" }, "Sign in to ChatApp"),
        react_1.default.createElement("div", { className: "social-sign-buttons-container" },
            react_1.default.createElement(FacebookLogin_1.default, null),
            react_1.default.createElement(GoogleLogin_1.default, null)),
        react_1.default.createElement("div", { className: "line-text" }, "OR"),
        react_1.default.createElement("div", { className: "line" }),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.email, showEmailError: showEmailError, name: "email", type: "email", placeholder: "Email", iconClass: "fas fa-envelope", ref: register({
                required: { value: true, message: "This field is required" },
                pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address incorrect",
                },
            }) }),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.password, name: "password", type: "password", placeholder: "Password", iconClass: "fas fa-lock", ref: register({
                required: { value: true, message: "This field is required" },
                minLength: { value: 8, message: "Password too short" },
                pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "Password too weak",
                },
            }) }),
        react_1.default.createElement("span", { className: "is-pulled-left forgot info" },
            react_1.default.createElement("a", { onClick: handleForgotPassword }, "Forgot password?")),
        react_1.default.createElement(SubmitButton_1.default, { hasMarginTop: true, text: "Sign in", disabled: !dirtyFields.email || !dirtyFields.password, loading: UI.loading }),
        react_1.default.createElement("span", { className: "is-pulled-left info" },
            "Don't have an account? ",
            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/register" }, "Sign up")),
        react_1.default.createElement(ErrorSuccessInfo_1.default, { error: UI.error, success: UI.success })));
}
exports.default = connector(LoginForm);
