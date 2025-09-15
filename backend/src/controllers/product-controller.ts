import { Request, Response } from "express";
import { ProductService } from "@services/product-service";
import { FirebaseDB } from "@adapters/db/firebase-db";

const db = new FirebaseDB();
const productService = new ProductService(db);

// Create product
export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = await productService.createProduct(req.body);
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get single product
export const getProduct = async (req: Request, res: Response) => {
	try {
		const product = await productService.getProduct(req.params.id);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get all products (with pagination)
export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const limit = parseInt(req.query.limit as string) || 10;
		const startAfterId = req.query.startAfterId as string | undefined;
		const products = await productService.getAllProducts(limit, startAfterId);
		res.json(products);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const updated = await productService.updateProduct(req.params.id, req.body);
		if (!updated) return res.status(404).json({ error: "Product not found" });
		res.json(updated);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const deleted = await productService.deleteProduct(req.params.id);
		if (!deleted) return res.status(404).json({ error: "Product not found" });
		res.json({ message: "Product deleted" });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
