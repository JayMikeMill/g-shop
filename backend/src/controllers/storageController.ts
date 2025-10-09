import { controllerHandler } from "@utils/controllerHandler";
import { StorageService as S } from "@services/StorageService";

export const uploadImage = controllerHandler({
  handler: async (_, req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const url = await S.uploadImage(req.file.buffer, req.file.originalname);
    return { url };
  },
});

export const uploadFile = controllerHandler({
  handler: async (_, req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const url = await S.uploadFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );
    return { url };
  },
});

export const deleteFile = controllerHandler({
  handler: async ({ url }) => {
    const success = await S.deleteFile(url);
    return { success };
  },
});
