import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  status: z.string(),
  total: z.number().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        id: z.string().optional(),
        orderId: z.string().optional(),
        product: z.any(),
        quantity: z.number(),
        price: z.number(),
      })
    )
    .optional(),
  shippingInfo: z.any().optional(),
  transaction: z.any().optional(),
  statusHistory: z.array(z.any()).optional(),
});

export type OrderFormType = z.infer<typeof OrderSchema>;
