"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var FormInput_1 = __importDefault(require("../../common/FormInput/FormInput"));
function RegisterForm() {
    var _a = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.errors, formState = _a.formState, getValues = _a.getValues;
    var dirtyFields = formState.dirtyFields, isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) { return console.log(data); };
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
        react_1.default.createElement("input", { className: "button form-button is-primary is-medium register-button", type: "submit", value: "Sign in", disabled: !dirtyFields.password || !dirtyFields.confirm_password })));
}
exports.default = RegisterForm;
