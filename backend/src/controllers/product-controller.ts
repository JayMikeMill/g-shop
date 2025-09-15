import { Request, Response } from "express";
import { ProductService } from "@services/product-service";
import { FirebaseDB } from "@adapters/db/firebase-db";

const db = new FirebaseDB();
const productService = new ProductService(db);

export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = await productService.createProduct(req.body);
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getProduct = async (req: Request, res: Response) => {
	try {
		const product = await productService.getProduct(req.params.id);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
