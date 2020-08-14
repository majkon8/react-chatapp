"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.upload = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: "eu-central-1",
});
var s3 = new aws_sdk_1.default.S3();
exports.upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: "majkon-chat",
        acl: "public-read",
        contentType: function (request, file, callback) {
            callback(null, file.mimetype);
        },
        metadata: function (request, file, callback) {
            callback(null, { fieldName: file.fieldname });
        },
        key: function (request, file, callback) {
            callback(null, Date.now().toString());
        },
    }),
});
exports.remove = function (key, callback) {
    return s3.deleteObject({ Bucket: "majkon-chat", Key: key }, callback);
};
