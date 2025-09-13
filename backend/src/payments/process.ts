// src/payments.ts
import { Request, Response } from "express";
import SuperJSON from "superjson";

import { PaymentData } from "./payment-data";
import { processPayment } from "./square";
import { SquareError } from "square";

import { log } from "console";

/**
 * Handles an HTTP request for processing a Square payment.
 * Can be mounted on any Express server or serverless platform.
 */
export async function handlePayment(req: Request, res: Response) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const data = req.body as PaymentData;

	log("Received payment info:", data);

	try {
		const serialized = await processPayment(data);
		res.setHeader("Content-Type", "application/json");
		res.send(serialized.json);
	} catch (error: any) {
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
}
