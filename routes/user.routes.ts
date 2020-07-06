import * as express from "express";
import * as users from "../controlers/user.controler";

let router = express.Router();

/* GET /users/:id */
router.get("/:id", users.findUser);

/* PATCH /users/:id */
router.patch("/:id", users.update);

/* POST /users */
router.post("/", users.signup);

/* POST /users/login */
router.post("/login", users.login);

module.exports = router;
