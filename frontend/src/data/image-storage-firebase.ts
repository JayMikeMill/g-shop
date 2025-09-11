// src/data/image-storage-firebase.ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@data/firebase-api";
import type { ImageStorageProvider } from "@data/image-storage-interface";

export const FirebaseStorageProvider: ImageStorageProvider = {
	uploadImage: async (imageFile: File, folder = "products") => {
		if (!imageFile) throw new Error("Image file required");
		const storageRef = ref(storage, `${folder}/${imageFile.name}`);
		await uploadBytes(storageRef, imageFile);
		return getDownloadURL(storageRef);
	},
	deleteImage: async (imageUrl: string) => {
		const storageRef = ref(storage, imageUrl);
		await deleteObject(storageRef);
	},
};
