import { Request, Response } from "express";
import { UserService } from "@services/user-service";
import { FirebaseDB } from "@adapters/db/firebase-db";
import { FirebaseAuth } from "@adapters/auth/firebase-auth";

// Create a modular instance
const db = new FirebaseDB();
const auth = new FirebaseAuth();
const userService = new UserService(db, auth);

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const user = await userService.register({ id: crypto.randomUUID(), name, email }, password);
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await userService.getUser(req.params.id);
		if (!user) return res.status(404).json({ error: "User not found" });
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
