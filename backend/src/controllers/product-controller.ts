import { Request, Response } from "express";
import { ProductService } from "@services/product-service";

// Create product
export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = await ProductService.createProduct(req.body);
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get single product
export const getProduct = async (req: Request, res: Response) => {
	try {
		const product = await ProductService.getProduct(req.params.id);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Get all products (with pagination)
export const getProducts = async (req: Request, res: Response) => {
	try {
		const options: any = {};
		if (req.query.limit) options.limit = parseInt(req.query.limit as string);
		if (req.query.page) options.page = parseInt(req.query.page as string);
		if (req.query.sortBy) options.sortBy = req.query.sortBy as string;
		if (req.query.sortOrder) options.sortOrder = req.query.sortOrder as "asc" | "desc";
		const products = await ProductService.getProducts(options);
		res.json(products);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const updated = await ProductService.updateProduct(req.params.id, req.body);
		if (!updated) return res.status(404).json({ error: "Product not found" });
		res.json(updated);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const deleted = await ProductService.deleteProduct(req.params.id);
		if (!deleted) return res.status(404).json({ error: "Product not found" });
		res.json({ message: "Product deleted" });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
