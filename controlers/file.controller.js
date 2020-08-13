"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.uploadFile = void 0;
var file_service_1 = require("../services/file-service");
var singleUpload = file_service_1.upload.single("file");
exports.uploadFile = function (req, res) {
    singleUpload(req, res, function (error) {
        if (error)
            return res.status(400).json(error);
        return res.json({
            // @ts-ignore
            fileUrl: req.file.location,
            // @ts-ignore
            key: req.file.key,
            // @ts-ignore
            contentType: req.file.contentType,
        });
    });
};
exports.removeFile = function (req, res) {
    var fileKey = req.body.key;
    file_service_1.remove(fileKey, function (error) {
        if (error)
            return res.status(400).json(error);
        return res.json("success");
    });
};
