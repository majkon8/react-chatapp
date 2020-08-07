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
    searchConversations: "",
    messages: null,
};
function default_1(state, action) {
    var _a, _b, _c;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_SEARCHED_USERS:
            return __assign(__assign({}, state), { 
                // shows only users with whom we don't have conversation started
                searchedUsers: action.payload.filter(function (user) {
                    var _a, _b;
                    if (user._id !== localStorage.getItem("userId"))
                        return (_a = state.conversations) === null || _a === void 0 ? void 0 : _a.every(function (conversation) { return !conversation.members.ids.includes(user._id); });
                    // else case is when user search for himself
                    else
                        return (_b = state.conversations) === null || _b === void 0 ? void 0 : _b.every(function (conversation) {
                            return !conversation.members.ids.every(function (id) { return id === user._id; });
                        });
                }) });
        case types_1.SET_SELECTED_CONVERSATION:
            return __assign(__assign({}, state), { selectedConversation: action.payload });
        case types_1.SET_CONVERSATIONS:
            return __assign(__assign({}, state), { conversations: action.payload });
        case types_1.SEARCH_CONVERSATIONS:
            return __assign(__assign({}, state), { searchConversations: action.payload });
        case types_1.SET_MESSAGES:
            return __assign(__assign({}, state), { messages: action.payload });
        case types_1.SET_NEW_MESSAGE:
            if (action.payload.newConversation) {
                var isSender_1 = action.payload.createdMessage.authorId ===
                    localStorage.getItem("userId");
                return __assign(__assign({}, state), { 
                    // remove user whom we started new conversation with from searched
                    searchedUsers: state.searchedUsers
                        ? __spread(state.searchedUsers.filter(function (user) {
                            var _a;
                            if (isSender_1)
                                // when messsage starts a new conversation, the id of selectedConversation is id of a user with whom we are starting the conversation
                                return user._id !== ((_a = state.selectedConversation) === null || _a === void 0 ? void 0 : _a.id);
                            else
                                return user._id !== action.payload.createdMessage.authorId;
                        })) : null, 
                    // add just created conversation to our conversations list
                    conversations: __spread([
                        __assign(__assign({}, action.payload.newConversation), { lastMessage: action.payload.createdMessage })
                    ], state.conversations), 
                    // select the new conversation for sender
                    selectedConversation: isSender_1
                        ? __assign(__assign({}, state.selectedConversation), { new: false, id: action.payload.newConversation._id }) : state.selectedConversation, messages: isSender_1 ? [action.payload.createdMessage] : state.messages });
            }
            if (action.payload.createdMessage.conversationId === ((_a = state.selectedConversation) === null || _a === void 0 ? void 0 : _a.id)) {
                return __assign(__assign({}, state), { conversations: __spread((_b = state.conversations) === null || _b === void 0 ? void 0 : _b.filter(function (conversation) { var _a; return conversation._id === ((_a = state.selectedConversation) === null || _a === void 0 ? void 0 : _a.id); }).map(function (conversation) {
                        conversation.lastMessage = action.payload.createdMessage;
                        return conversation;
                    }), (_c = state.conversations) === null || _c === void 0 ? void 0 : _c.filter(function (conversation) { var _a; return conversation._id !== ((_a = state.selectedConversation) === null || _a === void 0 ? void 0 : _a.id); })), messages: __spread(state.messages, [action.payload.createdMessage]) });
            }
        default:
            return state;
    }
}
exports.default = default_1;
