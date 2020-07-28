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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var initialState = {
    isAuthenticated: false,
    authenticatedUser: null,
    accessToken: "",
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_AUTHENTICATED:
            return __assign(__assign({}, state), { isAuthenticated: action.payload });
        case types_1.SET_AUTHENTICATED_USER:
            return __assign(__assign({}, state), { authenticatedUser: action.payload });
        case types_1.SET_ACCESS_TOKEN:
            return __assign(__assign({}, state), { accessToken: action.payload });
        default:
            return state;
    }
}
exports.default = default_1;
