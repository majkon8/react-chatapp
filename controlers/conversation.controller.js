"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.undeleteConversation = exports.getUserDeletedConversationsIds = exports.isDeleted = exports.deleteConversation = exports.getAll = exports.displayLastMessage = exports.updateLastMessage = exports.create = exports.getOne = void 0;
var conversation_model_1 = require("../models/conversation.model");
var message_model_1 = require("../models/message.model");
var user_model_1 = require("../models/user.model");
// GET CONVERSATION
exports.getOne = function (conversationId) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, conversation_model_1.Conversation.findById(conversationId)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// CREATE CONVERSATION
exports.create = function (members) { return __awaiter(void 0, void 0, void 0, function () {
    var newConversation, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newConversation = new conversation_model_1.Conversation({ members: members });
                return [4 /*yield*/, newConversation.save()];
            case 1:
                _a.sent();
                return [2 /*return*/, newConversation];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// UPDATE CONVERSATION LAST MESSAGE
exports.updateLastMessage = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var lastMessage, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                lastMessage = {
                    _id: message.id,
                    body: message.body,
                    type: message.type,
                    file: message.file,
                    authorId: message.authorId,
                    createdAt: message.createdAt,
                };
                return [4 /*yield*/, conversation_model_1.Conversation.updateLastMessage(message.conversationId, lastMessage)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// SET CONVERSATION TO DISPLAYED
exports.displayLastMessage = function (conversationId) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedConversation, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, conversation_model_1.Conversation.displayLastMessage(conversationId)];
            case 1:
                updatedConversation = _a.sent();
                return [2 /*return*/, updatedConversation];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// GET ALL USERS'S CONVERSATIONS
// when calling from socket only userId is provided, else only req and res are provided
exports.getAll = function (req, res, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user_1, conversations, conversationsAndUsers, conversationsAndUsers_1, conversationsAndUsers_1_1, conversation, otherUserId, conversationUser, e_1_1, conversationsAndUsersToSend, error_5;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 13, , 14]);
                if (!!(req && res)) return [3 /*break*/, 2];
                return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                user_1 = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                user_1 = req.user;
                _b.label = 3;
            case 3:
                if (!user_1)
                    throw new Error("User not found");
                return [4 /*yield*/, conversation_model_1.Conversation.getUserConversations(user_1._id)];
            case 4:
                conversations = _b.sent();
                conversationsAndUsers = __spread(conversations.map(function (conversation) { return conversation.toObject(); }));
                _b.label = 5;
            case 5:
                _b.trys.push([5, 10, 11, 12]);
                conversationsAndUsers_1 = __values(conversationsAndUsers), conversationsAndUsers_1_1 = conversationsAndUsers_1.next();
                _b.label = 6;
            case 6:
                if (!!conversationsAndUsers_1_1.done) return [3 /*break*/, 9];
                conversation = conversationsAndUsers_1_1.value;
                otherUserId = conversation.members.ids.filter(function (id) { return id.toHexString() !== user_1._id; })[0] || (
                // then it is a conversation with user himself
                user_1 === null || 
                // then it is a conversation with user himself
                user_1 === void 0 ? void 0 : 
                // then it is a conversation with user himself
                user_1._id);
                return [4 /*yield*/, user_model_1.User.findById(otherUserId)];
            case 7:
                conversationUser = _b.sent();
                if (conversationUser)
                    conversation.user = conversationUser;
                _b.label = 8;
            case 8:
                conversationsAndUsers_1_1 = conversationsAndUsers_1.next();
                return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 12];
            case 10:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 11:
                try {
                    if (conversationsAndUsers_1_1 && !conversationsAndUsers_1_1.done && (_a = conversationsAndUsers_1.return)) _a.call(conversationsAndUsers_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 12:
                conversationsAndUsersToSend = conversationsAndUsers.filter(function (conversation) { return conversation.user; });
                if (req && res)
                    // return only conversations with users that didn't deleted their accounts
                    res.send(conversationsAndUsersToSend);
                else
                    return [2 /*return*/, conversationsAndUsersToSend];
                return [3 /*break*/, 14];
            case 13:
                error_5 = _b.sent();
                console.error(error_5);
                if (req && res)
                    res.status(400).send(error_5);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
// DELETE CONVERSATION
exports.deleteConversation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var conversationId, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                conversationId = req.body.conversationId;
                return [4 /*yield*/, user_model_1.User.findById(req.user._id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.addConversationToDeleted(conversationId))];
            case 2:
                _a.sent();
                return [4 /*yield*/, message_model_1.Message.addToIsDeletedConversationBy(conversationId, req.user._id)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(400).send(error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// CHECK IF CONVERSATION IS IN USER'S DELETED CONVERSATIONS
exports.isDeleted = function (userId, conversationId) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedConversationsIds, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.getUserDeletedConversationsIds(userId)];
            case 1:
                deletedConversationsIds = _a.sent();
                if (deletedConversationsIds &&
                    deletedConversationsIds.includes(conversationId))
                    return [2 /*return*/, true];
                return [2 /*return*/, false];
            case 2:
                error_7 = _a.sent();
                console.error(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// GET DELETED CONVERSATIONS ARRAY
exports.getUserDeletedConversationsIds = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.getDeletedConversations(userId)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_8 = _a.sent();
                console.error(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// REMOVES CONVERSATION ID FROM DELETED ARRAY
exports.undeleteConversation = function (conversationId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.removeConversationFromDeleted(conversationId))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                console.error(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
