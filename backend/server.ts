// ------------------------
// Import dependencies
// ------------------------
import express from "express";               // Minimal Node.js web server
import bodyParser from "body-parser";        // Parse JSON bodies
import dotenv from "dotenv";                 // Load environment variables
import crypto from "crypto";                 // For idempotency keys
import cors from "cors";                     // Cross-origin requests
import SuperJSON from "superjson";           // BigInt-safe serialization
import { SquareClient, SquareEnvironment, Square, SquareError } from "square";
import { log } from "console";

// ------------------------
// Load environment variables
// ------------------------
dotenv.config();

// ------------------------
// Initialize Express app
// ------------------------
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}));
app.use(bodyParser.json());

// ------------------------
// Initialize Square client
// ------------------------
const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN as string,
    environment: SquareEnvironment.Sandbox
});

// ------------------------
// Payment endpoint
// ------------------------
app.post("/api/pay", async (req, res) => {
    // Extract frontend data
    const { nonce, amount, orderItems, shipping } = req.body as {
        nonce: string;
        amount: number;
        orderItems: { name: string; price: number; quantity: number }[];
        shipping?: {
            line1: string;
            line2?: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        };
    };

    try {
        // Map shipping data to Square format if provided
        const squareShipping: Square.Address | undefined = shipping
            ? {
                addressLine1: shipping.line1,
                addressLine2: shipping.line2,
                locality: shipping.city,
                administrativeDistrictLevel1: shipping.state,
                postalCode: shipping.postalCode,
                country: shipping.country as Square.Country 
            }
            : undefined;

        // Create the payment request
        const requestBody: Square.CreatePaymentRequest = {
            sourceId: nonce || "cnon:card-nonce-ok",       // Sandbox default nonce
            idempotencyKey: crypto.randomUUID(),          // Prevent duplicate charges
            amountMoney: {
                amount: BigInt(Math.round(amount * 100)), // Dollars → cents
                currency: "USD"
            },
            note: `Order with ${orderItems?.length || 0} items`,
            shippingAddress: squareShipping
        };

        console.log("Square request body:", requestBody);

        // Call Square API
        const response = await client.payments.create(requestBody);

        // Serialize the response safely using SuperJSON
        const serialized = SuperJSON.serialize(response.payment);

        res.setHeader("Content-Type", "application/json");
        res.send(serialized.json); // BigInt safely converted to string
	
	} catch (error) {
        if (error instanceof SquareError) {
            console.error("Square API error:", error.body);
            const serialized = SuperJSON.serialize({ error: error.body });
            res.status(500).send(serialized.json);
        } else {
            console.error("Unexpected error:", error);
            const serialized = SuperJSON.serialize({ error: "Unexpected error" });
            res.status(500).send(serialized.json);
        }
    }
});

// ------------------------
// Start server
// ------------------------
const PORT = 4000;
app.listen(PORT, () => {
    console.log("Square token loaded:", process.env.SQUARE_ACCESS_TOKEN);
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("POST /api/pay is ready for Square payments");
});
