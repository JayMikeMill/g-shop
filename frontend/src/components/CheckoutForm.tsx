import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { type ShippingAddress } from "../../../shared/shipping-address"

// Example country code map
const countryCodeMap: Record<string, string> = {
	"US": "US",
	"Canada": "CA",
	"Mexico": "MX"
}

// Vite public environment variables
const SQUARE_APPLICATION_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID || ""
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || ""

declare global {
	interface Window {
		Square?: any
	}
}

export default function CheckoutForm() {
	const { cart: cartItems } = useCart()

	const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		addressLine1: "",
		addressLine2: "",
		city: "",
		state: "",
		postalCode: "",
		country: "US"
	})

	const [shippingCost, setShippingCost] = useState(0)
	const [total, setTotal] = useState(0)
	const [nonce, setNonce] = useState<string | null>(null)
	const [cardInstance, setCardInstance] = useState<any>(null)

	// Calculate totals
	useEffect(() => {
		const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
		setTotal(subtotal + shippingCost)
	}, [cartItems, shippingCost])

	// Flat shipping
	useEffect(() => {
		setShippingCost(shippingAddress.postalCode ? 5 : 0)
	}, [shippingAddress])

	// Initialize Square Card
	useEffect(() => {
		async function initializeSquare() {
			if (!window.Square) return console.error("Square.js not loaded")
			try {
				const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID)
				const card = await payments.card()
				await card.attach("#card-container")
				setCardInstance(card)
			} catch (err) {
				console.error("Square card init error:", err)
			}
		}
		initializeSquare()
	}, [])

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

	const handlePayment = async () => {
		if (!nonce) return alert("Please generate a payment method first")

		// Map country to ISO code
		const shippingWithISO = {
			...shippingAddress,
			country: countryCodeMap[shippingAddress.country] || shippingAddress.country
		}

		try {
			const response = await fetch("http://localhost:4000/api/square-pay", {
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

	return (
		<div className="checkout-form" style={{ maxWidth: 600, margin: "0 auto" }}>
			<h2>Checkout</h2>

			{/* Shipping Information */}
			<div style={{ marginBottom: 20 }}>
				<h3>Shipping Information</h3>

				<label>
					First Name:
					<input
						type="text"
						value={shippingAddress.firstName}
						onChange={e => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
					/>
				</label>

				<label>
					Last Name:
					<input
						type="text"
						value={shippingAddress.lastName}
						onChange={e => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
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
						value={shippingAddress.addressLine1}
						onChange={e => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
					/>
				</label>

				<label>
					Address Line 2:
					<input
						type="text"
						value={shippingAddress.addressLine2 ?? ""}
						onChange={e => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
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
					<select
						value={shippingAddress.country}
						onChange={e => setShippingAddress({ ...shippingAddress, country: e.target.value })}
					>
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="MX">Mexico</option>
					</select>
				</label>
			</div>

			{/* Payment Section */}
			<div style={{ marginBottom: 20 }}>
				<h3>Payment</h3>
				<div
					id="card-container"
					style={{
						marginBottom: 10,
						height: 50,
						border: "1px solid #ccc",
						borderRadius: 4
					}}
				></div>
				<button onClick={handleGenerateNonce} style={{ padding: "8px 16px", fontSize: 14 }}>
					Generate Payment Method
				</button>
				<p>Total: ${total.toFixed(2)}</p>
			</div>

			<button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: 16 }}>
				Pay Now
			</button>
		</div>
	)
}
