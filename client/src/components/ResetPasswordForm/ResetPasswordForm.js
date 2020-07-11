"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
function RegisterForm() {
    var _a, _b;
    var _c = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.errors, formState = _c.formState, getValues = _c.getValues;
    var dirtyFields = formState.dirtyFields, isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) { return console.log(data); };
    return (react_1.default.createElement("form", { className: "form register-form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", { className: "title" }, "Reset password"),
        isSubmitted && errors.password && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left error" }, (_a = errors.password) === null || _a === void 0 ? void 0 : _a.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (isSubmitted && errors.password ? " is-error" : ""), name: "password", type: "password", placeholder: "New password", ref: register({
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 8, message: "Password too short" },
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message: "Password too weak",
                    },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-lock" }))),
        isSubmitted && errors.confirm_password && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left error" }, (_b = errors.confirm_password) === null || _b === void 0 ? void 0 : _b.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (isSubmitted && errors.confirm_password ? " is-error" : ""), name: "confirm_password", type: "password", placeholder: "Confirm new password", ref: register({
                    required: { value: true, message: "This field is required" },
                    validate: function (value) {
                        return value === getValues("password") ? true : "Passwords must match";
                    },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-lock" }))),
        react_1.default.createElement("input", { className: "button is-primary is-medium register-button", type: "submit", value: "Sign in", disabled: !dirtyFields.password || !dirtyFields.confirm_password })));
}
exports.default = RegisterForm;
