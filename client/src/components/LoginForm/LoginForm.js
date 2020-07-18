"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
require("./LoginForm.scss");
var react_router_dom_1 = require("react-router-dom");
var FormInput_1 = __importDefault(require("../../common/FormInput/FormInput"));
var ErrorSuccessInfo_1 = __importDefault(require("../../common/ErrorSuccessInfo/ErrorSuccessInfo"));
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var mapActionsToProps = {};
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function LoginForm(_a) {
    var UI = _a.UI;
    var _b = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.errors, formState = _b.formState;
    var dirtyFields = formState.dirtyFields, isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) { return console.log(data); };
    return (react_1.default.createElement("form", { className: "form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", { className: "title" }, "Sign in to ChatApp"),
        react_1.default.createElement("div", { className: "social-sign-buttons-container" },
            react_1.default.createElement("button", { className: "button form-button facebook-button" },
                react_1.default.createElement("i", { className: "fab fa-facebook-f", "aria-hidden": "true" })),
            react_1.default.createElement("button", { className: "button form-button google-button" },
                react_1.default.createElement("i", { className: "fab fa-google", "aria-hidden": "true" }))),
        react_1.default.createElement("div", { className: "line-text" }, "OR"),
        react_1.default.createElement("div", { className: "line" }),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.email, name: "email", type: "email", placeholder: "Email", ref: register({
                required: { value: true, message: "This field is required" },
                pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address incorrect",
                },
            }) }),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.password, name: "password", type: "password", placeholder: "Password", ref: register({
                required: { value: true, message: "This field is required" },
                minLength: { value: 8, message: "Password too short" },
                pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "Password too weak",
                },
            }) }),
        react_1.default.createElement("span", { className: "is-pulled-left forgot info" },
            react_1.default.createElement("a", null, "Forgot password?")),
        react_1.default.createElement("input", { className: "button form-button is-primary is-medium", type: "submit", value: "Sign in", disabled: !dirtyFields.email || !dirtyFields.password }),
        react_1.default.createElement("span", { className: "is-pulled-left info" },
            "Don't have an account? ",
            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/register" }, "Sign up")),
        react_1.default.createElement(ErrorSuccessInfo_1.default, { error: UI.error, success: UI.success })));
}
exports.default = connector(LoginForm);
