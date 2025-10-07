import { Request, Response, NextFunction } from "express";
import { OrderProcessingService } from "@services/OrdersProcessingService";

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payment, order } = req.body;
    const result = await OrderProcessingService.placeOrder(payment, order);
    res.json(result);
  } catch (err: any) {
    next(err);
  }
};

export const refundOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const result = await OrderProcessingService.refundOrder(id);
    res.json(result);
  } catch (err: any) {
    next(err);
  }
};
