import { Request, Response } from "express";
import { AuthService } from "@services/auth-service";
import { FirebaseAuthAdapter } from "@adapters/auth/firebase-auth-adapter";


// Create the adapter
const firebaseAdapter = new FirebaseAuthAdapter();

// Inject it into AuthService
const authService = new AuthService(firebaseAdapter);

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const user = await authService.register(
			{ id: crypto.randomUUID(), name, email },
			password
		);
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const login = async (req: Request, res: Response) => {
	res.status(200).json({ message: "Firebase login is client-side" });
};

export const verifyToken = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) return res.status(401).json({ error: "No token provided" });
		const user = await authService.verify(token);
		if (!user) return res.status(401).json({ error: "Invalid token" });
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};


// New logout controller
export const logout = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) return res.status(401).json({ error: "No token provided" });

		const user = await authService.verify(token);
		if (!user) return res.status(401).json({ error: "Invalid token" });

		await authService.logout(user.id);
		res.json({ message: "User logged out" });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
