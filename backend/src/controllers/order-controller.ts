import { Request, Response } from "express";
import { OrderService } from "@services/order-service";


// Create order
export const createOrder = async (req: Request, res: Response) => {
	try {
		const order = await OrderService.createOrder(req.body);
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get single order
export const getOrder = async (req: Request, res: Response) => {
	try {
		const order = await OrderService.getOrder(req.params.id);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.json(order);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get all orders (pagination)
export const getOrders = async (req: Request, res: Response) => {
	try {
		const options: any = {};
		if (req.query.limit) options.limit = parseInt(req.query.limit as string);
		if (req.query.startAfterId) options.startAfterId = req.query.startAfterId as string;
		if (req.query.sortBy) options.sortBy = req.query.sortBy as string;
		if (req.query.sortOrder) options.sortOrder = req.query.sortOrder as "asc" | "desc";
		const orders = await OrderService.getOrders(options);
		res.json(orders);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Update order
export const updateOrder = async (req: Request, res: Response) => {
	try {
		const updated = await OrderService.updateOrder(req.params.id, req.body);
		if (!updated) return res.status(404).json({ error: "Order not found" });
		res.json(updated);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
	try {
		await OrderService.deleteOrder(req.params.id);
		res.json({ message: "Order deleted" });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
