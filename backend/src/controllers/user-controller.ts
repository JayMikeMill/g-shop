import { Request, Response } from "express";
import { UserService } from "@services/user-service";


// Create user (register)
export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const user = await UserService.register({ id: crypto.randomUUID(), name, email }, password);
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get single user
export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await UserService.getUser(req.params.id);
		if (!user) return res.status(404).json({ error: "User not found" });
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get all users (supports pagination)
export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const limit = parseInt(req.query.limit as string) || 10;
		const startAfterId = req.query.startAfterId as string | undefined;
		const users = await UserService.getAllUsers(limit, startAfterId);
		res.json(users);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
	try {
		const updated = await UserService.updateUser(req.params.id, req.body);
		if (!updated) return res.status(404).json({ error: "User not found" });
		res.json(updated);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
	try {
		await UserService.deleteUser(req.params.id);
		res.json({ message: "User deleted" });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
