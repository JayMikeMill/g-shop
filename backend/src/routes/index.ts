
import { Router } from "express";
import authRoutes from "@routes/auth";
import userRoutes from "@routes/users";
import productRoutes from "@routes/products";
import orderRoutes from "@routes/orders";
import paymentRoutes from "@routes/payments";

const router = Router();


// Modular routing
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);

export default router;
