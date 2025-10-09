import { Router } from "express";
import {
  uploadImage,
  uploadFile,
  deleteFile,
} from "@controllers/storageController";
import { requireRole } from "@middleware/authorization";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// -------------------------------
// Storage Routes (Admin Only)
// -------------------------------

// Upload an image
router.post(
  "/image",
  requireRole(["ADMIN"]),
  upload.single("file"),
  uploadImage
);

// Upload a generic file
router.post("/file", requireRole(["ADMIN"]), upload.single("file"), uploadFile);

// Delete a file/image by URL
router.delete("/", requireRole(["ADMIN"]), deleteFile);

export default router;
