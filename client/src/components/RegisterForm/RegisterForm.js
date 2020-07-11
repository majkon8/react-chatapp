"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
require("./RegisterForm.scss");
var moment_1 = __importDefault(require("moment"));
var react_router_dom_1 = require("react-router-dom");
function RegisterForm() {
    var _a, _b, _c, _d, _e;
    var _f = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _f.register, handleSubmit = _f.handleSubmit, errors = _f.errors, formState = _f.formState, getValues = _f.getValues, setError = _f.setError, clearErrors = _f.clearErrors;
    var dirtyFields = formState.dirtyFields, isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) { return console.log(data); };
    var days = [];
    for (var i = 1; i <= 31; i++) {
        days.push(i);
    }
    var years = [];
    for (var i = new Date().getFullYear(); i >= 1900; i--) {
        years.push(i);
    }
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var validateDate = function (date) {
        var day = date.day, month = date.month, year = date.year;
        +month < 9 ? (month = "0" + (+month + 1)) : (month = "" + (+month + 1));
        return moment_1.default(day + "-" + month + "-" + year, "DD-MM-YYY", true).isValid();
    };
    var validateBirthDateInput = function () {
        if (!dirtyFields.day || !dirtyFields.month || !dirtyFields.year)
            return true;
        if (validateDate(getValues(["day", "month", "year"]))) {
            clearErrors("date");
            return true;
        }
        setError("date", { type: "manual", message: "Privided date is incorrect" });
        return false;
    };
    return (react_1.default.createElement("form", { className: "form register-form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", { className: "title" }, "Sign up to ChatApp"),
        isSubmitted && errors.email && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left" }, (_a = errors.email) === null || _a === void 0 ? void 0 : _a.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (isSubmitted && errors.email ? " is-error" : ""), name: "email", type: "email", placeholder: "Email", ref: register({
                    required: { value: true, message: "This field is required" },
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Email address incorrect",
                    },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-envelope" }))),
        isSubmitted && errors.username && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left" }, (_b = errors.username) === null || _b === void 0 ? void 0 : _b.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (isSubmitted && errors.username ? " is-error" : ""), name: "username", type: "text", placeholder: "Username", ref: register({
                    required: { value: true, message: "This field is required" },
                    maxLength: { value: 30, message: "Maximum 30 characters" },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-user" }))),
        isSubmitted && errors.password && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left error" }, (_c = errors.password) === null || _c === void 0 ? void 0 : _c.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (isSubmitted && errors.password ? " is-error" : ""), name: "password", type: "password", placeholder: "Password", ref: register({
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 8, message: "Password too short" },
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message: "Password too weak",
                    },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-lock" }))),
        isSubmitted && errors.confirm_password && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left error" }, (_d = errors.confirm_password) === null || _d === void 0 ? void 0 : _d.message)),
        react_1.default.createElement("div", { className: "control has-icons-left" },
            react_1.default.createElement("input", { className: "input is-large is-black has-text-white" +
                    (isSubmitted && errors.confirm_password ? " is-error" : ""), name: "confirm_password", type: "password", placeholder: "Confirm password", ref: register({
                    required: { value: true, message: "This field is required" },
                    validate: function (value) {
                        return value === getValues("password") ? true : "Passwords must match";
                    },
                }) }),
            react_1.default.createElement("span", { className: "icon is-small is-left" },
                react_1.default.createElement("i", { className: "fas fa-lock" }))),
        react_1.default.createElement("span", { className: "birth-date-label" }, "Date of birth"),
        react_1.default.createElement("div", { className: "date-selects" },
            react_1.default.createElement("div", { className: "select" },
                react_1.default.createElement("select", { name: "day", ref: register({
                        validate: validateBirthDateInput,
                    }), defaultValue: "Day" },
                    react_1.default.createElement("option", { value: "Day", disabled: true, hidden: true }, "Day"),
                    days.map(function (day) { return (react_1.default.createElement("option", { value: day, key: day }, day)); }))),
            react_1.default.createElement("div", { className: "select" },
                react_1.default.createElement("select", { name: "month", ref: register({
                        validate: validateBirthDateInput,
                    }), defaultValue: "Month" },
                    react_1.default.createElement("option", { value: "Month", disabled: true, hidden: true }, "Month"),
                    months.map(function (month, index) { return (react_1.default.createElement("option", { value: index, key: index }, month)); }))),
            react_1.default.createElement("div", { className: "select" },
                react_1.default.createElement("select", { name: "year", ref: register({
                        validate: validateBirthDateInput,
                    }), defaultValue: "Year" },
                    react_1.default.createElement("option", { value: "Year", disabled: true, hidden: true }, "Year"),
                    years.map(function (year) { return (react_1.default.createElement("option", { value: year, key: year }, year)); })))),
        isSubmitted && errors.date && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left error date-error" }, (_e = errors.date) === null || _e === void 0 ? void 0 : _e.message)),
        react_1.default.createElement("label", { className: "is-pulled-left checkbox-label info" },
            react_1.default.createElement("input", { ref: register({
                    required: true,
                }), className: "checkbox", type: "checkbox", name: "terms" }),
            " ",
            "I agree to the ",
            react_1.default.createElement("a", { href: "/terms" }, "terms and conditions")),
        react_1.default.createElement("input", { className: "button is-primary is-medium register-button", type: "submit", value: "Sign in", disabled: Object.keys(dirtyFields).length === 0 ||
                Object.keys(dirtyFields).length !== Object.keys(getValues()).length }),
        react_1.default.createElement("span", { className: "is-pulled-left info" },
            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/login" }, "Already signed up?"))));
}
exports.default = RegisterForm;
