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
    replyData: null,
};
function default_1(state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_SEARCHED_USERS:
            return __assign(__assign({}, state), { 
                // shows only users with whom we don't have conversation started
                searchedUsers: action.payload.filter(function (user) {
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
            if (action.payload.length === 0)
                return __assign(__assign({}, state), { messages: [] });
            var newMessages = state.messages
                ? action.payload.filter(function (newMessage) {
                    var _a;
                    return !((_a = state.messages) === null || _a === void 0 ? void 0 : _a.some(function (stateMessage) { return stateMessage._id === newMessage._id; }));
                })
                : action.payload;
            return __assign(__assign({}, state), { messages: state.messages
                    ? __spread(newMessages, state.messages) : action.payload });
        case types_1.SET_NEW_MESSAGE:
            var isSender_1 = action.payload.createdMessage.authorId ===
                localStorage.getItem("userId");
            var isNewConversation = !((_a = state.conversations) === null || _a === void 0 ? void 0 : _a.some(function (conversation) {
                return conversation._id === action.payload.createdMessage.conversationId;
            }));
            var isSelected = action.payload.createdMessage.conversationId === ((_b = state.selectedConversation) === null || _b === void 0 ? void 0 : _b.id);
            // first handle new message which starts new conversation and conversation wasn't deleted
            if (isNewConversation) {
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
                        __assign(__assign({}, action.payload.messageConversation), { lastMessage: action.payload.createdMessage })
                    ], (_c = state.conversations) === null || _c === void 0 ? void 0 : _c.filter(function (conversation) {
                        return conversation._id !== action.payload.messageConversation._id;
                    })), 
                    // select the new conversation if the user is sender
                    selectedConversation: isSender_1
                        ? __assign(__assign({}, state.selectedConversation), { new: false, id: action.payload.messageConversation._id }) : //else don't do anything
                        state.selectedConversation });
                // now handle new message when it doesn't start new conversation
            }
            else {
                return __assign(__assign({}, state), { conversations: __spread((_d = state.conversations) === null || _d === void 0 ? void 0 : _d.filter(function (conversation) {
                        return conversation._id ===
                            action.payload.createdMessage.conversationId;
                    }).map(function (conversation) {
                        conversation.lastMessage = action.payload.createdMessage;
                        conversation.isDisplayed = false;
                        return conversation;
                    }), (_e = state.conversations) === null || _e === void 0 ? void 0 : _e.filter(function (conversation) {
                        return conversation._id !==
                            action.payload.createdMessage.conversationId;
                    })), 
                    // if the selected conversation is the one from which we get the message, then add this message to the chat, else do nothing
                    messages: isSelected
                        ? __spread(state.messages, [action.payload.createdMessage]) : state.messages });
            }
        case types_1.DISPLAY_MESSAGE:
            return __assign(__assign({}, state), { conversations: __spread((_f = state.conversations) === null || _f === void 0 ? void 0 : _f.map(function (conversation) {
                    if (conversation._id === action.payload._id)
                        conversation.isDisplayed = true;
                    return conversation;
                })) });
        case types_1.SET_MESSAGE_DELETED:
            return __assign(__assign({}, state), { messages: __spread((_g = state.messages) === null || _g === void 0 ? void 0 : _g.map(function (message) {
                    if (message._id === action.payload) {
                        message.type = "text";
                        message.body = "";
                        message.reactionEmote = "";
                    }
                    return message;
                })), conversations: __spread((_h = state.conversations) === null || _h === void 0 ? void 0 : _h.map(function (conversation) {
                    if (conversation.lastMessage._id === action.payload) {
                        conversation.lastMessage.type = "text";
                        conversation.lastMessage.body = "";
                    }
                    return conversation;
                })) });
        case types_1.DELETE_CONVERSATION:
            var isDeletingSelectedConversation = ((_j = state.selectedConversation) === null || _j === void 0 ? void 0 : _j.id) === action.payload;
            return __assign(__assign({}, state), { conversations: __spread((_k = state.conversations) === null || _k === void 0 ? void 0 : _k.filter(function (conversation) { return conversation._id !== action.payload; })), selectedConversation: isDeletingSelectedConversation
                    ? null
                    : state.selectedConversation, messages: isDeletingSelectedConversation ? null : state.messages });
        case types_1.ADD_REACTION_EMOTE_TO_MESSAGE:
            return __assign(__assign({}, state), { messages: __spread((_l = state.messages) === null || _l === void 0 ? void 0 : _l.map(function (message) {
                    if (message._id === action.payload.messageId) {
                        message.reactionEmote = action.payload.emote;
                    }
                    return message;
                })) });
        case types_1.SET_REPLY_DATA:
            return __assign(__assign({}, state), { replyData: action.payload });
        default:
            return state;
    }
}
exports.default = default_1;
