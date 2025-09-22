import { Request, Response, NextFunction } from "express";
import { PaymentService } from "@services/PaymentService";

// POST /payments
export async function processPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const paymentData = req.body;
    const result = await PaymentService.processPayment(paymentData);
    res.status(200).json({ payment: result });
  } catch (err) {
    next(err);
  }
}

// POST /payments/refund
export async function refundPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { paymentId, amount } = req.body;
    const result = await PaymentService.refundPayment(paymentId, amount);
    res.status(200).json({ success: result });
  } catch (err) {
    next(err);
  }
}
