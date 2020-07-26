import * as express from "express";
import * as users from "../controlers/user.controler";

let router = express.Router();

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
