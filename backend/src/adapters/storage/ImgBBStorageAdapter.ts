import { StorageAdapter } from "../StorageAdapter";
import axios from "axios";

const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const IMGBB_API_URL = "https://api.imgbb.com/1/upload";

export class ImgBBStorageAdapter implements StorageAdapter {
  async uploadImage(file: Buffer | string, filename: string): Promise<string> {
    if (!IMGBB_API_KEY) throw new Error("IMGBB_API_KEY not set");
    const base64 = typeof file === "string" ? file : file.toString("base64");
    const form = new URLSearchParams();
    form.append("key", IMGBB_API_KEY);
    form.append("image", base64);
    form.append("name", filename);
    const response = await axios.post(IMGBB_API_URL, form);

    console.log("ImgBB upload response:", response.data);
    console.log("image name:", filename);
    console.log("Uploaded image URL:", response.data.data.url);

    return response.data.data.url;
  }

  async uploadFile(
    file: Buffer | string,
    filename: string,
    contentType?: string
  ): Promise<string> {
    // ImgBB only supports images, so treat as image upload
    return this.uploadImage(file, filename);
  }

  async deleteFile(url: string): Promise<boolean> {
    // ImgBB free API does not support deletion by URL; return false
    return false;
  }
}
