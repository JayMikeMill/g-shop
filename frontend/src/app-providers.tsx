import { CartProvider } from '@contexts/cart-context';
import { AuthProvider } from '@contexts/auth-context';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}