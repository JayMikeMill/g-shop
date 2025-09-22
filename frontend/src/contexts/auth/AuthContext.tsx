import { createContext, useContext, type ReactNode } from "react";
import type { AuthProvider } from "./AuthProvider";

const AuthProviderContext = createContext<AuthProvider | undefined>(undefined);

export function AuthContext({
  children,
  provider,
}: {
  children: ReactNode;
  provider: AuthProvider;
}) {
  return (
    <AuthProviderContext.Provider value={provider}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthProviderContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProviderWrapper");
  return ctx;
}
