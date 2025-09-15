import { User } from "@models/user";
import { DBAdapter } from "@adapters/db/db-interface";
import { AuthAdapter } from "@adapters/auth/auth-interface";

// Services handle business logic and are completely modular
export class UserService {
	constructor(private db: DBAdapter, private auth: AuthAdapter) {}

	async register(user: User, password: string) {
		const createdUser = await this.auth.register(user, password);
		await this.db.createUser(createdUser);
		return createdUser;
	}

	async getUser(id: string) {
		return this.db.getUser(id);
	}
}
