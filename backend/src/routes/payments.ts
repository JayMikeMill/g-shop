import express from "express";
import { processPayment, refundPayment } from "@controllers/payment-controller";
import { requireAuth, requireAdmin } from "@middleware/authorization";

const router = express.Router();

// POST /payments - process a payment (authenticated users)
router.post("/process", processPayment);

// POST /payments/refund - refund a payment (admin only)
router.post("/refund", requireAuth, requireAdmin, refundPayment);

export default router;
