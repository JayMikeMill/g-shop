import { StorageAdapter } from "@adapters/types";
import { getStorage } from "firebase-admin/storage";

// Initialize Firebase Admin if not already initialized

// Only initialize if not already initialized
export class FirebaseStorageAdapter implements StorageAdapter {
  private storage = getStorage();
  private bucket = this.storage.bucket();

  async uploadImage(file: Buffer | string, filename: string): Promise<string> {
    const fileRef = this.bucket.file(filename);
    const buffer =
      typeof file === "string" ? Buffer.from(file, "base64") : file;
    await fileRef.save(buffer, { contentType: "image/jpeg", public: true });
    return fileRef.publicUrl();
  }

  async uploadFile(
    file: Buffer | string,
    filename: string,
    contentType?: string
  ): Promise<string> {
    const fileRef = this.bucket.file(filename);
    const buffer =
      typeof file === "string" ? Buffer.from(file, "base64") : file;
    await fileRef.save(buffer, {
      contentType: contentType || undefined,
      public: true,
    });
    return fileRef.publicUrl();
  }

  async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract filename from URL
      const match = url.match(/\/([^\/]+)$/);
      if (!match) return false;
      const filename = match[1];
      await this.bucket.file(filename).delete();
      return true;
    } catch {
      return false;
    }
  }
}
