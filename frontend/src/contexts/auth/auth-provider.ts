import type { User } from "@models/user";

// auth-provider.ts
export interface AuthProvider {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
