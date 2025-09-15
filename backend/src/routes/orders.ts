import { Router } from "express";
import { createOrder, getOrder, getOrders, updateOrder, deleteOrder } from "@controllers/order-controller";
import { requireAuth, requireAdmin, requireOwner } from "@middleware/authorization";

const router = Router();

// Only admin can view all orders
router.get("/", requireAuth, requireAdmin, getOrders);

// Only the owner or admin can view a specific order
router.get("/:id", requireAuth, (req, res, next) => {
  // If admin, allow; otherwise, require owner
  if (req.user?.role === "admin") return next();
  return requireOwner(req, res, next);
}, getOrder);

// Authenticated users: Only logged-in users can create orders
router.post("/", requireAuth, createOrder);

// Only the owner can update their order, or admin
router.put("/:id", requireAuth, (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return requireOwner(req, res, next);
}, updateOrder);

// Only admin can delete orders
router.delete("/:id", requireAuth, requireAdmin, deleteOrder);

export default router;
