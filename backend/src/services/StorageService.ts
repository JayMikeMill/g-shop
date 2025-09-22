import { storage } from "@config/adapters";

export class StorageService {
  static async uploadImage(file: Buffer | string, filename: string) {
    return storage.uploadImage(file, filename);
  }

  static async uploadFile(file: Buffer | string, filename: string, contentType?: string) {
    return storage.uploadFile(file, filename, contentType);
  }

  static async deleteFile(url: string) {
    return storage.deleteFile(url);
  }
}
