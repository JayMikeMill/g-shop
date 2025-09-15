import { Request, Response } from "express";
import { UserService } from "@services/user-service";
import { FirebaseDBAdapter } from "@adapters/db/firebase-db-adapter";
import { FirebaseAuthAdapter } from "@adapters/auth/firebase-auth-adapter";
import crypto from "crypto";

const db = new FirebaseDBAdapter();
const auth = new FirebaseAuthAdapter();
const userService = new UserService(db, auth);

// Create user (register)
export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const user = await userService.register({ id: crypto.randomUUID(), name, email }, password);
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get single user
export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await userService.getUser(req.params.id);
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
		const users = await userService.getAllUsers(limit, startAfterId);
		res.json(users);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
	try {
		const updated = await userService.updateUser(req.params.id, req.body);
		if (!updated) return res.status(404).json({ error: "User not found" });
		res.json(updated);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
	try {
		await userService.deleteUser(req.params.id);
		res.json({ message: "User deleted" });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
