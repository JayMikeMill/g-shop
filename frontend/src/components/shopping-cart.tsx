// Import React Router hook for navigation between pages
import { useNavigate } from "react-router-dom";

// Import your custom cart context hooks and helper functions
import { useCart, getCartTotals } from "@contexts/cart-context";

// Import CSS styles specific to the shopping cart
import "@css/shopping-cart.css";

// The ShoppingCart component displays the user's cart items and actions
export default function ShoppingCart() {
	// Hook to programmatically navigate between routes
	const navigate = useNavigate();

	// Get cart state and actions from the cart context
	const { cart, addToCart, removeFromCart, clearCart } = useCart();

	// Calculate total items and total price using helper function
	const totals = getCartTotals(cart);

	// If the cart is empty, display a message and a button to continue shopping
	if (cart.length === 0) {
		return (
			<div className="shopping-cart empty-cart">
				<h2>Your Shopping Cart is Empty</h2>
				<p>Looks like you haven't added any items to your cart yet.</p>
				<button className="btn btn-primary" onClick={() => navigate("/")}>
					Continue Shopping
				</button>
			</div>
		);
	}

	// Main cart display when there are items
	return (
		<div className="shopping-cart">
			<div className="cart-header">
				<h1>Shopping Cart</h1>
				<button className="clear-cart-btn" onClick={clearCart}>
					Clear Cart
				</button>
			</div>

			{/* List of cart items */}
			<div className="cart-items-container">
				{cart.map((item, index) => (
					<div className="cart-item-card" key={index}>
						<div className="item-image">
							<img src={item.images[0].thumbnail} alt={item.name} />
						</div>
						<div className="item-details">
							<h3>{item.name}</h3>
							<p className="item-option">Size: {item.options.size}</p>
							<p className="item-price">${item.price.toFixed(2)}</p>
						</div>
						<div className="item-quantity">
							<button onClick={() => removeFromCart(item)}>-</button>
							<span>{item.quantity}</span>
							<button onClick={() => addToCart(item, item.options)}>+</button>
						</div>
						<div className="item-total">
							<p>${(item.price * item.quantity).toFixed(2)}</p>
						</div>
					</div>
				))}
			</div>

			{/* Cart totals and checkout */}
			<div className="cart-footer">
				<div className="cart-summary">
					<div className="summary-row">
						<span className="summary-label">Subtotal</span>
						<span className="summary-value">${totals.totalPrice.toFixed(2)}</span>
					</div>
					<div className="summary-row">
						<span className="summary-label">Shipping</span>
						<span className="summary-value">FREE</span>
					</div>
					<div className="summary-row total-row">
						<span className="summary-label">Total</span>
						<span className="summary-value">${totals.totalPrice.toFixed(2)}</span>
					</div>
				</div>
				<button className="btn btn-primary checkout-btn" onClick={() => navigate("/checkout")}>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
}
