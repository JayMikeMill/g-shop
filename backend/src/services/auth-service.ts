// @services/authService.ts
import { AuthAdapter } from "@adapters/auth/auth-interface";
import { User } from "@models/user";

export class AuthService {
	constructor(private authAdapter: AuthAdapter) {} // <-- pass adapter in

	async register(user: User, password: string): Promise<User> {
		return this.authAdapter.register(user, password);
	}

	async login(email: string, password: string) {
		return this.authAdapter.login(email, password);
	}

	async verify(token: string): Promise<User | null> {
		return this.authAdapter.verifyToken(token);
	}

	async logout(userId: string) {
		return this.authAdapter.logout(userId);
	}
}
