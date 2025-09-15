import { Request, Response } from "express";
import { FirebaseDB } from "@adapters/db/firebase-db";
import { SquarePayment } from "@adapters/payment/square-payment";
import { OrderService } from "@services/order-service";

const db = new FirebaseDB();
const payment = new SquarePayment();
const orderService = new OrderService(db, payment);

// Create order
export const createOrder = async (req: Request, res: Response) => {
	try {
		const order = await orderService.createOrder(req.body);
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get single order
export const getOrder = async (req: Request, res: Response) => {
	try {
		const order = await orderService.getOrder(req.params.id);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get all orders (pagination)
export const getAllOrders = async (req: Request, res: Response) => {
	try {
		const limit = parseInt(req.query.limit as string) || 10;
		const startAfterId = req.query.startAfterId as string | undefined;
		const orders = await orderService.getAllOrders(limit, startAfterId);
		res.json(orders);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Update order
export const updateOrder = async (req: Request, res: Response) => {
	try {
		const updated = await orderService.updateOrder(req.params.id, req.body);
		if (!updated) return res.status(404).json({ error: "Order not found" });
		res.json(updated);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
	try {
		await orderService.deleteOrder(req.params.id);
		res.json({ message: "Order deleted" });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Pay for order
export const payOrder = async (req: Request, res: Response) => {
	try {
		const { orderId } = req.params;
		const { source } = req.body;
		const order = await orderService.payOrder(orderId, source);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
