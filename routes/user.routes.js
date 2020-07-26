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
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var users = __importStar(require("../controlers/user.controler"));
var router = express.Router();
/* GET /users/:username */
router.get("/:username", users.searchForUsers);
/* PATCH /users/:id */
router.patch("/:id", users.update);
/* POST /users */
router.post("/", users.signup);
/* POST /users/login */
router.post("/login", users.login);
/* GET /users/confirm/:token */
router.get("/confirm/:token", users.confirmAccount);
/* POST /users/forgot/ */
router.post("/forgot/", users.forgotPassword);
/* POST /users/reset */
router.post("/reset", users.resetPassword);
/* POST /users/login/external */
router.post("/login/external", users.externalLogin);
module.exports = router;
