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
    pending: {
        auth: false,
        search: false,
        conversations: false,
        messages: false,
    },
    error: null,
    success: null,
    theme: localStorage.getItem("theme") || "dark",
    color: localStorage.getItem("color") || "rgb(84, 89, 230)",
    // Only usable for screen resolution <= 768px
    isChatOpen: false,
    imageUrlToOpen: null,
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_ERROR:
            return __assign(__assign({}, state), { error: action.payload, success: null });
        case types_1.SET_SUCCESS:
            return __assign(__assign({}, state), { success: action.payload, error: null });
        case types_1.SET_PENDING:
            return __assign(__assign({}, state), { pending: __assign(__assign({}, state.pending), action.payload) });
        case types_1.SET_THEME:
            return __assign(__assign({}, state), { theme: action.payload });
        case types_1.SET_COLOR:
            return __assign(__assign({}, state), { color: action.payload });
        case types_1.SET_CHAT_OPEN:
            return __assign(__assign({}, state), { isChatOpen: action.payload });
        case types_1.SET_IMAGE_URL_TO_OPEN:
            return __assign(__assign({}, state), { imageUrlToOpen: action.payload });
        default:
            return state;
    }
}
exports.default = default_1;
