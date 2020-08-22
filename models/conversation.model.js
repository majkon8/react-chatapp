"use strict";
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
exports.Conversation = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var user_model_1 = require("./user.model");
var ConversationSchema = new mongoose_1.Schema({
    members: {
        ids: { type: [mongoose_1.Schema.Types.ObjectId], required: true },
        usernames: { type: [String], required: true },
    },
    lastMessage: {
        _id: mongoose_1.Schema.Types.ObjectId,
        body: String,
        createdAt: Date,
        authorId: mongoose_1.Schema.Types.ObjectId,
        type: { type: String },
        file: { name: String, url: String },
    },
    isDisplayed: { type: Boolean, required: true, default: false },
}, { timestamps: { createdAt: false, updatedAt: true } });
/*** Instance methods ***/
ConversationSchema.methods.setLastMessageToDeleted = function () {
    return __awaiter(this, void 0, void 0, function () {
        var conversation;
        return __generator(this, function (_a) {
            conversation = this;
            conversation.lastMessage.type = "text";
            conversation.lastMessage.body = "";
            conversation.save();
            return [2 /*return*/];
        });
    });
};
/*** Model methods (static methods) ***/
ConversationSchema.statics.setConversationToNotDisplayed = function (conversationId) {
    return __awaiter(this, void 0, void 0, function () {
        var Conversation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Conversation = this;
                    return [4 /*yield*/, Conversation.findByIdAndUpdate(conversationId, {
                            isDisplayed: false,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
ConversationSchema.statics.updateLastMessage = function (conversationId, lastMessage) {
    return __awaiter(this, void 0, void 0, function () {
        var Conversation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Conversation = this;
                    return [4 /*yield*/, Conversation.findByIdAndUpdate(conversationId, {
                            lastMessage: lastMessage,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
ConversationSchema.statics.displayLastMessage = function (conversationId) {
    return __awaiter(this, void 0, void 0, function () {
        var Conversation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Conversation = this;
                    return [4 /*yield*/, Conversation.findByIdAndUpdate(conversationId, {
                            isDisplayed: true,
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
ConversationSchema.statics.getUserConversations = function (userId) {
    return __awaiter(this, void 0, void 0, function () {
        var Conversation, deletedConversations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Conversation = this;
                    return [4 /*yield*/, user_model_1.User.getDeletedConversations(userId)];
                case 1:
                    deletedConversations = _a.sent();
                    return [4 /*yield*/, Conversation.find({
                            "members.ids": mongoose_1.default.Types.ObjectId(userId),
                            _id: { $nin: deletedConversations },
                        }).sort({ updatedAt: "descending" })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
ConversationSchema.statics.getUserDeletedConversations = function (userId) {
    return __awaiter(this, void 0, void 0, function () {
        var Conversation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Conversation = this;
                    return [4 /*yield*/, Conversation.find({
                            "members.ids": mongoose_1.default.Types.ObjectId(userId),
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
ConversationSchema.statics.changeUsernameInConversations = function (userId, oldUsername, newUsername) {
    return __awaiter(this, void 0, void 0, function () {
        var Conversation, conversations, conversations_1, conversations_1_1, conversation, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Conversation = this;
                    return [4 /*yield*/, Conversation.getUserConversations(userId)];
                case 1:
                    conversations = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 9]);
                    conversations_1 = __values(conversations), conversations_1_1 = conversations_1.next();
                    _b.label = 3;
                case 3:
                    if (!!conversations_1_1.done) return [3 /*break*/, 6];
                    conversation = conversations_1_1.value;
                    conversation.members.usernames = __spread(conversation.members.usernames.filter(function (username) { return username !== oldUsername; }), [
                        newUsername,
                    ]);
                    return [4 /*yield*/, conversation.save()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    conversations_1_1 = conversations_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (conversations_1_1 && !conversations_1_1.done && (_a = conversations_1.return)) _a.call(conversations_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.Conversation = mongoose_1.default.model("Conversation", ConversationSchema);
