"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
require("./RegisterForm.scss");
var moment_1 = __importDefault(require("moment"));
var react_router_dom_1 = require("react-router-dom");
var FormInput_1 = __importDefault(require("../../common/FormInput/FormInput"));
var DateSelect_1 = __importDefault(require("../../common/DateSelect/DateSelect"));
var ErrorSuccessInfo_1 = __importDefault(require("../../common/ErrorSuccessInfo/ErrorSuccessInfo"));
// redux
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../redux/actions/userActions");
var mapStateToProps = function (state) { return ({ UI: state.UI }); };
var mapActionsToProps = { signup: userActions_1.signup };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function RegisterForm(_a) {
    var _b;
    var signup = _a.signup, UI = _a.UI;
    var _c = react_hook_form_1.useForm({
        mode: "onChange",
    }), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.errors, formState = _c.formState, getValues = _c.getValues, setError = _c.setError, clearErrors = _c.clearErrors;
    var dirtyFields = formState.dirtyFields, isSubmitted = formState.isSubmitted;
    var onSubmit = function (data) {
        var _a = __assign({}, data), email = _a.email, username = _a.username, password = _a.password;
        if (!(Object.keys(errors).length === 0))
            return;
        var birthDate = new Date(+data.year, +data.month, 1 + +data.day);
        var userData = { email: email, username: username, password: password, birthDate: birthDate };
        signup(userData);
    };
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
    var formatDate = function (date) {
        var day = date.day, month = date.month, year = date.year;
        +day < 9 ? (day = "0" + (+day + 1)) : (day = "" + (+day + 1));
        +month < 9 ? (month = "0" + (+month + 1)) : (month = "" + (+month + 1));
        var formattedDate = day + "-" + month + "-" + year;
        return formattedDate;
    };
    var validDate = function (date) {
        return moment_1.default(date, "DD-MM-YYYY", true).isValid();
    };
    var validAge = function (date) {
        var today = moment_1.default();
        var birthDay = moment_1.default(date, "DD-MM-YYYY");
        var difference = today.diff(birthDay, "years", true);
        if (difference <= 13)
            return false;
        return true;
    };
    var validateBirthDateInput = function () {
        if (!dirtyFields.day || !dirtyFields.month || !dirtyFields.year)
            return true;
        var formattedDate = formatDate(getValues(["day", "month", "year"]));
        if (!validDate(formattedDate)) {
            setError("date", {
                type: "manual",
                message: "Privided date is incorrect",
            });
            return false;
        }
        if (!validAge(formattedDate)) {
            setError("date", {
                type: "manual",
                message: "You have to be at least 13 years old",
            });
            return false;
        }
        clearErrors("date");
        return true;
    };
    return (react_1.default.createElement("form", { className: "form register-form", onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", { className: "title" }, "Sign up to ChatApp"),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.email, name: "email", type: "email", placeholder: "Email", ref: register({
                required: { value: true, message: "This field is required" },
                pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address incorrect",
                },
            }) }),
        react_1.default.createElement(FormInput_1.default, { isSubmitted: isSubmitted, error: errors.username, name: "username", type: "text", placeholder: "Username", ref: register({
                required: { value: true, message: "This field is required" },
                maxLength: { value: 30, message: "Maximum 30 characters" },
            }) }),
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
        react_1.default.createElement("span", { className: "birth-date-label" }, "Date of birth"),
        react_1.default.createElement("div", { className: "date-selects" },
            react_1.default.createElement(DateSelect_1.default, { name: "day", defaultValue: "Day", options: days, ref: register({
                    validate: validateBirthDateInput,
                }) }),
            react_1.default.createElement(DateSelect_1.default, { name: "month", defaultValue: "Month", options: months, ref: register({
                    validate: validateBirthDateInput,
                }), optionsAreMonths: true }),
            react_1.default.createElement(DateSelect_1.default, { name: "year", defaultValue: "Year", options: years, ref: register({
                    validate: validateBirthDateInput,
                }) })),
        isSubmitted && errors.date && (react_1.default.createElement("span", { className: "has-text-danger is-pulled-left error date-error" }, (_b = errors.date) === null || _b === void 0 ? void 0 : _b.message)),
        react_1.default.createElement("label", { className: "is-pulled-left checkbox-label info" },
            react_1.default.createElement("input", { ref: register({
                    required: true,
                }), className: "checkbox", type: "checkbox", name: "terms" }),
            " ",
            "I agree to the ",
            react_1.default.createElement("a", { href: "/terms" }, "terms and conditions")),
        react_1.default.createElement("input", { className: "button form-button is-primary is-medium register-button", type: "submit", value: "Sign in", disabled: Object.keys(dirtyFields).length === 0 ||
                Object.keys(dirtyFields).length !== Object.keys(getValues()).length }),
        react_1.default.createElement("span", { className: "is-pulled-left info" },
            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/login" }, "Already signed up?")),
        react_1.default.createElement(ErrorSuccessInfo_1.default, { error: UI.error, success: UI.success })));
}
exports.default = connector(RegisterForm);
