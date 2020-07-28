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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./App.scss");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var axios_1 = __importDefault(require("axios"));
// redux
var react_redux_1 = require("react-redux");
var store_1 = __importDefault(require("./redux/store"));
var types_1 = require("./redux/types");
// pages and components
var main_1 = __importDefault(require("./pages/main/main"));
var home_1 = __importDefault(require("./pages/home/home"));
var Logo_1 = __importDefault(require("./components/Logo/Logo"));
var login_1 = __importDefault(require("./pages/login/login"));
var register_1 = __importDefault(require("./pages/register/register"));
var resetPassword_1 = __importDefault(require("./pages/resetPassword/resetPassword"));
var AuthRoute_1 = __importDefault(require("./components/AuthRoute/AuthRoute"));
var UnauthRoute_1 = __importDefault(require("./components/UnauthRoute/UnauthRoute"));
var Terms = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require("./pages/terms/terms")); }); });
var PageNotFound = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require("./pages/pageNotFound/pageNotFound")); }); });
var ConfirmAccount = react_1.lazy(function () {
    return Promise.resolve().then(function () { return __importStar(require("./pages/confirmAccount/confirmAccount")); });
});
var refreshToken = localStorage.refreshToken;
if (refreshToken)
    store_1.default.dispatch({ type: types_1.SET_AUTHENTICATED, payload: true });
axios_1.default.interceptors.response.use(function (response) { return response; }, function (error) { return __awaiter(void 0, void 0, void 0, function () {
    var response, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(error.config && error.response && error.response.status === 401)) return [3 /*break*/, 2];
                return [4 /*yield*/, axios_1.default.get("/users/token", {
                        headers: { "x-refresh-token": refreshToken },
                    })];
            case 1:
                response = _a.sent();
                accessToken = response.data;
                error.config.headers["x-access-token"] = accessToken;
                axios_1.default.defaults.headers.common["x-access-token"] = accessToken;
                store_1.default.dispatch({ type: types_1.SET_ACCESS_TOKEN, payload: accessToken });
                return [2 /*return*/, axios_1.default.request(error.config)];
            case 2: return [2 /*return*/];
        }
    });
}); });
function App() {
    var location = react_router_dom_1.useLocation();
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement("div", { className: "app-container" },
            react_1.default.createElement(Logo_1.default, { location: location }),
            react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(react_1.default.Fragment, null) },
                react_1.default.createElement(framer_motion_1.AnimatePresence, null,
                    react_1.default.createElement(react_router_dom_1.Switch, { location: location, key: location.pathname },
                        react_1.default.createElement(UnauthRoute_1.default, { exact: true, path: "/", component: home_1.default }),
                        react_1.default.createElement(AuthRoute_1.default, { path: "/main", component: main_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/login", component: login_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/register", component: register_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/reset/:token", component: resetPassword_1.default }),
                        react_1.default.createElement(UnauthRoute_1.default, { path: "/confirm/:token", component: ConfirmAccount }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: "/terms", component: Terms }),
                        react_1.default.createElement(react_router_dom_1.Route, { component: PageNotFound })))))));
}
exports.default = App;
