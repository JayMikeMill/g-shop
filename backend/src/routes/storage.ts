import express from "express";
import {
  uploadImage,
  uploadFile,
  deleteFile,
} from "@controllers/storageController";
import { requireRole } from "@middleware/authorization";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /storage/image - upload image
router.post(
  "/image",
  requireRole(["admin"]),
  upload.single("file"),
  uploadImage
);

// POST /storage/file - upload generic file
router.post("/file", requireRole(["admin"]), upload.single("file"), uploadFile);

// DELETE /storage - delete file/image by URL
router.delete("/", requireRole(["admin"]), deleteFile);

export default router;
