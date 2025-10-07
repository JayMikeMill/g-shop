import express from "express";

import {
  placeOrder,
  refundOrder,
} from "@controllers/orderProcessingController";

import { requireRole } from "@middleware/authorization";

const router = express.Router();

// Place order - any authenticated user
router.post("/place", placeOrder);

// Refund order - only admin
router.put("/:id/refund", requireRole(["ADMIN"]), refundOrder);

export default router;
