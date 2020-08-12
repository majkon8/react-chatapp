import * as express from "express";
import * as conversations from "../controlers/conversation.controller";
import { tokenAuth } from "../middlewares/auth";

let router = express.Router();

/* GET /conversations/ */
router.get("/", tokenAuth, conversations.getAll);

/* POST /conversations/delete */
router.post("/delete", tokenAuth, conversations.deleteConversation);

module.exports = router;
