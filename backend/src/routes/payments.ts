import express from "express";
import { processPayment, refundPayment } from "@controllers/payment-controller";
import { requireRole } from "@middleware/authorization";

const router = express.Router();

// POST /payments - process a payment (authenticated users)
router.post("/process", processPayment);

// POST /payments/refund - refund a payment (admin or owner only)
router.post("/refund", requireRole(["admin", "owner"]), refundPayment);

export default router;
