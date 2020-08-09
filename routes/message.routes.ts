import * as express from "express";
import * as messages from "../controlers/message.controller";
import { tokenAuth } from "../middlewares/auth";

let router = express.Router();

/* GET /messages/:conversationId/:count */
router.get(
  "/:conversationId/:count",
  tokenAuth,
  messages.getConversationMessages
);

module.exports = router;
