import { CartProvider } from "@contexts/CartContext";
import { AuthContext } from "@contexts/auth/AuthContext";
import { useFirebaseAuth } from "@contexts/auth/useFirebaseAuth";
import { Provider } from "react-redux";
import { store } from "@app/store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const firebaseAuth = useFirebaseAuth();

  return (
    <Provider store={store}>
      <AuthContext provider={firebaseAuth}>
        <CartProvider>{children}</CartProvider>
      </AuthContext>
    </Provider>
  );
}
