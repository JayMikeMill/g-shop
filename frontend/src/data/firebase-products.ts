// Import Firebase Firestore functions for working with database
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Import Firebase Storage functions for handling images/files
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Import initialized Firebase instances (db = Firestore, storage = Storage)
import { db, storage } from "@data/firebase-api";

// Choose which provider you want here
import type { ImageStorageProvider } from "@data/image-storage-interface";
//import { FirebaseStorageProvider } from "@data/image-storage-firebase";
import { ImgbbStorageProvider } from "@data/image-storage-imgbb";

const imageProvider: ImageStorageProvider = ImgbbStorageProvider;

// Import TypeScript type for Product
import type { Product } from "@shared/product";
import { getAuth } from "firebase/auth";

// ----------------------
// Reference to the "products" collection in Firestore
// ----------------------
// This tells Firebase: "all product documents live under this collection"
const productsCollection = collection(db, "products");

// ----------------------
// Fetch all products from Firestore
// ----------------------
export const fetchProductsFromFirebase = async (): Promise<Product[]> => {
	const auth = getAuth();
	console.log("Current user in fetchProductsFromFirebase:", auth.currentUser);
	
	// Get all documents in the "products" collection
	const snapshot = await getDocs(productsCollection);

	// Map over each document to return Product objects
	// Firestore stores documents as key-value pairs, we include the `id` manually
	return snapshot.docs.map(d => ({
		id: d.id,                  // Firestore document ID
		...(d.data() as Omit<Product, "id">), // The rest of the product fields
	}));
};

// ----------------------
// Add a new product with an image
// ----------------------
export const addProductToFirebase = async (
	product: Omit<Product, "id" | "image">, // Product fields without id or image
	imageFile: File                          // Image file to upload
): Promise<void> => {
	// Ensure an image file exists
	if (!imageFile) throw new Error("Image file required");

	// Get the public URL of the uploaded image
	const imageUrl = await imageProvider.uploadImage(imageFile);

	// Add product document to Firestore with the image URL included
	await addDoc(productsCollection, { ...product, image: imageUrl });
};

// ----------------------
// Delete a product from Firestore and its image from Storage
// ----------------------
export const deleteProductFromFirebase = async (product: Product): Promise<void> => {
	// Delete the image from Storage
	if (product.image) await imageProvider.deleteImage(product.image);

	// Delete the Firestore document using the product ID
	await deleteDoc(doc(productsCollection, product.id));
};
