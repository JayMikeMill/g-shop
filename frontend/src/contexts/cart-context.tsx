// Import React functions
import { createContext, useContext, useState, type ReactNode } from "react";

// Import Product type
import { equalProductOptions, type Product } from "@models/product";

// Import StoreItem type
import type { OrderItem } from "@models/order";

// -------------------------
// 1. Define what the context will hold
// -------------------------
interface CartContextType {
  cart: OrderItem[]; // The current cart items
  addToCart: (item: OrderItem) => void; // Function to add items
  removeFromCart: (item: OrderItem) => void; // Function to remove items
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
  const [cart, setCart] = useState<OrderItem[]>([]); // starts empty

  // Add item to cart
  const addToCart = (item: OrderItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id && equalProductOptions(cartItem, item)
      );

      if (existingIndex !== -1) {
        // Create a new array and copy the object being updated
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // Ensure selectedOptions is provided for StoreItem
        return [
          ...prevCart,
          {
            ...item,
            quantity: 1,
          },
        ];
      }
    });
  };

  // Remove item from cart if quantity == 1,
  // else decrease quantity
  const removeFromCart = (item: OrderItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (c) => c.id === item.id && equalProductOptions(c, item)
      );
      if (existingIndex === -1) return prevCart;

      const updatedCart = [...prevCart];
      if (updatedCart[existingIndex].quantity > 1) {
        updatedCart[existingIndex].quantity -= 1;
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

export const getCartTotals = (cart: OrderItem[]) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};
