import { z } from "zod";

export const CheckoutSchema = z.object({
  shippingInfo: z.object({
    address: z.object({
      name: z.string().min(1),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      street1: z.string().min(1),
      street2: z.string().optional(),
      city: z.string().min(1),
      state: z.string().min(1),
      postalCode: z.string().min(1),
      country: z.string().min(1),
    }),
    ShippingMethod: z.any().optional(),
  }),
  cart: z.any().optional(),
  paymentMethod: z.any().optional(),
});

export type CheckoutFormType = z.infer<typeof CheckoutSchema>;
