// src/context/ProductManager.tsx

import React, { createContext, useContext } from "react";
import type { Product } from "@shared/product";
import {
	fetchProductsFromFirebase,
	addProductToFirebase,
	deleteProductFromFirebase,
} from "../data/firebase-products"; // Import Firebase wrapper functions

// ---- Interface ----
// Defines the functions that the context will provide to components
interface ProductManagerInterface {
	fetchProducts: () => Promise<Product[]>; // fetch all products
	addProduct: (product: Omit<Product, "id" | "image">, imageFile: File) => Promise<void>; // add a product with image
	deleteProduct: (product: Product) => Promise<void>; // delete a product and its image
}

// ---- Context ----
// Creates the React context. Initially null.
// Components will use this to access product functions via the hook
const ProductManagerContext = createContext<ProductManagerInterface | null>(null);

// ---- Provider ----
// Wrap your app or part of your app with this provider to give access to product management
export const ProductManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	// Fetch products by calling the Firebase wrapper function
	const fetchProducts = async (): Promise<Product[]> => {
		return await fetchProductsFromFirebase();
	};

	// Add a product by calling the Firebase wrapper function
	const addProduct = async (product: Omit<Product, "id" | "image">, imageFile: File) => {
		await addProductToFirebase(product, imageFile);
	};

	// Delete a product (both Firestore and Storage) via the Firebase wrapper
	const deleteProduct = async (product: Product) => {
		await deleteProductFromFirebase(product);
	};

	// Provide the functions to all children of this provider
	return (
		<ProductManagerContext.Provider value={{ fetchProducts, addProduct, deleteProduct }}>
			{children}
		</ProductManagerContext.Provider>
	);
};

// ---- Hook to use anywhere ----
// Custom hook to easily access product management functions in components
export const useProductManager = (): ProductManagerInterface => {
	const context = useContext(ProductManagerContext);
	// Ensure that hook is used within the Provider
	if (!context) throw new Error("useProductManager must be inside ProductManagerProvider");
	return context;
};
