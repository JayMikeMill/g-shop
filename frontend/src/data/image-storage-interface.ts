// src/data/image-storage-interface.ts
export interface ImageStorageProvider {
	uploadImage(imageFile: File, folder?: string): Promise<string>; // Returns public URL
	deleteImage(imageUrl: string): Promise<void>;                     // Deletes image by URL
}
