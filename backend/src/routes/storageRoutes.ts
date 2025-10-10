import { Router } from "express";
import multer from "multer";
import { requireRole as roles } from "@middleware/authorization";

import {
  uploadImage,
  uploadFile,
  deleteFile,
} from "@controllers/storageController";

// -------------------------------
// Initialize Router & Multer
// -------------------------------
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload an image
router.post("/image", roles(["ADMIN"]), upload.single("file"), uploadImage);
// Upload a generic file
router.post("/file", roles(["ADMIN"]), upload.single("file"), uploadFile);
// Delete a file/image by URL
router.delete("/", roles(["ADMIN"]), deleteFile);

export default router;
