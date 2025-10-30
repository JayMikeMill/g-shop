import { Router } from "express";
import multer from "multer";

// ===============================
// Controllers
// ===============================

// Auth
import { register, login, logout } from "@controllers/authController";

// Orders
import {
  placeOrder,
  buyOrderShipping,
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

// Storage Controllers
import {
  deleteFile,
  uploadFile,
  uploadImage,
} from "@controllers/storageController";

// AI Controllers
import {
  askAboutProduct,
  generateProductDescription as genPD,
} from "@controllers/aiController";

// Services
import { HealthService } from "@services";

// Middleware
import { getAuthUser, reqAdmin } from "@middleware/authorization";
import { onRegisterUser } from "@middleware/userPermissions";

// Initialize Multer
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Router
const router = Router();

// ---------------- Auth ----------------
router.post("/auth/register", getAuthUser, onRegisterUser, register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

// ---------------- Order  ----------------
router.post("/orders/place", placeOrder); // any authenticated user
router.post("/orders/buy-shipping", reqAdmin, buyOrderShipping); // any authenticated user
router.put("/orders/:id/refund", reqAdmin, refundOrder); // admin only

// ---------------- Shipping  ----------------
router.post("/shipping/verify", verifyAddress);
router.post("/shipping/rates", getRates);
router.post("/shipping/track", trackShipment);

// ---------------- Storage  ----------------
router.post("/storage/image", reqAdmin, upload.single("file"), uploadImage);
router.post("/storage/file", reqAdmin, upload.single("file"), uploadFile);
router.delete("/storage/:id", reqAdmin, deleteFile);

// ---------------- Ai Routes  ----------------
router.post("/ai/generate-product-description", reqAdmin, genPD);
router.post("/ai/ask-about-product", reqAdmin, askAboutProduct);

// ---------------- System Settings  ----------------
router.get("/settings/site", getSiteSettings);
router.get("/settings/admin/:scope", reqAdmin, getSettings);
router.put("/settings/admin/:scope", reqAdmin, updateSettings);

//------------Health Check------------------------------
router.get("/health", async (req, res) => {
  const result = await HealthService.check();
  res.status(result.ok ? 200 : 500).json(result);
});

export default router;
