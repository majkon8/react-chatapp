import * as express from "express";
import * as conversations from "../controlers/conversation.controller";

let router = express.Router();

/* POST /conversations */
router.post("/", conversations.create);

module.exports = router;
