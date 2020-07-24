"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
// redux
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({ user: state.user }); };
var connector = react_redux_1.connect(mapStateToProps, {});
var AuthRoute = function (_a) {
    var Component = _a.component, user = _a.user;
    return (react_1.default.createElement(react_router_dom_1.Route, { render: function () { return (!user.isAuthenticated ? react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" }) : react_1.default.createElement(Component, null)); } }));
};
exports.default = connector(AuthRoute);
