// src/context/ProductManager.tsx
import React, { createContext, useContext } from "react";
import { db, storage } from "../data/firebase";
import type { Product } from "../../../shared/product";

import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// ---- Interface ----
interface ProductManagerInterface {
	fetchProducts: () => Promise<Product[]>;
	addProduct: (product: Omit<Product, "id" | "image">, imageFile: File) => Promise<void>;
	deleteProduct: (product: Product) => Promise<void>;
}

// ---- Context ----
const ProductManagerContext = createContext<ProductManagerInterface | null>(null);

// ---- Provider ----
export const ProductManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const productsCollection = collection(db, "products");

	const fetchProducts = async (): Promise<Product[]> => {
		const snapshot = await getDocs(productsCollection);
		return snapshot.docs.map(doc => ({
			id: doc.id,
			...(doc.data() as Omit<Product, "id">),
		}));
	};

	const addProduct = async (product: Omit<Product, "id" | "image">, imageFile: File) => {
		if (!imageFile) throw new Error("Image file required");
		const storageRef = ref(storage, `products/${imageFile.name}`);
		await uploadBytes(storageRef, imageFile);
		const imageUrl = await getDownloadURL(storageRef);
		await addDoc(productsCollection, { ...product, image: imageUrl });
	};

	const deleteProduct = async (product: Product) => {
		const imageRef = ref(storage, product.image);
		await deleteObject(imageRef);
		await deleteDoc(doc(productsCollection, product.id));
	};

	return (
		<ProductManagerContext.Provider value={{ fetchProducts, addProduct, deleteProduct }}>
			{children}
		</ProductManagerContext.Provider>
	);
};

// ---- Hook to use anywhere ----
export const useProductManager = (): ProductManagerInterface => {
	const context = useContext(ProductManagerContext);
	if (!context) throw new Error("useProductManager must be inside ProductManagerProvider");
	return context;
};
