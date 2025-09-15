import { User } from "@models/user";
import { DBAdapter } from "@adapters/db/db-adapter";
import { AuthAdapter } from "@adapters/auth/auth-adapter";

export class UserService {
	constructor(private db: DBAdapter, private auth: AuthAdapter) {}

	async register(user: User, password: string): Promise<User> {
		const createdUser = await this.auth.register(user, password);
		await this.db.createUser(createdUser);
		return createdUser;
	}

	async getUser(id: string): Promise<User | null> {
		return this.db.getUser(id);
	}

	async getAllUsers(limit?: number, startAfterId?: string): Promise<User[]> {
		return this.db.getAllUsers(limit, startAfterId); // Paginated fetch
	}

	async updateUser(id: string, update: Partial<User>): Promise<User | null> {
		return this.db.updateUser(id, update);
	}

	async deleteUser(id: string): Promise<void> {
		await this.db.deleteUser(id);
	}
}
