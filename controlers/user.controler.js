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
exports.refreshAccessToken = exports.externalLogin = exports.resetPassword = exports.forgotPassword = exports.confirmAccount = exports.login = exports.signup = exports.update = exports.searchForUsers = exports.getAuthenticatedUser = void 0;
var user_model_1 = require("../models/user.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mailerConfig_1 = require("../helpers/mailerConfig");
// GET AUTHENTICATED USER
exports.getAuthenticatedUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, userId, user, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                refreshToken = req.get("x-refresh-token");
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                return [4 /*yield*/, user_model_1.User.findByIdAndToken(userId, refreshToken)];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                return [2 /*return*/, res.json(user)];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).json(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// SEARCH FOR USERS BY NAME
exports.searchForUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, usernameRegex, users, confirmedUsers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.params.username;
                usernameRegex = new RegExp(username);
                return [4 /*yield*/, user_model_1.User.find({
                        username: { $regex: usernameRegex, $options: "i" },
                    })];
            case 1:
                users = _a.sent();
                confirmedUsers = users.filter(function (user) { return user.confirmed; });
                return [2 /*return*/, res.json(confirmedUsers)];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(400).json(error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// UPDATE USER
exports.update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(req.params.id, { $set: req.body.result }, { new: true })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(400).json(error_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// CREATE USER (SIGN UP)
exports.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, newUser, refreshToken, temporaryToken, mailOptions, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                body = req.body;
                newUser = new user_model_1.User(body);
                return [4 /*yield*/, newUser.generateToken()];
            case 1:
                refreshToken = _a.sent();
                return [4 /*yield*/, newUser.generateToken()];
            case 2:
                temporaryToken = _a.sent();
                newUser.refreshToken = refreshToken;
                newUser.temporaryToken = temporaryToken;
                return [4 /*yield*/, newUser.save()];
            case 3:
                _a.sent();
                mailOptions = newUser.createEmail(true);
                mailerConfig_1.transporter.sendMail(mailOptions, function (error) {
                    if (error)
                        return res.status(400).json(error);
                    return res.json("success");
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error(error_4);
                return [2 /*return*/, res.status(400).json(error_4)];
            case 5: return [2 /*return*/];
        }
    });
}); };
// LOG IN
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, refreshToken, accessToken, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, user_model_1.User.findByCredentials(email, password)];
            case 1:
                user = _a.sent();
                if (!user.confirmed)
                    return [2 /*return*/, res.status(400).json({ error: "Account not confirmed" })];
                refreshToken = user.refreshToken;
                return [4 /*yield*/, user.generateToken(true)];
            case 2:
                accessToken = _a.sent();
                res.header("x-refresh-token", refreshToken);
                res.header("x-access-token", accessToken);
                return [2 /*return*/, res.json(user)];
            case 3:
                error_5 = _a.sent();
                console.error(error_5);
                if (error_5.error === "User not found")
                    res.status(404);
                else
                    res.status(400);
                return [2 /*return*/, res.json(error_5)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// CONFIRM AN ACCOUNT
exports.confirmAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var temporaryToken, decodedToken_1, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                temporaryToken = req.params.token;
                jsonwebtoken_1.default.verify(temporaryToken, user_model_1.User.getJWTSecret(), function (error, decoded) {
                    if (error)
                        return res.status(400).json(error);
                    decodedToken_1 = decoded;
                });
                return [4 /*yield*/, user_model_1.User.findOne({
                        _id: decodedToken_1._id,
                        temporaryToken: temporaryToken,
                    })];
            case 1:
                user = _a.sent();
                if (!user)
                    res.status(404).json({ error: "User not found" });
                user.confirmed = true;
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json("success")];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                return [2 /*return*/, res.status(400).json(error_6)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// SEND FORGOT PASSWORD EMAIL
exports.forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, temporaryToken, mailOptions, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                return [4 /*yield*/, user.generateToken(true)];
            case 2:
                temporaryToken = _a.sent();
                user.temporaryToken = temporaryToken;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                mailOptions = user.createEmail(false);
                mailerConfig_1.transporter.sendMail(mailOptions, function (error) {
                    if (error)
                        return res.status(400).json(error);
                    return res.json("success");
                });
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.error(error_7);
                return [2 /*return*/, res.status(400).json(error_7)];
            case 5: return [2 /*return*/];
        }
    });
}); };
// RESET PASSWORD
exports.resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPassword, temporaryToken, decodedToken_2, user, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newPassword = req.body.newPassword;
                temporaryToken = req.body.token;
                jsonwebtoken_1.default.verify(temporaryToken, user_model_1.User.getJWTSecret(), function (error, decoded) {
                    if (error)
                        return res.status(400).json(error);
                    decodedToken_2 = decoded;
                });
                return [4 /*yield*/, user_model_1.User.findOne({
                        _id: decodedToken_2._id,
                        temporaryToken: temporaryToken,
                    })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                user.password = newPassword;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.json("success");
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.error(error_8);
                return [2 /*return*/, res.status(400).json(error_8)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// LOG IN WITH FACEBOOK/GOOGLE
exports.externalLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, newUser, refreshToken, temporaryToken, accessToken, refreshToken, accessToken, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                body = req.body;
                return [4 /*yield*/, user_model_1.User.findOne({ email: body.email })];
            case 1:
                user = _a.sent();
                // user already created an account with that email address internally
                if (user && !user.createdExternally)
                    return [2 /*return*/, res.status(400).json({ error: "Email already registered" })];
                if (!!user) return [3 /*break*/, 6];
                newUser = new user_model_1.User(body);
                return [4 /*yield*/, newUser.generateToken()];
            case 2:
                refreshToken = _a.sent();
                return [4 /*yield*/, newUser.generateToken()];
            case 3:
                temporaryToken = _a.sent();
                newUser.refreshToken = refreshToken;
                newUser.temporaryToken = temporaryToken;
                newUser.createdExternally = true;
                newUser.confirmed = true;
                return [4 /*yield*/, newUser.save()];
            case 4:
                _a.sent();
                return [4 /*yield*/, newUser.generateToken(true)];
            case 5:
                accessToken = _a.sent();
                res.header("x-refresh-token", refreshToken);
                res.header("x-access-token", accessToken);
                return [2 /*return*/, res.json("success")];
            case 6:
                if (!(user && user.createdExternally)) return [3 /*break*/, 8];
                refreshToken = user.refreshToken;
                return [4 /*yield*/, user.generateToken(true)];
            case 7:
                accessToken = _a.sent();
                res.header("x-refresh-token", refreshToken);
                res.header("x-access-token", accessToken);
                return [2 /*return*/, res.json(user)];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_9 = _a.sent();
                console.error(error_9);
                return [2 /*return*/, res.status(400).json(error_9)];
            case 10: return [2 /*return*/];
        }
    });
}); };
// REFRESH ACCESS TOKEN
exports.refreshAccessToken = function (req, res) {
    var refreshToken = req.get("x-refresh-token");
    if (!refreshToken)
        return res.status(400).json({ error: "No refresh token provided" });
    jsonwebtoken_1.default.verify(refreshToken, user_model_1.User.getJWTSecret(), function (error, decoded) {
        if (error) {
            console.error(error);
            return res.status(400).json(error);
        }
        jsonwebtoken_1.default.sign({ _id: decoded._id, username: decoded.username }, user_model_1.User.getJWTSecret(), { expiresIn: "10m" }, function (error, token) {
            if (error) {
                console.error(error);
                return res.status(400).json(error);
            }
            return res.json(token);
        });
    });
};
