import { upload, remove } from "../services/file-service";
import { Request, Response } from "express";

const singleUpload = upload.single("file");

export const uploadFile = (req: Request, res: Response) => {
  singleUpload(req, res, (error: any) => {
    if (error) return res.status(400).json(error);
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

export const removeFile = (req: Request, res: Response) => {
  const fileKey = req.body.key;
  remove(fileKey, (error) => {
    if (error) return res.status(400).json(error);
    return res.json("success");
  });
};
