// Import React functions
import type { Product, ProductVariant } from "@shared/types/Product";
import { createContext, useContext, useState, type ReactNode } from "react";

// Define the shape of a cart item
export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
}
// -------------------------
// 1. Define what the context will hold
// -------------------------
interface CartContextType {
  cart: CartItem[]; // The current cart items
  addToCart: (item: CartItem) => void; // Function to add items
  removeFromCart: (item: CartItem) => void; // Function to remove items
  clearCart: () => void; // Function to empty the cart
}

// -------------------------
// Create the context (magic backpack)
// -------------------------
const CartContext = createContext<CartContextType | undefined>(undefined);

// -------------------------
// Define the Provider component
// This will wrap your app/pages and provide cart state
// -------------------------
interface CartProviderProps {
  children: ReactNode; // Everything inside this provider
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // The cart state
  const [cart, setCart] = useState<CartItem[]>([]); // starts empty

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.product.id === item.product.id &&
          cartItem.variant?.id === item.variant?.id
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + (item.quantity || 1),
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            ...item,
            quantity: item.quantity || 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (c) =>
          c.product.id === item.product.id && c.variant?.id === item.variant?.id
      );
      if (existingIndex === -1) return prevCart;

      const updatedCart = [...prevCart];
      const quantityToRemove = item.quantity || 1;

      if (updatedCart[existingIndex].quantity > quantityToRemove) {
        updatedCart[existingIndex].quantity -= quantityToRemove;
        return updatedCart;
      } else {
        return prevCart.filter((_, i) => i !== existingIndex);
      }
    });
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Provide the cart + functions to children
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// -------------------------
// Custom hook to use the cart in any component
// -------------------------
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const getCartTotals = (cart: CartItem[]) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};
