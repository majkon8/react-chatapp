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
    loading: false,
    error: null,
    success: null,
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_ERROR:
            return __assign(__assign({}, state), { error: action.payload, success: null });
        case types_1.SET_SUCCESS:
            return __assign(__assign({}, state), { success: action.payload, error: null });
        case types_1.SET_LOADING_UI:
            return __assign(__assign({}, state), { loading: action.payload });
        default:
            return state;
    }
}
exports.default = default_1;
