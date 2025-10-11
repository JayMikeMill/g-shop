import { Router } from "express";
import multer from "multer";

// ===============================
// Controllers
// ===============================

// Auth
import {
  register,
  login,
  verifyToken,
  logout,
} from "@controllers/authController";

// Orders
import {
  placeOrder,
  refundOrder,
} from "@controllers/orderProcessingController";

// Shipping
import {
  verifyAddress,
  getRates,
  trackShipment,
} from "@controllers/shippingController";

// System Settings
import {
  getSettings,
  getSiteSettings,
  updateSettings,
} from "@controllers/systemSettingsController";

// Middleware
import { requireRole as roles } from "@middleware/authorization";
import {
  deleteFile,
  uploadFile,
  uploadImage,
} from "@controllers/storageController";
const reqAdmin = roles(["ADMIN"]);

// Initialize Multer
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Router
const router = Router();

// ---------------- Auth ----------------
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/verify", verifyToken);
router.post("/auth/logout", logout);

// ---------------- Order  ----------------
router.post("/orders/place", placeOrder); // any authenticated user
router.put("/orders/:id/refund", reqAdmin, refundOrder); // admin only

// ---------------- Shipping  ----------------
router.post("/shipping/verify", verifyAddress);
router.post("/shipping/rates", getRates);
router.post("/shipping/track", trackShipment);

// ---------------- Storage  ----------------
router.post("/image", reqAdmin, upload.single("file"), uploadImage);
router.post("/file", reqAdmin, upload.single("file"), uploadFile);
router.delete("/", reqAdmin, deleteFile);

// ---------------- System Settings  ----------------
router.get("/settings/site", getSiteSettings);
router.get("/settings/admin/:scope", reqAdmin, getSettings);
router.put("/settings/admin/:scope", reqAdmin, updateSettings);

export default router;
