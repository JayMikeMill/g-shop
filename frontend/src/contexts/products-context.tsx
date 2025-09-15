// React imports
import React, { createContext, useContext } from "react";
import * as productService from "@services/product-service";

// Product type definition shared across app
import type { Product } from "@models/product";

// ----------------------
// Interface for the context
// ----------------------
// This defines what functions and data the context will provide to any component
interface ProductsContextType {
	// Fetch all products from Firebase
	getAllProducts: (limit: number, cursor?: string) => Promise<Product[]>;

	// Add a product, including uploading an image
	createProduct: (product: any) => Promise<Product>;

	// Delete a product and its associated image
	deleteProduct: (id: string) => Promise<any>;

	// Edit a product, optionally with a new image
	updateProduct: (id: string, product: any) => Promise<Product>;

	// Get a single product by ID
	getProduct: (id: string) => Promise<Product>;
}

// ----------------------
// Create the context
// ----------------------
// Initially null; will be provided by the ProductManagerProvider
const ProductsContext = createContext<ProductsContextType | null>(null);

// ----------------------
// ProductManagerProvider component
// ----------------------
// Wrap parts of the app where you want to use product functions
export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// All functions simply wrap the service and propagate errors
	return (
		<ProductsContext.Provider
			value={{
				getAllProducts: productService.getAllProducts,
				createProduct: productService.createProduct,
				getProduct: productService.getProduct,
				updateProduct: productService.updateProduct,
				deleteProduct: productService.deleteProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

// ----------------------
// Custom hook to access product functions
// ----------------------
// Makes it easy to use the context in any component
export const useProducts = () => {
	const ctx = useContext(ProductsContext);

	// Safety check: ensure the hook is used within the provider
	if (!ctx) throw new Error("useProducts must be used within ProductsProvider");

	return ctx;
};
