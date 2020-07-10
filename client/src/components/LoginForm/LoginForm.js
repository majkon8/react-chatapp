"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
require("./LoginForm.scss");
function LoginForm() {
    var _a, _b;
    var _c = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.errors, formState = _c.formState;
    var dirtyFields = formState.dirtyFields, isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) { return console.log(); };
    return (react_1.default.createElement("form", { className: "form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", { className: "title" }, "Sign in to ChatApp"),
        isSubmitted && errors.email && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left" }, (_a = errors.email) === null || _a === void 0 ? void 0 : _a.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (errors.email ? " is-error" : ""), name: "email", type: "email", placeholder: "Email", ref: register({
                    required: { value: true, message: "This field is required" },
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Email address incorrect",
                    },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-envelope" }))),
        isSubmitted && errors.password && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left error" }, (_b = errors.password) === null || _b === void 0 ? void 0 : _b.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (errors.password ? " is-error" : ""), name: "password", type: "password", placeholder: "Password", ref: register({
                    required: true,
                    minLength: { value: 8, message: "Password too short" },
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message: "Password too weak",
                    },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-lock" }))),
        react_1.default.createElement("span", { className: "is-pulled-left forgot info" },
            react_1.default.createElement("a", null, "Forgot password?")),
        react_1.default.createElement("input", { className: "button is-primary is-large", type: "submit", value: "Sign in", disabled: !dirtyFields.email || !dirtyFields.password }),
        react_1.default.createElement("span", { className: "is-pulled-left info" },
            "Don't have an account? ",
            react_1.default.createElement("a", { href: "/register" }, "Sign up"))));
}
exports.default = LoginForm;
