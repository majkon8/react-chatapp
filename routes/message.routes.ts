import * as express from "express";
import * as messages from "../controlers/message.controller";
import { tokenAuth } from "../middlewares/auth";

let router = express.Router();

/* GET /messages/:conversationId */
router.get("/:conversationId", tokenAuth, messages.getConversationMessages);

module.exports = router;
