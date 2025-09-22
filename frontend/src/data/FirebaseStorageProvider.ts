// src/data/image-storage-firebase.ts
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@api/firebase/firebaseAPI";
import type { ImageStorageProvider } from "@data/ImageStorageProvider";

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
  uploadImages: async (imageFiles: File[], folder = "products") => {
    const imageUrls = await Promise.all(
      imageFiles.map((file) =>
        FirebaseStorageProvider.uploadImage(file, folder)
      )
    );
    return imageUrls;
  },
  deleteImages: async (imageUrls: string[]) => {
    await Promise.all(
      imageUrls.map((url) => FirebaseStorageProvider.deleteImage(url))
    );
  },
};
