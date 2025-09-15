import { Router } from "express";
import { createOrder, getOrder, getAllOrders, updateOrder, deleteOrder } from "@controllers/order-controller";
import { requireAuth, requireAdmin, requireOwner } from "@middleware/authorization";

const router = Router();

// Public: Anyone can view all orders or a specific order (customize as needed)
router.get("/", getAllOrders);
router.get("/:id", getOrder);

// Authenticated users: Only logged-in users can create orders
router.post("/", requireAuth, createOrder);

// Only the owner can update their order, or admin (add admin logic in controller if needed)
router.put("/:id", requireAuth, requireOwner, updateOrder);

// Only admin can delete orders
router.delete("/:id", requireAuth, requireAdmin, deleteOrder);

export default router;
