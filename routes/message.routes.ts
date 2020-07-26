import * as express from "express";
import * as messages from "../controlers/message.controller";

let router = express.Router();

/* POST /messages */
router.post("/", messages.create);

module.exports = router;
