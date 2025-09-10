import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"

// Vite public environment variables
const SQUARE_APPLICATION_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID || ""
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || ""

// Full shipping address type
interface ShippingAddress {
	name: string
	email: string
	phone: string
	line1: string
	line2: string
	city: string
	state: string
	postalCode: string
	country: string
}

declare global {
    interface Window {
 	   Square?: any;
    }
}

// CheckoutForm component
export default function CheckoutForm() {
	// ------------------------
	// Cart & totals
	// ------------------------
	const { cart: cartItems } = useCart()

	// ------------------------
	// State
	// ------------------------
	const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
		name: "",
		email: "",
		phone: "",
		line1: "",
		line2: "",
		city: "",
		state: "",
		postalCode: "",
		country: ""
	})
	const [shippingCost, setShippingCost] = useState(0)
	const [total, setTotal] = useState(0)
	const [nonce, setNonce] = useState<string | null>(null)
	const [cardInstance, setCardInstance] = useState<any>(null)

	// ------------------------
	// Calculate totals whenever cart or shipping changes
	// ------------------------
	useEffect(() => {
		const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
		setTotal(subtotal + shippingCost)
	}, [cartItems, shippingCost])

	// ------------------------
	// Example flat shipping calculation
	// You could replace this with real logic later
	// ------------------------
	useEffect(() => {
		if (shippingAddress.postalCode) {
			setShippingCost(5) // flat $5 shipping
		} else {
			setShippingCost(0)
		}
	}, [shippingAddress])

	// ------------------------
	// Initialize Square Card
	// ------------------------
	useEffect(() => {
		async function initializeSquare() {
			if (!window.Square) return console.error("Square.js not loaded");
			console.log("Initializing Square card...");
			try {
				const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
				const card = await payments.card();
				await card.attach("#card-container");
				setCardInstance(card);
				console.log("Card instance ready", card);
			} catch (err) {
				console.error("Square card init error:", err);
			}
		}
		initializeSquare();
	}, []);

	// ------------------------
	// Generate Payment Method (nonce)
	// ------------------------
	const handleGenerateNonce = async () => {
		if (!cardInstance) return alert("Payment form not ready yet")
		try {
			const result = await cardInstance.tokenize()
			if (result.status === "OK") {
				setNonce(result.token)
				alert("Payment method ready!")
			} else {
				alert("Payment info invalid: " + (result.errors?.map((e: any) => e.message).join(", ") || ""))
			}
		} catch (err) {
			console.error("Tokenization error:", err)
		}
	}

	// ------------------------
	// Handle final payment
	// ------------------------
	const handlePayment = async () => {
		
		if (!nonce) {
			alert("Please generate a payment method first")
			return
		}

			// Convert country to ISO 2-letter code
		const countryCodeMap: Record<string, string> = {
			"United States": "US",
			"Canada": "CA",
			"Mexico": "MX",
			// add more as needed
		}

		const shippingWithISO = {
			...shippingAddress,
			country: countryCodeMap[shippingAddress.country] || shippingAddress.country
		}
		
		try {
			const response = await fetch("http://localhost:4000/api/pay", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					nonce,
					amount: total,
					orderItems: cartItems,
					shipping: shippingWithISO
				})
			})

			const data = await response.json()

			if (data.status === "COMPLETED") {
				alert("Payment successful! Order ID: " + data.orderId)
			} else {
				alert("Payment failed: " + data.error)
			}
		} catch (err) {
			console.error("Payment error:", err)
			alert("Payment could not be processed")
		}
	}

	// ------------------------
	// Render
	// ------------------------
	return (
		<div className="checkout-form" style={{ maxWidth: 600, margin: "0 auto" }}>
			<h2>Checkout</h2>

			{/* Shipping Information */}
			<div style={{ marginBottom: 20 }}>
				<h3>Shipping Information</h3>

				<label>
					Name:
					<input
						type="text"
						value={shippingAddress.name}
						onChange={e => setShippingAddress({ ...shippingAddress, name: e.target.value })}
					/>
				</label>

				<label>
					Email:
					<input
						type="email"
						value={shippingAddress.email}
						onChange={e => setShippingAddress({ ...shippingAddress, email: e.target.value })}
					/>
				</label>

				<label>
					Phone:
					<input
						type="tel"
						value={shippingAddress.phone}
						onChange={e => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
					/>
				</label>

				<label>
					Address Line 1:
					<input
						type="text"
						value={shippingAddress.line1}
						onChange={e => setShippingAddress({ ...shippingAddress, line1: e.target.value })}
					/>
				</label>

				<label>
					Address Line 2:
					<input
						type="text"
						value={shippingAddress.line2}
						onChange={e => setShippingAddress({ ...shippingAddress, line2: e.target.value })}
					/>
				</label>

				<label>
					City:
					<input
						type="text"
						value={shippingAddress.city}
						onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
					/>
				</label>

				<label>
					State / Province:
					<input
						type="text"
						value={shippingAddress.state}
						onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })}
					/>
				</label>

				<label>
					Postal Code:
					<input
						type="text"
						value={shippingAddress.postalCode}
						onChange={e => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
					/>
				</label>

				<label>
					Country:
					<input
						type="text"
						value={shippingAddress.country}
						onChange={e => setShippingAddress({ ...shippingAddress, country: e.target.value })}
					/>
				</label>
			</div>

			{/* Payment Section */}
			<div style={{ marginBottom: 20 }}>
				<h3>Payment</h3>
				<div
					id="card-container"
					style={{
						marginBottom: 10,
						height: 50, // ensure card is visible
						border: "1px solid #ccc",
						borderRadius: 4
					}}
				></div>
				<button onClick={handleGenerateNonce} style={{ padding: "8px 16px", fontSize: 14 }}>
					Generate Payment Method
				</button>
				<p>Total: ${total.toFixed(2)}</p>
			</div>

			{/* Final Pay Button */}
			<button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: 16 }}>
				Pay Now
			</button>
		</div>
	)
}
