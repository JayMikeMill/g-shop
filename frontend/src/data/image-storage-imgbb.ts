// src/data/image-storage-imgbb.ts
import type { ImageStorageProvider } from "@data/image-storage-interface";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const ImgbbStorageProvider: ImageStorageProvider = {
	uploadImage: async (imageFile: File) => {
		if (!IMGBB_API_KEY) throw new Error("ImgBB API key missing");

		const formData = new FormData();
		formData.append("image", imageFile);

		const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
			method: "POST",
			body: formData,
		});

		const data = await response.json();

		if (!data.success) throw new Error(data.error?.message || "ImgBB upload failed");

		return data.data.url; // public URL of the image
	},

	deleteImage: async (imageUrl: string) => {
		// ImgBB deletion requires the 'delete_url' returned at upload.
		// For simplicity, we won't implement deletion here unless you store delete_url in DB
		console.warn("ImgBB deletion not implemented. Store delete_url if you need this.");
	},

	uploadImages: async (imageFiles: File[]) => {
		const imageUrls = await Promise.all(
			imageFiles.map(file => ImgbbStorageProvider.uploadImage(file))
		);
		return imageUrls;
	},

	deleteImages: async (imageUrls: string[]) => {
		console.warn("ImgBB deletion not implemented. Store delete_url if you need this.");
	},
};
