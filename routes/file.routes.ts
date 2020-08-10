import * as express from "express";
import * as files from "../controlers/file.controller";
import { tokenAuth } from "../middlewares/auth";

let router = express.Router();

/* POST /files */
router.post("/", tokenAuth, files.uploadFile);
/* DELETE /files */
router.delete("/", tokenAuth, files.removeFile);

module.exports = router;
