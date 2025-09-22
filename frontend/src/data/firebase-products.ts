// Import Firebase Firestore functions for working with database
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Import initialized Firebase instances (db = Firestore, storage = Storage)
import { db } from "@services/firebase/firebase-api";

// Choose which provider you want here
import type { ImageStorageProvider } from "@data/image-storage-interface";
//import { FirebaseStorageProvider } from "@data/image-storage-firebase";
import { ImgbbStorageProvider } from "@data/image-storage-imgbb";

const imageProvider: ImageStorageProvider = ImgbbStorageProvider;

// Import TypeScript type for Product
import type { Product } from "@shared/types/product";

// ----------------------
// Reference to the "products" collection in Firestore
// ----------------------
// This tells Firebase: "all product documents live under this collection"
const productsCollection = collection(db, "products");

// ----------------------
// Fetch all products from Firestore
// ----------------------
export const fetchProductsFromFirebase = async (): Promise<Product[]> => {
  // Get all documents in the "products" collection
  const snapshot = await getDocs(productsCollection);

  // Map over each document to return Product objects
  // Firestore stores documents as key-value pairs, we include the `id` manually
  return snapshot.docs.map((d) => ({
    id: d.id, // Firestore document ID
    ...(d.data() as Omit<Product, "id">), // The rest of the product fields
  }));
};

// ----------------------
// Add a new product with an image
// ----------------------
export const addProductToFirebase = async (
  product: Omit<Product, "id" | "images">, // Product fields without id or image
  imageFiles: File[] // Image file to upload
): Promise<void> => {
  // Ensure an image file exists
  if (imageFiles.length === 0) throw new Error("Image files required");

  // Get the public URL of the uploaded image
  const imageUrls = await imageProvider.uploadImages(imageFiles);

  // Add product document to Firestore with the image URL included
  await addDoc(productsCollection, { ...product, images: imageUrls });
};

// ----------------------
// Delete a product from Firestore and its image from Storage
// ----------------------
export const deleteProductFromFirebase = async (
  product: Product
): Promise<void> => {
  // Delete the image from Storage
  if (product.images) await imageProvider.deleteImages(product.images);

  // Delete the Firestore document using the product ID
  await deleteDoc(doc(productsCollection, product.id));
};

// ----------------------
// Edit a product in Firestore and optionally replace its image
// ----------------------
export const editProductInFirebase = async (
  product: Product, // Product data with ID
  imageFiles: File[] // Optional new image file
): Promise<void> => {
  const productRef = doc(productsCollection, product.id);
  const productData: Partial<Product> = { ...product };
  delete (productData as any).id; // Do not write id inside the document

  // If a new image is provided, upload it and update the image URL
  if (imageFiles.length > 0) {
    // Delete the old image if it exists
    if (product.images) {
      await imageProvider.deleteImages(product.images);
    }
    // Upload the new image and get its URL
    productData.images = await imageProvider.uploadImages(imageFiles);
  }

  // Update the document in Firestore
  await updateDoc(productRef, productData);
};
