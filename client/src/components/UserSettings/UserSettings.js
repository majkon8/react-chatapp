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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./UserSettings.scss");
var hooks_1 = require("../../hooks/hooks");
var api_1 = __importDefault(require("../../api/api"));
var core_1 = require("@material-ui/core");
// redux
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../redux/actions/userActions");
var mapStateToProps = function (state) { return ({ user: state.user }); };
var mapActionsToProps = { updateUserAccountDetails: userActions_1.updateUserAccountDetails };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function UserSettings(_a) {
    var _this = this;
    var _b, _c, _d, _e;
    var user = _a.user, updateUserAccountDetails = _a.updateUserAccountDetails;
    var _f = __read(react_1.useState(false), 2), isOpen = _f[0], setIsOpen = _f[1];
    var _g = __read(react_1.useState(false), 2), isEditingUsername = _g[0], setIsEditingUsername = _g[1];
    var _h = __read(react_1.useState(false), 2), isEditingBio = _h[0], setIsEditingBio = _h[1];
    var _j = __read(react_1.useState(""), 2), newUsername = _j[0], setNewUsername = _j[1];
    var _k = __read(react_1.useState(""), 2), newBio = _k[0], setNewBio = _k[1];
    var _l = __read(react_1.useState(""), 2), newImageUrl = _l[0], setNewImageUrl = _l[1];
    var _m = __read(react_1.useState(false), 2), isUploadingFile = _m[0], setIsUploadingFile = _m[1];
    var fileInputRef = react_1.useRef();
    var innerRef = hooks_1.useOuterClick(function (event) {
        var eventTargetClassName = event.target.className;
        if (typeof eventTargetClassName === "string" &&
            eventTargetClassName.includes("ignore-outer-click"))
            return;
        setIsOpen(false);
    });
    react_1.useEffect(function () {
        if (!isOpen) {
            setIsEditingUsername(false);
            setIsEditingBio(false);
        }
    }, [isOpen]);
    react_1.useEffect(function () {
        var _a, _b;
        if ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a.username)
            setNewUsername(user.authenticatedUser.username);
        if ((_b = user.authenticatedUser) === null || _b === void 0 ? void 0 : _b.bio)
            setNewBio(user.authenticatedUser.bio);
    }, [user.authenticatedUser]);
    var toggleOpen = function () { return setIsOpen(!isOpen); };
    var editUsername = function () { return setIsEditingUsername(true); };
    var editBio = function () { return setIsEditingBio(true); };
    var handleChange = function (event, setState) { return setState(event.target.value); };
    var hasMadeChange = function () {
        var _a, _b;
        return (newUsername && ((_a = user.authenticatedUser) === null || _a === void 0 ? void 0 : _a.username) !== newUsername) ||
            (((_b = user.authenticatedUser) === null || _b === void 0 ? void 0 : _b.bio) && user.authenticatedUser.bio !== newBio) ||
            newImageUrl;
    };
    var handleUpdate = function () {
        var bioToSend = isEditingBio ? newBio : user.authenticatedUser.bio;
        var usernameToSend = isEditingUsername
            ? newUsername
            : user.authenticatedUser.username;
        var imageUrlToSend = newImageUrl
            ? newImageUrl
            : user.authenticatedUser.imageUrl;
        if ((bioToSend && bioToSend.length > 100) ||
            usernameToSend.length < 3 ||
            usernameToSend.length > 30)
            return;
        updateUserAccountDetails(bioToSend, usernameToSend, imageUrlToSend);
        resetForms();
    };
    var resetForms = function () {
        setIsEditingBio(false);
        setIsEditingUsername(false);
        setNewBio("");
        setNewUsername("");
        setNewImageUrl("");
    };
    var triggerFileInput = function () { return fileInputRef.current.click(); };
    var handleImageUpload = function () { return __awaiter(_this, void 0, void 0, function () {
        var file, formData, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsUploadingFile(true);
                    if (!fileInputRef.current.files)
                        return [2 /*return*/];
                    file = fileInputRef.current.files[0];
                    formData = new FormData();
                    formData.append("file", file);
                    return [4 /*yield*/, api_1.default.uploadFile(formData)];
                case 1:
                    response = _a.sent();
                    if (!response.data.contentType.includes("image")) {
                        fileInputRef.current.files = null;
                        return [2 /*return*/];
                    }
                    setNewImageUrl(response.data.fileUrl);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setIsUploadingFile(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteAccount = function () { return __awaiter(_this, void 0, void 0, function () {
        var confirmed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    confirmed = confirm("Are you sure you want to delete your account? This process is irreversible.");
                    if (!confirmed) return [3 /*break*/, 2];
                    return [4 /*yield*/, api_1.default.deleteUserAccount()];
                case 1:
                    _a.sent();
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/";
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { ref: innerRef, className: "settings-container user-settings-container dropdown is-right " + (isOpen && "is-active") },
        react_1.default.createElement("div", { className: "dropdown-trigger" },
            react_1.default.createElement("button", { onClick: toggleOpen, className: "button is-rounded settings-button dropdown-trigger-button", "aria-haspopup": "true", "aria-controls": "dropdown-menu" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement("i", { className: "fas fa-user" })))),
        react_1.default.createElement("div", { className: "dropdown-menu", id: "dropdown-menu", role: "menu" },
            react_1.default.createElement("div", { className: "dropdown-content" },
                isUploadingFile ? (react_1.default.createElement(core_1.CircularProgress, { color: "inherit" })) : (react_1.default.createElement("img", { src: newImageUrl
                        ? newImageUrl
                        : ((_b = user.authenticatedUser) === null || _b === void 0 ? void 0 : _b.imageUrl) ? (_c = user.authenticatedUser) === null || _c === void 0 ? void 0 : _c.imageUrl : "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png", alt: "user", className: "dropdown-item user-settings-user-image", onClick: triggerFileInput })),
                react_1.default.createElement("input", { onChange: handleImageUpload, style: { display: "none" }, ref: fileInputRef, type: "file", accept: "image/png,image/jpeg" }),
                isEditingUsername ? (react_1.default.createElement("input", { className: "input user-settings-username-input", placeholder: "Username", value: newUsername, maxLength: 30, onChange: function (e) { return handleChange(e, setNewUsername); } })) : (react_1.default.createElement("div", { onClick: editUsername, className: "dropdown-item user-settings-username ignore-outer-click", title: "Edit username" }, (_d = user.authenticatedUser) === null || _d === void 0 ? void 0 : _d.username)),
                isEditingBio ? (react_1.default.createElement("div", { className: "textarea-container" },
                    react_1.default.createElement("textarea", { className: "textarea has-fixed-size user-settings-bio-textarea", placeholder: "Bio", value: newBio, maxLength: 100, rows: 3, onChange: function (e) { return handleChange(e, setNewBio); } }))) : (react_1.default.createElement("div", { onClick: editBio, className: "dropdown-item user-settings-bio ignore-outer-click", title: "Edit bio" }, ((_e = user.authenticatedUser) === null || _e === void 0 ? void 0 : _e.bio) ? user.authenticatedUser.bio
                    : "Your bio")),
                hasMadeChange() && (react_1.default.createElement("button", { onClick: handleUpdate, className: "user-settings-button button is-success ignore-outer-click" }, "Update account")),
                react_1.default.createElement("button", { onClick: handleDeleteAccount, className: "user-settings-button button is-danger" }, "Delete account")))));
}
exports.default = connector(UserSettings);
