// src/data/firebase-products.ts
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@data/firebase-api";
import type { Product } from "@shared/product";

// Reference to products collection
const productsCollection = collection(db, "products");

// Fetch all products
export const fetchProductsFromFirebase = async (): Promise<Product[]> => {
	const snapshot = await getDocs(productsCollection);
	return snapshot.docs.map(d => ({
		id: d.id,
		...(d.data() as Omit<Product, "id">),
	}));
};

// Add a new product with image
export const addProductToFirebase = async (
	product: Omit<Product, "id" | "image">,
	imageFile: File
): Promise<void> => {
	if (!imageFile) throw new Error("Image file required");
	const storageRef = ref(storage, `products/${imageFile.name}`);
	await uploadBytes(storageRef, imageFile);
	const imageUrl = await getDownloadURL(storageRef);
	await addDoc(productsCollection, { ...product, image: imageUrl });
};

// Delete a product (Firestore + Storage)
export const deleteProductFromFirebase = async (product: Product): Promise<void> => {
	const imageRef = ref(storage, product.image);
	await deleteObject(imageRef);
	await deleteDoc(doc(productsCollection, product.id));
};
