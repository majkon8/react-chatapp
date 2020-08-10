import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { accessKeyID, secretAccessKey } from "../keys";

aws.config.update({
  secretAccessKey: secretAccessKey,
  accessKeyId: accessKeyID,
  region: "eu-central-1",
});

const s3 = new aws.S3();

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: "majkon-chat",
    acl: "public-read",
    contentType: (request, file, callback) => {
      callback(null, file.mimetype);
    },
    metadata: (request, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (request, file, callback) => {
      callback(null, Date.now().toString());
    },
  }),
});

interface ICallback {
  (error: aws.AWSError): void;
}

export const remove = (key: string, callback: ICallback) =>
  s3.deleteObject({ Bucket: "majkon-chat", Key: key }, callback);
