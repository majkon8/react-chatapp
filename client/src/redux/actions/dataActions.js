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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewMessage = exports.getMessages = exports.getAllConversations = exports.setSelectedConversation = exports.searchForUsers = void 0;
var types_1 = require("../types");
var axios_1 = __importDefault(require("axios"));
exports.searchForUsers = function (username) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (username.length > 0 && username.length < 3)
                    return [2 /*return*/];
                dispatch({ type: types_1.SET_LOADING_UI, payload: true });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 7]);
                if (!(username.length === 0)) return [3 /*break*/, 2];
                dispatch({ type: types_1.SET_SEARCHED_USERS, payload: [] });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, axios_1.default.get("/users/search/" + username)];
            case 3:
                response = _a.sent();
                dispatch({ type: types_1.SET_SEARCHED_USERS, payload: response.data });
                _a.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 7];
            case 6:
                dispatch({ type: types_1.SET_LOADING_UI, payload: false });
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); }; };
exports.setSelectedConversation = function (conversation) { return function (dispatch) {
    dispatch({ type: types_1.SET_SELECTED_CONVERSATION, payload: conversation });
}; };
exports.getAllConversations = function () { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch({ type: types_1.SET_LOADING_UI, payload: true });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, axios_1.default.get("/conversations")];
            case 2:
                response = _a.sent();
                dispatch({ type: types_1.SET_CONVERSATIONS, payload: response.data });
                return [3 /*break*/, 5];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 5];
            case 4:
                dispatch({ type: types_1.SET_LOADING_UI, payload: false });
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); }; };
exports.getMessages = function (conversationId) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch({ type: types_1.SET_LOADING_UI, payload: true });
                dispatch({ type: types_1.SET_MESSAGES, payload: null });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 7]);
                if (!(conversationId === null)) return [3 /*break*/, 2];
                dispatch({ type: types_1.SET_MESSAGES, payload: [] });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, axios_1.default.get("/messages/" + conversationId)];
            case 3:
                response = _a.sent();
                dispatch({ type: types_1.SET_MESSAGES, payload: response.data });
                _a.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5:
                error_3 = _a.sent();
                console.error(error_3);
                return [3 /*break*/, 7];
            case 6:
                dispatch({ type: types_1.SET_LOADING_UI, payload: false });
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); }; };
exports.setNewMessage = function (messageData) { return function (dispatch) {
    return dispatch({ type: types_1.SET_NEW_MESSAGE, payload: messageData });
}; };
