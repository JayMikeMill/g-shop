import { useEffect, useState } from "react"
import { type ShippingAddress } from "../../../shared/shipping-address"
import { type CartItem } from "../context/CartContext"

const SQUARE_APPLICATION_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID || ""
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || ""

declare global {
	interface Window {
		Square?: any
	}
}

interface PaymentFormProps {
	total: number
	cartItems: CartItem[]
	shippingAddress: ShippingAddress
}

export default function PaymentForm({ total, cartItems, shippingAddress }: PaymentFormProps) {
	const [cardInstance, setCardInstance] = useState<any>(null)

	const countryCodeMap: Record<string, string> = {
		US: "US",
		Canada: "CA",
		MX: "MX"
	}

	useEffect(() => {
		async function initializeSquare() {
			if (!window.Square) return console.error("Square.js not loaded")
			try {
				const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID)
				const card = await payments.card()
				document.getElementById("card-container")!.innerHTML = ""
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
				return result.token
			} else {
				alert("Payment info invalid: " + (result.errors?.map((e: any) => e.message).join(", ") || ""))
                return null
            }
		} catch (err) {
			console.error("Tokenization error:", err)
            return null
		}
	}

	const handlePayment = async () => {
        const nonce = await handleGenerateNonce()

		if (!nonce) return alert("Please generate a payment method first")

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
		<div style={{ marginBottom: 20 }}>
			<h3>Payment</h3>
			<div
				id="card-container"
				style={{ marginBottom: 10, height: 50, border: "1px solid #ccc", borderRadius: 4 }}
			></div>
			<p>Total: ${total.toFixed(2)}</p>
			<button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: 16 }}>
				Pay Now
			</button>
		</div>
	)
}
