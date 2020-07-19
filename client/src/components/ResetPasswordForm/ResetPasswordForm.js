"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var FormInput_1 = __importDefault(require("../../common/FormInput/FormInput"));
var SubmitButton_1 = __importDefault(require("../../common/SubmitButton/SubmitButton"));
var react_router_dom_1 = require("react-router-dom");
var ErrorSuccessInfo_1 = __importDefault(require("../../common/ErrorSuccessInfo/ErrorSuccessInfo"));
// redux
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../redux/actions/userActions");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var mapActionsToProps = { resetPassword: userActions_1.resetPassword };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function ResetPasswordForm(_a) {
    var token = _a.token, resetPassword = _a.resetPassword, UI = _a.UI;
    var _b = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.errors, formState = _b.formState, getValues = _b.getValues;
    var dirtyFields = formState.dirtyFields, isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) {
        var requestData = { newPassword: data.password, token: token };
        if (!(Object.keys(errors).length === 0))
            return;
        resetPassword(requestData);
    };
    return (react_1.default.createElement("form", { className: "form register-form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", { className: "title" }, "Reset password"),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.password, name: "password", type: "password", placeholder: "Password", ref: register({
                required: { value: true, message: "This field is required" },
                minLength: { value: 8, message: "Password too short" },
                pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "Password too weak",
                },
            }) }),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.confirm_password, name: "confirm_password", type: "password", placeholder: "Confirm password", ref: register({
                required: { value: true, message: "This field is required" },
                validate: function (value) {
                    return value === getValues("password") ? true : "Passwords must match";
                },
            }) }),
        react_1.default.createElement(SubmitButton_1.default, { hasMarginTop: false, text: "Reset password", disabled: !dirtyFields.password || !dirtyFields.confirm_password, loading: UI.loading }),
        react_1.default.createElement("span", { className: "is-pulled-left info" },
            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/login" }, "Sign in")),
        react_1.default.createElement(ErrorSuccessInfo_1.default, { error: UI.error, success: UI.success })));
}
exports.default = connector(ResetPasswordForm);
