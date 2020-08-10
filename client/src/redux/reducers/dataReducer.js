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
    var _a, _b, _c, _d;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_SEARCHED_USERS:
            return __assign(__assign({}, state), { 
                // shows only users with whom we don't have conversation started
                searchedUsers: action.payload.filter(function (user) {
                    // first if user search for himself
                    // in localStorage there is saved id of a logged in user
                    var _a;
                    return (_a = state.conversations) === null || _a === void 0 ? void 0 : _a.every(function (conversation) { return conversation.user._id !== user._id; });
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
            // first handle new message which starts new conversation
            if (action.payload.newConversation) {
                var isSender_1 = action.payload.createdMessage.authorId ===
                    localStorage.getItem("userId");
                return __assign(__assign({}, state), { 
                    // remove from searched the user whom we started new conversation with
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
                    // select the new conversation if the user is sender
                    selectedConversation: isSender_1
                        ? __assign(__assign({}, state.selectedConversation), { new: false, id: action.payload.newConversation._id }) : //else don't do anything
                        state.selectedConversation, 
                    // if the user is sender, then we want to show created message on his chat
                    messages: isSender_1 ? [action.payload.createdMessage] : state.messages });
            }
            // now handle new message when it doesn't start new conversation
            return __assign(__assign({}, state), { conversations: __spread((_a = state.conversations) === null || _a === void 0 ? void 0 : _a.filter(function (conversation) {
                    return conversation._id ===
                        action.payload.createdMessage.conversationId;
                }).map(function (conversation) {
                    conversation.lastMessage = action.payload.createdMessage;
                    conversation.isDisplayed = false;
                    return conversation;
                }), (_b = state.conversations) === null || _b === void 0 ? void 0 : _b.filter(function (conversation) {
                    return conversation._id !== action.payload.createdMessage.conversationId;
                })), 
                // if the selected conversation is the one from which we get the message, then add this message to the chat, else do nothing
                messages: action.payload.createdMessage.conversationId === ((_c = state.selectedConversation) === null || _c === void 0 ? void 0 : _c.id)
                    ? __spread(state.messages, [action.payload.createdMessage]) : state.messages });
        case types_1.DISPLAY_MESSAGE:
            return __assign(__assign({}, state), { conversations: __spread((_d = state.conversations) === null || _d === void 0 ? void 0 : _d.map(function (conversation) {
                    if (conversation._id === action.payload._id)
                        conversation.isDisplayed = true;
                    return conversation;
                })) });
        default:
            return state;
    }
}
exports.default = default_1;
