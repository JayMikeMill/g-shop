import { useEffect, useState } from "react"
import { type ShippingAddress } from "../../../shared/shipping-address"
import { type CartItem } from "../context/cart-context"
import "../css/payment-form.css"

const SQUARE_APPLICATION_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID || ""
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || ""
const SQUARE_PAY_SERVER = false
const SQUARE_PAY_API_URL = SQUARE_PAY_SERVER ? 
  "http://localhost:4000/api/square-pay-server" : 
  "/api/square-pay"

declare global {
  interface Window { Square?: any }
}

interface PaymentFormProps {
  total: number
  cartItems: CartItem[]
  shippingAddress: ShippingAddress
  setLoading: (loading: boolean) => void
  setMessage: (msg: string | null) => void
}

export default function PaymentForm(
  { total, cartItems, shippingAddress, setLoading, setMessage }: PaymentFormProps
) {
  const [cardInstance, setCardInstance] = useState<any>(null)
  const countryCodeMap: Record<string, string> = { US: "US", Canada: "CA", MX: "MX" }

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
      if (result.status === "OK") return result.token
      alert("Payment info invalid: " + (result.errors?.map((e: any) => e.message).join(", ") || ""))
      return null
    } catch (err) {
      console.error("Tokenization error:", err)
      return null
    }
  }

  const handlePayment = async () => {
    const nonce = await handleGenerateNonce()
    if (!nonce) return alert("Please generate a payment method first")

    const shippingWithISO = { ...shippingAddress, country: countryCodeMap[shippingAddress.country] || shippingAddress.country }

    try {
      setLoading(true)
      const response = await fetch(SQUARE_PAY_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nonce, amount: total, orderItems: cartItems, shipping: shippingWithISO })
      })

      const data = await response.json()

      if (data.status === "COMPLETED") 
		setMessage("Payment successful! Order ID: " + data.orderId)
      else 
		setMessage("Payment failed: " + data.error)

    } catch (err) {
      console.error("Payment error:", err)
      setMessage("Payment could not be processed")
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

return (
	<div className="payment-form">
		<h3>Payment</h3>
		<p>Total: ${total.toFixed(2)}</p>
		<div id="card-container" className="card-container"></div>
		<button onClick={handlePayment}>Pay Now</button>
	</div>
  )
}
