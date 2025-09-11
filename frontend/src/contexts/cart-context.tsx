// Import React functions
import { createContext, useContext, 
    useState, type ReactNode} from "react"

// Import Product type
import type { Product, ProductOptions } from "@shared/product"
import { equalsProductOptions } from "@shared/product"

// Import CartItem type
import type { CartItem } from "@shared/CartItem"

// -------------------------
// 1. Define what the context will hold
// -------------------------
interface CartContextType {
	cart: CartItem[]                                      // The current cart items
	addToCart: (product: Product, options: ProductOptions) => void   // Function to add items
	removeFromCart: (item: CartItem) => void             // Function to remove items
	clearCart: () => void                                 // Function to empty the cart
}

// -------------------------
// Create the context (magic backpack)
// -------------------------
const CartContext = createContext<CartContextType | undefined>(undefined)

// -------------------------
// Define the Provider component
// This will wrap your app/pages and provide cart state
// -------------------------
interface CartProviderProps {
	children: ReactNode   // Everything inside this provider
}

export const CartProvider = ({ children }: CartProviderProps) => {
	// The cart state
	const [cart, setCart] = useState<CartItem[]>([]) // starts empty

	// Add item to cart
	const addToCart = (product: Product, options: ProductOptions) => {
		setCart(prevCart => {
			const existingIndex = prevCart.findIndex(
				item => item.id === product.id && equalsProductOptions(item.options, options)
			)

			if (existingIndex !== -1) {
				// Create a new array and copy the object being updated
				const updatedCart = [...prevCart]
				updatedCart[existingIndex] = {
					...updatedCart[existingIndex],
					quantity: updatedCart[existingIndex].quantity + 1
				}
				return updatedCart
			} else {
				return [...prevCart, { ...product, options, quantity: 1 }]
			}
		})
	}


	// Remove item from cart if quantity == 1, 
	// else decrease quantity
	const removeFromCart = (item: CartItem) => {
		setCart(prevCart => {
			const existingIndex = prevCart.findIndex(
				c => c.id === item.id && equalsProductOptions(c.options, item.options)
			)
			if (existingIndex === -1) return prevCart

			const updatedCart = [...prevCart]
			if (updatedCart[existingIndex].quantity > 1) {
				updatedCart[existingIndex].quantity -= 1
				return updatedCart
			} else {
				return prevCart.filter((_, i) => i !== existingIndex)
			}
		})
	}

	// Clear entire cart
	const clearCart = () => setCart([])

	// Provide the cart + functions to children
	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
			{children}
		</CartContext.Provider>
	)
}

// -------------------------
// Custom hook to use the cart in any component
// -------------------------
export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) throw new Error("useCart must be used within a CartProvider")
	return context
}


export const getCartTotals = (cart: CartItem[]) => {
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
	const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
	return { totalItems, totalPrice }
}