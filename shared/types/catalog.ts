export interface Category {
  id: string; // UUID
  name: string; // Display name
  slug: string; // URL-friendly slug
  description?: string; // Optional text
  image?: string; // Category image URL
  parent_id?: string | null; // Nested category reference
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
