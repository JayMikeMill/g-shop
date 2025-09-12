// Import custom cart hook and helper function for totals
import { useCart, getCartTotals } from "@contexts/cart-context";

// Import CSS styles specific to the order preview
import "@css/order-preview.css";

// The OrderPreview component displays a summary of the current cart items
export default function OrderPreview() {
	// Get cart state from the cart context
	const { cart } = useCart();

	// Calculate total items and total price in the cart
	const totals = getCartTotals(cart);

	// If the cart is empty, show a simple message
	if (cart.length === 0) {
		return (
			<div className="order-preview">
				<p>Your cart is empty.</p>
			</div>
		);
	}

	// Main order summary when cart has items
	return (
		<div className="order-preview">
			<h3>Order Summary</h3>

			{/* List of cart items */}
			<div className="order-items">
				{cart.map((item, index) => (
					<div className="order-item" key={index}>
						{/* Product image */}
						<img src={item.images[0]} alt={item.name} className="order-item-image" />

						{/* Product details */}
						<div className="order-item-info">
							<h4>{item.name}</h4>
							<p>Size: {item.options.size}</p>
							<p>Price: ${item.price.toFixed(2)}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					</div>
				))}
			</div>

			{/* Totals summary */}
			<div className="order-summary">
				<p>Total Items: {totals.totalItems}</p>
				<p>Subtotal: ${totals.totalPrice.toFixed(2)}</p>
			</div>
		</div>
	);
}
