// @services/authService.ts
import { auth } from "@adapters/services";
import { AuthApi } from "@shared/interfaces";
import { User } from "@shared/types";

export class AuthService implements AuthApi {
  async register(user: User, password: string): Promise<User> {
    return auth.register(user, password);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    return await auth.login(email, password);
  }

  async verify(token: string): Promise<User | null> {
    return auth.verifyToken(token);
  }

  async logout(userId: string) {
    return auth.logout(userId);
  }
}

export default new AuthService();
