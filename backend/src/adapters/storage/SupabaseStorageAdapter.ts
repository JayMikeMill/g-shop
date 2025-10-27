import { StorageAdapter } from "@adapters/types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export class SupabaseStorageAdapter implements StorageAdapter {
  private supabase: SupabaseClient;
  private bucketName: string;

  constructor(
    bucketName: string = process.env.SUPABASE_BUCKET || "default-bucket"
  ) {
    if (!SUPABASE_URL) throw new Error("SUPABASE_URL not set");
    if (!SUPABASE_SERVICE_KEY)
      throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");

    // Create the client per-instance
    this.supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    this.bucketName = bucketName;
  }

  async uploadImage(file: Buffer, filename: string): Promise<string> {
    return this.uploadFile(file, filename, "image/*");
  }

  async uploadFile(
    file: Buffer,
    filename: string,
    contentType?: string
  ): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: contentType,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }

    const { data: urlData } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filename);

    return urlData?.publicUrl || "";
  }

  async deleteFile(filename: string): Promise<boolean> {
    const { error } = await this.supabase.storage
      .from(this.bucketName)
      .remove([filename]);

    if (error) {
      console.error("Supabase delete error:", error);
      return false;
    }

    return true;
  }
}
