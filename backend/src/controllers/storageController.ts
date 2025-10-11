import { Request, Response } from "express";
import { controllerHandler } from "@utils";
import { StorageService as S } from "@services";

// Upload image
export const uploadImage = controllerHandler({
  select: (req: Request) => req.file, // pick the uploaded file
  handler: async (file, req: Request, res: Response) => {
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const url = await S.uploadImage(file.buffer, file.originalname);
    return { url };
  },
});

// Upload generic file
export const uploadFile = controllerHandler({
  select: (req: Request) => req.file, // pick the uploaded file
  handler: async (file, req: Request, res: Response) => {
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const url = await S.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype
    );
    return { url };
  },
});

// Delete file (data comes from req.body)
export const deleteFile = controllerHandler({
  handler: async ({ url }: { url: string }) => {
    const success = await S.deleteFile(url);
    return { success };
  },
});
