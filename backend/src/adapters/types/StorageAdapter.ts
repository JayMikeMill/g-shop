export interface StorageAdapter {
  /**
   * Upload an image and return its public URL
   * @param file Buffer or base64 string
   * @param filename string
   */
  uploadImage(file: Buffer, filename: string): Promise<string>;

  /**
   * Upload a generic file and return its public URL
   * @param file Buffer or base64 string
   * @param filename string
   * @param contentType optional MIME type
   */
  uploadFile(
    file: Buffer,
    filename: string,
    contentType?: string
  ): Promise<string>;

  /**
   * Delete a file (image or any file) by its public URL or storage key
   * @param url string
   */
  deleteFile(url: string): Promise<boolean>;
}
