
import express from "express";
import { uploadImage, uploadFile, deleteFile } from "@controllers/storage-controller";
import { requireAdmin, requireAuth } from "@middleware/authorization";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /storage/image - upload image
router.post("/image", requireAuth, requireAdmin, upload.single("file"), uploadImage);

// POST /storage/file - upload generic file
router.post("/file", requireAuth, requireAdmin, upload.single("file"), uploadFile);

// DELETE /storage - delete file/image by URL
router.delete("/", requireAuth, requireAdmin, deleteFile);

export default router;
