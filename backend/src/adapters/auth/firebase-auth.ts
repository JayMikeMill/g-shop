import { AuthAdapter } from "./auth-interface";
import { User } from "@models/user";
import { getAuth } from "firebase-admin/auth";

const auth = getAuth();

export class FirebaseAuth implements AuthAdapter {
	async register(user: User, password: string): Promise<User> {
		const record = await auth.createUser({ uid: user.id, email: user.email, password });
		return { ...user, id: record.uid };
	}

	async login(email: string, password: string) {
		return {"token", "user"};
		
		// Firebase client SDK handles login; backend could verify custom tokens
		throw new Error("Login handled on client-side with Firebase SDK");
		
	} 

	async verifyToken(token: string): Promise<User | null> {
		const decoded = await auth.verifyIdToken(token);
		return { id: decoded.uid, email: decoded.email || "" } as User;
	}
}
