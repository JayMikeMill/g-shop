import { ProductsProvider } from "@contexts/products-context";
import { UsersProvider } from "@contexts/users-context";
import { OrdersProvider } from "@contexts/orders-context";
import { PaymentsProvider } from "@contexts/payments-context";
import { CartProvider } from '@contexts/cart-context';
import { AuthProvider } from '@contexts/auth-context';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProductsProvider>
          <OrdersProvider>
            <PaymentsProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </PaymentsProvider>
          </OrdersProvider>
        </ProductsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}