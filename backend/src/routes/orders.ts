import { Router } from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "@controllers/orderController";
import { requireRole } from "@middleware/authorization";

const router = Router();

// Only admin can view all orders
router.get("/", requireRole(["admin"]), getOrders);

// Only the owner or admin can view a specific order
router.get("/:id", requireRole(["owner", "admin"]), getOrder);

// Authenticated users: Only admin or owner can create orders
router.post("/", requireRole(["owner", "admin"]), createOrder);

// Only the owner or admin can update their order
router.put("/:id", requireRole(["owner", "admin"]), updateOrder);

// Only admin can delete orders
router.delete("/:id", requireRole(["admin"]), deleteOrder);

export default router;
