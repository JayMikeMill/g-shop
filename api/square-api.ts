import dotenv from "dotenv";                 // Load environment variables
import crypto from "crypto";                 // For idempotency keys
import SuperJSON from "superjson";           // BigInt-safe serialization

import { SquareClient, SquareEnvironment, Square } from "square";
import { mapToSquareAddress } from "@shared/shipping-info"; // Shared type
import { type PaymentInfoSquare } from "@shared/payment-info";
import { log } from "console";
import path from "path";


// Load environment variables
// Load backend .env even if we run from project root
// Load the .env located in the same folder as this file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Initialize Square client
const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN as string,
    environment: SquareEnvironment.Sandbox
});

// --- Helper Function ---
export async function processPayment(paymentinfo: PaymentInfoSquare) {
    const { nonce, amount, orderItems, shipping } = paymentinfo;

	log("Processing payment with info:", paymentinfo);
	log("Using Square access token:", process.env.SQUARE_ACCESS_TOKEN);
	// Create the payment request
	const requestBody: Square.CreatePaymentRequest = {
		sourceId: nonce || "cnon:card-nonce-ok", // Sandbox default nonce
		idempotencyKey: crypto.randomUUID(), // Prevent duplicate charges
		amountMoney: {
			amount: BigInt(Math.round(amount * 100)), // Dollars → cents
			currency: "USD"
		},
		note: `Order with ${orderItems?.length || 0} items`,
		shippingAddress:  mapToSquareAddress(shipping)
	};

	console.log("Square request body:", requestBody);
	console.log("Payments:", client.payments);
	// Call Square API
	const response = await client.payments.create(requestBody);

	// Serialize safely
	return SuperJSON.serialize(response.payment);
}
