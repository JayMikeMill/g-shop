import { AuthAdapter } from "./auth-interface";
import { User } from "@models/user";
import { getAuth } from "firebase-admin/auth";

const auth = getAuth();

export class FirebaseAuth implements AuthAdapter {
	async register(user: User, password: string): Promise<User> {
		const record = await auth.createUser({ uid: user.id, email: user.email, password });
		return { ...user, id: record.uid };
	}

	// Stub login to satisfy interface
	async login(email: string, password: string): Promise<{ token: string; user: User }> {
		// Firebase login is handled on the client, so we just return an empty user + token
		return {
			token: "", // no backend token
			user: { id: "", email } as User
		};
	}

	async verifyToken(token: string): Promise<User | null> {
		const decoded = await auth.verifyIdToken(token);
		return { id: decoded.uid, email: decoded.email || "" } as User;
	}

	async logout(userId: string) {
		// Revoke all refresh tokens for this user
		await auth.revokeRefreshTokens(userId);
	}
}
