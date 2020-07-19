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
exports.resetPassword = exports.forgotPassword = exports.confirmAccount = exports.login = exports.signup = exports.update = exports.findUser = void 0;
var user_model_1 = require("../models/user.model");
var nodemailer_1 = __importDefault(require("nodemailer"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// GET ONE USER
exports.findUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 2:
                user = _a.sent();
                return [2 /*return*/, res.send(user)];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).send(error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// UPDATE USER
exports.update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(req.params.id, { $set: req.body.result }, { new: true })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.send(user)];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(400).send(error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, newUser, refreshToken, temporaryToken, mailOptions, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                newUser = new user_model_1.User(body);
                return [4 /*yield*/, newUser.generateToken()];
            case 2:
                refreshToken = _a.sent();
                return [4 /*yield*/, newUser.generateToken()];
            case 3:
                temporaryToken = _a.sent();
                newUser.refreshToken = refreshToken;
                newUser.temporaryToken = temporaryToken;
                return [4 /*yield*/, newUser.save()];
            case 4:
                _a.sent();
                mailOptions = newUser.createEmail(true);
                transporter.sendMail(mailOptions, function (error) {
                    if (error)
                        return res.status(400).send(error);
                    return res.send("success");
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(400).send(error_3)];
            case 6: return [2 /*return*/];
        }
    });
}); };
// LOG IN
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, refreshToken, accessToken, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.User.findByCredentials(email, password)];
            case 2:
                user = _a.sent();
                if (!user.confirmed)
                    return [2 /*return*/, res.status(400).send({ error: "Account not confirmed" })];
                refreshToken = user.refreshToken;
                return [4 /*yield*/, user.generateToken(true)];
            case 3:
                accessToken = _a.sent();
                res.header("x-refresh-token", refreshToken);
                res.header("x-access-token", accessToken);
                return [2 /*return*/, res.send(user)];
            case 4:
                error_4 = _a.sent();
                console.error(error_4);
                if (error_4.error === "User not found")
                    res.status(404);
                else
                    res.status(400);
                return [2 /*return*/, res.send(error_4)];
            case 5: return [2 /*return*/];
        }
    });
}); };
// CONFIRM AN ACCOUNT
exports.confirmAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var temporaryToken, decodedToken, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                temporaryToken = req.params.token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                jsonwebtoken_1.default.verify(temporaryToken, user_model_1.User.getJWTSecret(), function (error, decoded) {
                    if (error)
                        return res.status(400).send(error);
                    decodedToken = decoded;
                });
                return [4 /*yield*/, user_model_1.User.findOne({
                        _id: decodedToken._id,
                        temporaryToken: temporaryToken,
                    })];
            case 2:
                user = _a.sent();
                if (!user)
                    res.status(404).send({ error: "User not found" });
                user.confirmed = true;
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
            case 3:
                _a.sent();
                return [2 /*return*/, res.send("success")];
            case 4:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(400).send(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// SEND FORGOT PASSWORD EMAIL
exports.forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, temporaryToken, mailOptions, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).send({ error: "User not found" })];
                return [4 /*yield*/, user.generateToken(true)];
            case 3:
                temporaryToken = _a.sent();
                user.temporaryToken = temporaryToken;
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                mailOptions = user.createEmail(false);
                transporter.sendMail(mailOptions, function (error) {
                    if (error)
                        return res.status(400).send(error);
                    return res.send("success");
                });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(400).send(error_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// RESET PASSWORD
exports.resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPassword, temporaryToken, decodedToken, user, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPassword = req.body.newPassword;
                temporaryToken = req.body.token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                jsonwebtoken_1.default.verify(temporaryToken, user_model_1.User.getJWTSecret(), function (error, decoded) {
                    if (error)
                        return res.status(400).send(error);
                    decodedToken = decoded;
                });
                return [4 /*yield*/, user_model_1.User.findOne({
                        _id: decodedToken._id,
                        temporaryToken: temporaryToken,
                    })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).send({ error: "User not found" })];
                user.password = newPassword;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.send("success");
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.error(error_7);
                return [2 /*return*/, res.status(400).send(error_7)];
            case 5: return [2 /*return*/];
        }
    });
}); };
/*** Helpers ***/
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "majkonserver@gmail.com",
        pass: "hp l1706",
    },
});
