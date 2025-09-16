import express from "express";
import { uploadImage, uploadFile, deleteFile } from "@controllers/storage-controller";
import { requireAdmin, requireAuth } from "@middleware/authorization";

const router = express.Router();

// POST /storage/image - upload image
router.post("/image", requireAuth, requireAdmin, uploadImage);

// POST /storage/file - upload generic file
router.post("/file", requireAuth, requireAdmin, uploadFile);

// DELETE /storage - delete file/image by URL
router.delete("/", requireAuth, requireAdmin, deleteFile);

export default router;
