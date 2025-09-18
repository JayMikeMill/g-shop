import { CartProvider } from "@contexts/cart-context";
import { AuthContext } from "@contexts/auth/auth-context";
import { useFirebaseAuth } from "@contexts/auth/firebase-auth-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const firebaseAuth = useFirebaseAuth();

  return (
    <AuthContext provider={firebaseAuth}>
      <CartProvider>{children}</CartProvider>
    </AuthContext>
  );
}
