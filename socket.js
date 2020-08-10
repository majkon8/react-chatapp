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
        var conversationId, newConversation, members, newMessage, createdMessage, sender, receiver, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    conversationId = void 0;
                    newConversation = void 0;
                    if (!message.conversation.new) return [3 /*break*/, 2];
                    members = {
                        ids: [
                            mongoose_1.mongoose.Types.ObjectId(socket.user._id),
                            mongoose_1.mongoose.Types.ObjectId(message.conversation.userId),
                        ],
                        usernames: [socket.user.username, message.conversation.username],
                    };
                    return [4 /*yield*/, conversations.create(members)];
                case 1:
                    newConversation = _a.sent();
                    // we need the conversationId in order to save message to database
                    conversationId = newConversation === null || newConversation === void 0 ? void 0 : newConversation._id;
                    return [3 /*break*/, 3];
                case 2:
                    conversationId = message.conversation.id;
                    _a.label = 3;
                case 3:
                    newMessage = {
                        conversationId: mongoose_1.mongoose.Types.ObjectId(conversationId),
                        authorId: mongoose_1.mongoose.Types.ObjectId(socket.user._id),
                        body: message.body,
                        type: message.type,
                        file: message.file,
                    };
                    return [4 /*yield*/, messages.create(newMessage)];
                case 4:
                    createdMessage = _a.sent();
                    if (!createdMessage) return [3 /*break*/, 8];
                    sender = void 0;
                    receiver = void 0;
                    if (!message.conversation.new) return [3 /*break*/, 7];
                    return [4 /*yield*/, user_model_1.User.findById(socket.user._id)];
                case 5:
                    // now we need to get both users from conversations to send them back and set to conversation
                    sender = _a.sent();
                    return [4 /*yield*/, user_model_1.User.findById(message.conversation.userId)];
                case 6:
                    receiver = _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/, (index_1.io
                        //emit created message both to sender and receiver
                        .in(message.conversation.userId)
                        .in(socket.user._id)
                        .emit("receiveMessage", {
                        createdMessage: createdMessage,
                        newConversation: message.conversation.new
                            ? newConversation
                            : null,
                        sender: sender,
                        receiver: receiver,
                    }))];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
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
});
