import { CartProvider } from "@contexts/CartContext";
import { AuthContext } from "@contexts/auth/AuthContext";
import { useFirebaseAuth } from "@contexts/auth/useFirebaseAuth";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const firebaseAuth = useFirebaseAuth();

  return (
    <AuthContext provider={firebaseAuth}>
      <CartProvider>{children}</CartProvider>
    </AuthContext>
  );
}
