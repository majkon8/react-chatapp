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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var initialState = {
    searchedUsers: null,
    selectedConversation: null,
    conversations: null,
    messages: null,
};
function default_1(state, action) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_SEARCHED_USERS:
            return __assign(__assign({}, state), { searchedUsers: action.payload });
        case types_1.SET_SELECTED_CONVERSATION:
            return __assign(__assign({}, state), { selectedConversation: action.payload });
        case types_1.SET_CONVERSATIONS:
            return __assign(__assign({}, state), { conversations: action.payload });
        case types_1.SET_MESSAGES:
            return __assign(__assign({}, state), { messages: action.payload });
        case types_1.SET_NEW_MESSAGE:
            if (action.payload.conversationId === ((_a = state.selectedConversation) === null || _a === void 0 ? void 0 : _a.id))
                return __assign(__assign({}, state), { messages: __spread(state.messages, [action.payload]) });
        default:
            return state;
    }
}
exports.default = default_1;
