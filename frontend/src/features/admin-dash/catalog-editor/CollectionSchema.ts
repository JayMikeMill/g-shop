import { z } from "zod";

export const CollectionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  seoTitle: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  description: z.string().optional(),
  images: z
    .object({
      preview: z.string().optional(),
      banner: z.string().optional(),
    })
    .optional(),
});

export type CollectionFormType = z.infer<typeof CollectionSchema>;
