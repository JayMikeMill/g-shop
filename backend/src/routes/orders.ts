import { Router } from "express";
import { createOrder, getOrder, getAllOrders, 
    updateOrder, deleteOrder } from "@controllers/order-controller";

const router = Router();

// Create a new order
router.post("/", createOrder);

// Get an order by ID
router.get("/:id", getOrder);

// Get all orders (pagination: ?limit=10&startAfterId=xyz)
router.get("/", getAllOrders);

// Update order by ID
router.put("/:id", updateOrder);

// Delete order by ID
router.delete("/:id", deleteOrder);

export default router;
