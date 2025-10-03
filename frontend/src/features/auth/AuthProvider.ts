import type { User } from "@my-store/shared/types";

// auth-provider.ts
export interface AuthProvider {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}
