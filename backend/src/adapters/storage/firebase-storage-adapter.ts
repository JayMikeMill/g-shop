import { StorageAdapter } from "./storage-adapter";
import { getStorage } from "firebase-admin/storage";
import { initializeApp, cert, App } from "firebase-admin/app";
import path from "path";
import fs from "fs";

// Initialize Firebase Admin if not already initialized

// Only initialize if not already initialized
let app: App | undefined;
try {
  app = initializeApp({
    credential: cert(JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../config/firebase/serviceAccountKey.json"), "utf8"))),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
} catch (e: any) {
  // If already initialized, ignore error
  if (!/already exists/u.test(e.message)) throw e;
}
const storage = getStorage();
const bucket = storage.bucket();

export class FirebaseStorageAdapter implements StorageAdapter {
  async uploadImage(file: Buffer | string, filename: string): Promise<string> {
    const fileRef = bucket.file(filename);
    const buffer = typeof file === "string" ? Buffer.from(file, "base64") : file;
    await fileRef.save(buffer, { contentType: "image/jpeg", public: true });
    return fileRef.publicUrl();
  }

  async uploadFile(file: Buffer | string, filename: string, contentType?: string): Promise<string> {
    const fileRef = bucket.file(filename);
    const buffer = typeof file === "string" ? Buffer.from(file, "base64") : file;
    await fileRef.save(buffer, { contentType: contentType || undefined, public: true });
    return fileRef.publicUrl();
  }

  async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract filename from URL
      const match = url.match(/\/([^\/]+)$/);
      if (!match) return false;
      const filename = match[1];
      await bucket.file(filename).delete();
      return true;
    } catch {
      return false;
    }
  }
}
