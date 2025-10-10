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

// Storage
import storageRouter from "@routes/storageRoutes";

// System Settings
import {
  getSettings,
  updateSettings,
} from "@controllers/systemSettingsController";

// ===============================
// Middleware
// ===============================
import { requireRole as roles } from "@middleware/authorization";

// ===============================
// Initialize Router & Multer
// ===============================
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// ===============================
// Helper Middleware
// ===============================
const requireAdmin = roles(["ADMIN"]);

// ===============================
// Auth Routes
// ===============================
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/verify", verifyToken);
router.post("/auth/logout", logout);

// ===============================
// Order Routes
// ===============================
router.post("/orders/place", placeOrder); // any authenticated user
router.put("/orders/:id/refund", requireAdmin, refundOrder); // admin only

// ===============================
// Shipping Routes
// ===============================
router.post("/shipping/verify", verifyAddress);
router.post("/shipping/rates", getRates);
router.post("/shipping/track", trackShipment);

// ===============================
// Storage Routes (Admin Only)
// ===============================
router.use("/storage", storageRouter);

// ===============================
// System Settings Routes (Admin Only)
// ===============================
router.get("/settings/:scope", requireAdmin, getSettings);
router.put("/settings/:scope", requireAdmin, updateSettings);

export default router;
