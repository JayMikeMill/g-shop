// @services/authService.ts
import { auth } from "@config/adapters";
import { User } from "@my-store/shared";

export class AuthService {
  static async register(user: User, password: string): Promise<User> {
    return auth.register(user, password);
  }

  static async login(email: string, password: string) {
    return auth.login(email, password);
  }

  static async verify(token: string): Promise<User | null> {
    return auth.verifyToken(token);
  }

  static async logout(userId: string) {
    return auth.logout(userId);
  }
}
