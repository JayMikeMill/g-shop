// Import React Router hook for navigation between pages
import { useNavigate } from "react-router-dom";

// Import your custom cart context hooks and helper functions
import { useCart, getCartTotals } from "@contexts/cart-context";

// Import CSS styles specific to the cart preview
import "@css/cart-preview.css";

// The CartPreview component displays the user's cart items and actions
export default function CartPreview() {
	// Hook to programmatically navigate between routes
	const navigate = useNavigate();

	// Get cart state and actions from the cart context
	const { cart, addToCart, removeFromCart, clearCart } = useCart();

	// Calculate total items and total price using helper function
	const totals = getCartTotals(cart);

	// If the cart is empty, display a message and a button to continue shopping
	if (cart.length === 0) {
		return (
			<div className="cart-preview">
				<h2>Your cart is empty</h2>
				<button onClick={() => navigate("/")}>Continue Shopping</button>
			</div>
		);
	}

	// Main cart display when there are items
	return (
		<div className="cart-preview">
			<h2>Your Cart</h2>

			{/* List of cart items */}
			<div className="cart-items">
				{cart.map((item, index) => (
					<div className="cart-item" key={index}>
						{/* Product image */}
						<img src={item.image} alt={item.name} className="cart-item-image" />

						{/* Product info */}
						<div className="cart-item-info">
							<h3>{item.name}</h3>
							<p>Size: {item.options.size}</p>
							<p>Price: ${item.price}</p>

							{/* Quantity controls */}
							<div className="quantity-controls">
								<button onClick={() => removeFromCart(item)}>-</button>
								<span>{item.quantity}</span>
								<button onClick={() => addToCart(item, item.options)}>+</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Cart totals summary */}
			<div className="cart-summary">
				<p>Total Items: {totals.totalItems}</p>
				<p>Total Price: ${totals.totalPrice.toFixed(2)}</p>
			</div>

			{/* Cart actions: clear cart or proceed to checkout */}
			<div className="cart-actions">
				<button onClick={clearCart}>Clear Cart</button>
				<button onClick={() => navigate("/checkout")}>Pay Now</button>
			</div>
		</div>
	);
}
