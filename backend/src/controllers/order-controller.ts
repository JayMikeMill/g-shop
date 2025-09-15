import { Request, Response } from "express";
import { FirebaseDB } from "@adapters/db/firebase-db";
import { SquarePayment } from "@adapters/payment/square-payment";
import { OrderService } from "@services/order-service";

const db = new FirebaseDB();
const payment = new SquarePayment();
const orderService = new OrderService(db, payment);

export const createOrder = async (req: Request, res: Response) => {
	try {
		const order = await orderService.createOrder(req.body);
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getOrder = async (req: Request, res: Response) => {
	try {
		const order = await orderService.getOrder(req.params.id);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const payOrder = async (req: Request, res: Response) => {
	try {
		const { orderId } = req.params;
		const { source } = req.body; // payment source from frontend
		const order = await orderService.payOrder(orderId, source);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
