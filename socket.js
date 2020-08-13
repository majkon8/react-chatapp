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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var index_1 = require("./index");
var messages = __importStar(require("./controlers/message.controller"));
var conversations = __importStar(require("./controlers/conversation.controller"));
var auth_1 = require("./middlewares/auth");
var mongoose_1 = require("./mongoose");
var user_model_1 = require("./models/user.model");
index_1.io.use(auth_1.tokenAuthSocket);
index_1.io.on("connection", function (socket) {
    socket.join(socket.user._id);
    socket.on("sendMessage", function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var conversationId, messageConversation, deletedConversationsIds, deletedConversations, deletedConversationsIds_1, deletedConversationsIds_1_1, conversationId_1, conversation, e_1_1, deletedConversation, members, newMessage, createdMessage, sender, receiver, error_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 22, , 23]);
                    conversationId = void 0;
                    messageConversation = void 0;
                    if (!message.conversation.new) return [3 /*break*/, 14];
                    return [4 /*yield*/, conversations.getUserDeletedConversationsIds(socket.user._id)];
                case 1:
                    deletedConversationsIds = (_b.sent()) || [];
                    deletedConversations = [];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 9]);
                    deletedConversationsIds_1 = __values(deletedConversationsIds), deletedConversationsIds_1_1 = deletedConversationsIds_1.next();
                    _b.label = 3;
                case 3:
                    if (!!deletedConversationsIds_1_1.done) return [3 /*break*/, 6];
                    conversationId_1 = deletedConversationsIds_1_1.value;
                    return [4 /*yield*/, conversations.get(conversationId_1)];
                case 4:
                    conversation = _b.sent();
                    if (conversation)
                        deletedConversations.push(conversation);
                    _b.label = 5;
                case 5:
                    deletedConversationsIds_1_1 = deletedConversationsIds_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (deletedConversationsIds_1_1 && !deletedConversationsIds_1_1.done && (_a = deletedConversationsIds_1.return)) _a.call(deletedConversationsIds_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9:
                    deletedConversation = deletedConversations.filter(function (conversation) {
                        return conversation.members.ids.includes(mongoose_1.mongoose.Types.ObjectId(message.conversation.userId));
                    });
                    if (!(deletedConversation.length === 0)) return [3 /*break*/, 11];
                    members = {
                        ids: [
                            mongoose_1.mongoose.Types.ObjectId(socket.user._id),
                            mongoose_1.mongoose.Types.ObjectId(message.conversation.userId),
                        ],
                        usernames: [socket.user.username, message.conversation.username],
                    };
                    return [4 /*yield*/, conversations.create(members)];
                case 10:
                    messageConversation = _b.sent();
                    // we need the conversationId in order to save message to database
                    conversationId = messageConversation === null || messageConversation === void 0 ? void 0 : messageConversation._id;
                    return [3 /*break*/, 13];
                case 11:
                    conversationId = deletedConversation[0].id;
                    messageConversation = __assign(__assign({}, deletedConversation[0].toObject()), { isDisplayed: false });
                    return [4 /*yield*/, conversations.undeleteConversation(conversationId, socket.user._id)];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 17];
                case 14:
                    conversationId = message.conversation.id;
                    return [4 /*yield*/, conversations.get(conversationId)];
                case 15:
                    messageConversation = _b.sent();
                    // undelete conversation for the receiver in case he deleted the conversation
                    return [4 /*yield*/, conversations.undeleteConversation(conversationId, message.conversation.userId)];
                case 16:
                    // undelete conversation for the receiver in case he deleted the conversation
                    _b.sent();
                    _b.label = 17;
                case 17:
                    newMessage = {
                        conversationId: mongoose_1.mongoose.Types.ObjectId(conversationId),
                        authorId: mongoose_1.mongoose.Types.ObjectId(socket.user._id),
                        body: message.body,
                        type: message.type,
                        file: message.file,
                    };
                    return [4 /*yield*/, messages.create(newMessage)];
                case 18:
                    createdMessage = _b.sent();
                    if (!createdMessage) return [3 /*break*/, 21];
                    sender = void 0;
                    receiver = void 0;
                    return [4 /*yield*/, user_model_1.User.findById(socket.user._id)];
                case 19:
                    // now we need to get both users from conversations to send them back and set to conversation
                    sender = _b.sent();
                    return [4 /*yield*/, user_model_1.User.findById(message.conversation.userId)];
                case 20:
                    receiver = _b.sent();
                    return [2 /*return*/, (index_1.io
                            //emit created message both to sender and receiver
                            .in(message.conversation.userId)
                            .in(socket.user._id)
                            .emit("receiveMessage", {
                            createdMessage: createdMessage,
                            messageConversation: messageConversation,
                            sender: sender,
                            receiver: receiver,
                        }))];
                case 21: return [3 /*break*/, 23];
                case 22:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [3 /*break*/, 23];
                case 23: return [2 /*return*/];
            }
        });
    }); });
    socket.on("displayMessage", function (conversationId) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedConversation, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, conversations.displayLastMessage(conversationId)];
                case 1:
                    updatedConversation = _a.sent();
                    return [2 /*return*/, index_1.io
                            .in(updatedConversation === null || updatedConversation === void 0 ? void 0 : updatedConversation.members.ids[0])
                            .in(updatedConversation === null || updatedConversation === void 0 ? void 0 : updatedConversation.members.ids[1])
                            .emit("messageDisplayed", updatedConversation)];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    socket.on("deleteMessage", function (messageToDeleteData) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, messages.deleteMessage(messageToDeleteData.messageId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, index_1.io
                            .in(socket.user._id)
                            .in(messageToDeleteData.otherUserId)
                            .emit("messageDeleted", messageToDeleteData.messageId)];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    socket.on("isTyping", function (typingData) {
        return index_1.io.in(typingData.userIdToReemit).emit("receiveIsTyping", {
            isTyping: typingData.isTyping,
            userId: socket.user._id,
        });
    });
});
