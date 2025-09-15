import { User } from "@models/user";
import { db, auth } from "@config/adapters";

export class UserService {
	static async register(user: User, password: string): Promise<User> {
		const createdUser = await auth.register(user, password);
		await db.createUser(createdUser);
		return createdUser;
	}

	static async getUser(id: string): Promise<User | null> {
		return db.getUser(id);
	}

	static async getUsers(options?: { limit?: number; startAfterId?: string; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<User[]> {
		return db.getUsers(options);
	}

	static async updateUser(id: string, update: Partial<User>): Promise<User | null> {
		return db.updateUser(id, update);
	}

	static async deleteUser(id: string): Promise<void> {
		await db.deleteUser(id);
	}
}
