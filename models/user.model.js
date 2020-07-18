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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var moment_1 = __importDefault(require("moment/moment"));
var jwtSecret = "2Z9M3M0YNxb770Gqog2ZzCqyXJXFkFCj5u1elOo509DGbO8fo5TQslzqTW9e2JYS";
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: 3,
        trim: true,
        unique: [true, "Email already used"],
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Email address incorrect",
        },
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: 1,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password too short"],
        validate: {
            validator: function (password) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
            },
            message: "Password too weak",
        },
    },
    birthDate: {
        type: Date,
        required: [true, "Birth date is required"],
        validate: {
            validator: function (date) { return validAge(date); },
            message: "Minimum age is 13",
        },
    },
    refreshToken: String,
    temporaryToken: String,
    confirmed: { type: Boolean, required: true, default: false },
});
/*** Instance methods ***/
UserSchema.methods.toJSON = function () {
    var user = this;
    var _a = user.toObject(), password = _a.password, refreshToken = _a.refreshToken, temporaryToken = _a.temporaryToken, userObject = __rest(_a, ["password", "refreshToken", "temporaryToken"]);
    // return the document except the password and tokens (these shouldn't be made available)
    return userObject;
};
UserSchema.methods.generateToken = function (temporary) {
    if (temporary === void 0) { temporary = false; }
    var user = this;
    return new Promise(function (resolve, reject) {
        // Create the JSON Web Token and return that
        jsonwebtoken_1.default.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: temporary ? "10m" : "9999 year" }, function (error, token) {
            if (!error)
                resolve(token);
            else
                reject(error);
        });
    });
};
UserSchema.methods.createConfirmationEmail = function () {
    var user = this;
    var mailOptions = {
        from: "majkonserver@gmail.com",
        to: user.email,
        subject: "Confirm your ChatApp account",
        text: "Hello, visit the link below to confirm your account. \nlocalhost:3001/confirm/" + user.temporaryToken,
    };
    return mailOptions;
};
/*** Model methods (static methods) ***/
UserSchema.statics.getJWTSecret = function () { return jwtSecret; };
UserSchema.statics.findByCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var User, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    User = this;
                    return [4 /*yield*/, User.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/, Promise.reject("User not found")];
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            bcryptjs_1.default.compare(password, user.password, function (error, res) {
                                if (res) {
                                    resolve(user);
                                }
                                else {
                                    reject("Wrong password");
                                }
                            });
                        })];
            }
        });
    });
};
/*** Middleware ***/
// hash password
UserSchema.pre("save", function (next) {
    var user = this;
    var costFactor = 10;
    if (user.isModified("password")) {
        bcryptjs_1.default.genSalt(costFactor, function (error, salt) {
            bcryptjs_1.default.hash(user.password, salt, function (error, hash) {
                user.password = hash;
                next();
            });
        });
    }
    else
        next();
});
/*** Helpers ***/
var validAge = function (date) {
    var today = moment_1.default();
    var birthDay = moment_1.default(date, "DD-MM-YYYY");
    var difference = today.diff(birthDay, "years", true);
    if (difference <= 13)
        return false;
    return true;
};
exports.User = mongoose_1.default.model("User", UserSchema);
