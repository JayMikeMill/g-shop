import { Router } from "express";
import { createOrder, getOrder, payOrder } from "@controllers/order-controller";

const router = Router();

router.post("/", createOrder);       // create a new order
router.get("/:id", getOrder);        // get order details
router.post("/:orderId/pay", payOrder); // pay for an order

export default router;
