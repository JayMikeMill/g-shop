import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  discount: z.number().optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  description: z.string().optional(),
  tags: z
    .array(
      z.object({
        name: z.string(),
        color: z.string(),
        textColor: z.string(),
      })
    )
    .optional(),
  dimensions: z
    .object({
      weight: z.number().optional(),
      length: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
  options: z
    .array(
      z.object({
        name: z.string(),
        values: z.array(z.string()),
      })
    )
    .optional(),
  variants: z
    .array(
      z.object({
        options: z.array(z.string()),
        stock: z.number().nullable().optional(),
        price: z.number().nullable().optional(),
      })
    )
    .optional(),
  stock: z.number().nullable().optional(),
  images: z.any().optional(), // Accept all for now
});

export type ProductFormType = z.infer<typeof ProductSchema>;
