import { User } from "@my-store/shared/types";

export interface AuthAdapter {
  register(user: User, password: string): Promise<User>;
  login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }>;
  verifyToken(token: string): Promise<User | null>;
  logout(userId: string, token?: string): Promise<void>;
}
