// ------------------------
// Import dependencies
// ------------------------
import express from "express";               // Minimal Node.js web server
import bodyParser from "body-parser";        // Parse JSON bodies
import dotenv from "dotenv";                 // Load environment variables
import cors from "cors";                     // Cross-origin requests
import SuperJSON from "superjson";           // BigInt-safe serialization]

import { SquareError } from "square";        // Square error handling

import { processPayment } from "./square-api";
import { type PaymentInfo } from "../shared/payment-info";

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
// Payment endpoint
// ------------------------

app.post("/api/square-pay-server", async (req, res) => {
	const paymentInfo = req.body as PaymentInfo;

    try {
		const serialized = await processPayment(paymentInfo);
		res.setHeader("Content-Type", "application/json");
		res.send(serialized.json);
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
    console.log("POST /api/square-pay-server is ready for Square payments");
});
