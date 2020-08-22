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
require("./ChatForm.scss");
var ChatInput_1 = __importDefault(require("../../common/ChatInput/ChatInput"));
var core_1 = require("@material-ui/core");
var File_1 = __importDefault(require("../../common/File/File"));
var api_1 = __importDefault(require("../../api/api"));
var react_device_detect_1 = require("react-device-detect");
// redux
var react_redux_1 = require("react-redux");
var dataActions_1 = require("../../redux/actions/dataActions");
var mapStateToProps = function (state) { return ({ data: state.data }); };
var mapActionsToProps = { setReplyData: dataActions_1.setReplyData };
var connector = react_redux_1.connect(mapStateToProps, mapActionsToProps);
function ChatForm(_a) {
    var _this = this;
    var data = _a.data, socket = _a.socket, setReplyData = _a.setReplyData;
    var _b = __read(react_1.useState(""), 2), messageBody = _b[0], setMessageBody = _b[1];
    var _c = __read(react_1.useState("text"), 2), messageType = _c[0], setMessageType = _c[1];
    var _d = __read(react_1.useState(""), 2), fileName = _d[0], setFileName = _d[1];
    var _e = __read(react_1.useState(""), 2), fileKey = _e[0], setFileKey = _e[1];
    var _f = __read(react_1.useState(""), 2), fileUrl = _f[0], setFileUrl = _f[1];
    var _g = __read(react_1.useState(false), 2), isUploadingFile = _g[0], setIsUploadingFile = _g[1];
    var _h = __read(react_1.useState(false), 2), isFileError = _h[0], setIsFileError = _h[1];
    var _j = __read(react_1.useState(false), 2), isTyping = _j[0], setIsTyping = _j[1];
    var fileInputRef = react_1.useRef();
    react_1.useEffect(function () {
        if (messageBody.length > 0)
            setIsTyping(true);
        else
            setIsTyping(false);
    }, [messageBody]);
    react_1.useEffect(function () {
        var _a;
        var userIdToReemit = (_a = data.selectedConversation) === null || _a === void 0 ? void 0 : _a.userId;
        socket === null || socket === void 0 ? void 0 : socket.emit("isTyping", { isTyping: isTyping, userIdToReemit: userIdToReemit });
    }, [isTyping]);
    var handleChange = function (event) {
        return setMessageBody(event.target.value);
    };
    var submitChatMessage = function (event) {
        event.preventDefault();
        if (!data.selectedConversation)
            return;
        var message = {
            body: messageBody,
            type: messageType,
            file: { name: fileName, url: fileUrl },
            conversation: data.selectedConversation,
            replyData: data.replyData,
        };
        socket === null || socket === void 0 ? void 0 : socket.emit("sendMessage", message);
        setMessageBody("");
        resetFileData();
        setReplyData(null);
    };
    var handleFileUpload = function () { return __awaiter(_this, void 0, void 0, function () {
        var file, formData, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsFileError(false);
                    if (!fileInputRef.current.files)
                        return [2 /*return*/];
                    file = fileInputRef.current.files[0];
                    formData = new FormData();
                    formData.append("file", file);
                    setIsUploadingFile(true);
                    return [4 /*yield*/, api_1.default.uploadFile(formData)];
                case 1:
                    response = _a.sent();
                    setFileUrl(response.data.fileUrl);
                    setFileName(file.name);
                    setFileKey(response.data.key);
                    setMessageType(response.data.contentType.includes("image")
                        ? "image"
                        : response.data.contentType.includes("video")
                            ? "video"
                            : "other");
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    fileInputRef.current.value = "";
                    setIsFileError(true);
                    return [3 /*break*/, 4];
                case 3:
                    setIsUploadingFile(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleFileRemove = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, api_1.default.deleteFile(fileKey)];
                case 1:
                    _a.sent();
                    resetFileData();
                    return [2 /*return*/];
            }
        });
    }); };
    var resetFileData = function () {
        setMessageType("text");
        setFileName("");
        setFileKey("");
        setFileUrl("");
        fileInputRef.current.value = "";
    };
    var resetReplyData = function (event) {
        event.preventDefault();
        setReplyData(null);
    };
    return (react_1.default.createElement("form", { className: "chat-form-container", onSubmit: submitChatMessage },
        react_1.default.createElement("div", { className: "file-container" },
            react_1.default.createElement("input", { ref: fileInputRef, className: "file-input", type: "file", id: "file-input", onChange: handleFileUpload }),
            fileName ? (react_1.default.createElement("button", { type: "button", onClick: function (e) { return handleFileRemove(e); }, className: "button is-rounded remove-button", title: "Remove file" },
                react_1.default.createElement("i", { className: "fas fa-times" }))) : (react_1.default.createElement("label", { htmlFor: "file-input", title: "Add a file" },
                react_1.default.createElement("i", { className: "fas fa-paperclip" }))),
            fileName && react_1.default.createElement(File_1.default, { name: fileName, url: fileUrl }),
            isFileError && (react_1.default.createElement("p", { style: { color: "hsl(348, 100%, 61%)" } }, "Cannot upload file")),
            isUploadingFile && (react_1.default.createElement("div", { className: "circular-progress-container" },
                react_1.default.createElement(core_1.CircularProgress, { color: "inherit" }))),
            data.replyData && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("button", { type: "button", onClick: function (e) { return resetReplyData(e); }, className: "button is-rounded remove-button", title: "Cancel reply" },
                    react_1.default.createElement("i", { className: "fas fa-times" })),
                react_1.default.createElement("span", { title: "Replying to " + data.replyData.to, className: "form-reply-data", style: { marginLeft: react_device_detect_1.isMobile ? -5 : 0 } },
                    react_1.default.createElement("i", { className: "fas fa-reply" }),
                    data.replyData.to,
                    ": ",
                    data.replyData.body)))),
        react_1.default.createElement(ChatInput_1.default, { handleChange: handleChange, value: messageBody, placeholder: "New message...", icon: "far fa-envelope", disabled: !data.selectedConversation }),
        react_1.default.createElement("button", { className: "button is-rounded submit-button", type: "submit", disabled: (messageBody.length === 0 && fileUrl.length === 0) ||
                isUploadingFile ||
                !data.selectedConversation }, "Send")));
}
exports.default = connector(ChatForm);