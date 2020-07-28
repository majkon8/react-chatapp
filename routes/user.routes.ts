import * as express from "express";
import * as users from "../controlers/user.controler";
import { tokenAuth } from "../middlewares/auth";

let router = express.Router();

/* GET /users/search/:username */
router.get("/search/:username", users.searchForUsers);

/* GET /users */
router.get("/", tokenAuth, users.getAuthenticatedUser);

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

/* GET /users/token */
router.get("/token", users.refreshAccessToken);

module.exports = router;
