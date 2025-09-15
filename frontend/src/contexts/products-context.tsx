// React imports
import React, { createContext, useContext } from "react";

// Product type definition shared across app
import type { Product } from "@models/product";

// Firebase wrapper functions for product operations
// These functions handle actual Firebase calls (Firestore + Storage)
import {
	fetchProductsFromFirebase,
	addProductToFirebase,
	deleteProductFromFirebase,
	editProductInFirebase,
} from "../data/firebase-products";

// ----------------------
// Interface for the context
// ----------------------
// This defines what functions and data the context will provide to any component
interface ProductsInterface {
	// Fetch all products from Firebase
	fetchProducts: () => Promise<Product[]>;

	// Add a product, including uploading an image
	addProduct: (product: Omit<Product, "id" | "images">, imageFiles: File[]) => Promise<void>;

	// Delete a product and its associated image
	deleteProduct: (product: Product) => Promise<void>;

	// Edit a product, optionally with a new image
	editProduct: (product: Product, imageFiles: File[]) => Promise<void>;
}

// ----------------------
// Create the context
// ----------------------
// Initially null; will be provided by the ProductManagerProvider
const ProductsContext = createContext<ProductsInterface | null>(null);

// ----------------------
// ProductManagerProvider component
// ----------------------
// Wrap parts of the app where you want to use product functions
export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	// Function to fetch products
	const fetchProducts = async (): Promise<Product[]> => {
		// Call the Firebase wrapper to get all products
		return await fetchProductsFromFirebase();
	};

	// Function to add a product
	const addProduct = async (product: Omit<Product, "id" | "images">, imageFiles: File[]) => {
		// Call the Firebase wrapper to add product and upload image
		await addProductToFirebase(product, imageFiles);
	};

	// Function to delete a product
	const deleteProduct = async (product: Product) => {
		// Call the Firebase wrapper to delete the product and its image
		await deleteProductFromFirebase(product);
	};

	// Function to edit a product
	const editProduct = async (product: Product, imageFiles: File[]) => {
		// Call the Firebase wrapper to edit the product
		await editProductInFirebase(product, imageFiles);
	};

	// Provide these functions to all child components via context
	return (
		<ProductsContext.Provider value={{ fetchProducts, addProduct, deleteProduct, editProduct }}>
			{children}
		</ProductsContext.Provider>
	);
};

// ----------------------
// Custom hook to access product functions
// ----------------------
// Makes it easy to use the context in any component
export const useProducts = (): ProductsInterface => {
	const context = useContext(ProductsContext);

	// Safety check: ensure the hook is used within the provider
	if (!context) throw new Error("useProductManager must be inside ProductManagerProvider");

	return context;
};
