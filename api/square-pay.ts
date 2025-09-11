import { VercelRequest, VercelResponse } from "@vercel/node";
import SuperJSON from "superjson";
import { SquareError } from "square";

import { processPayment } from "../backend/square-api";
import { type PaymentInfo } from "../shared/payment-info";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

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
}
