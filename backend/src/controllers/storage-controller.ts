import { Request, Response, NextFunction } from "express";
import { StorageService } from "@services/storage-service";


// POST /storage/image
export async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const url = await StorageService.uploadImage(req.file.buffer, req.file.originalname);
    res.status(200).json({ url });
  } catch (err) {
    next(err);
  }
}


// POST /storage/file
export async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const url = await StorageService.uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
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
