import { Request, Response, NextFunction } from "express";
import { StorageService } from "@services/storage-service";

// POST /storage/image
export async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    const { file, filename } = req.body;
    const url = await StorageService.uploadImage(file, filename);
    res.status(200).json({ url });
  } catch (err) {
    next(err);
  }
}

// POST /storage/file
export async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    const { file, filename, contentType } = req.body;
    const url = await StorageService.uploadFile(file, filename, contentType);
    res.status(200).json({ url });
  } catch (err) {
    next(err);
  }
}

// DELETE /storage
export async function deleteFile(req: Request, res: Response, next: NextFunction) {
  try {
    const { url } = req.body;
    const success = await StorageService.deleteFile(url);
    res.status(200).json({ success });
  } catch (err) {
    next(err);
  }
}
