import { Router } from "express";
import { createCRUDRoute } from "@routes/crud-routes/createCRUDRoute";
import authRoutes from "@routes/auth";
import paymentRoutes from "@routes/payments";
import storageRoutes from "@routes/storage";
import { db } from "@config/adapters";

const router = Router();

// ---------- Helper ----------
function adminCRUD(crud: any, extraOptions: any = {}) {
  return createCRUDRoute(crud, {
    create: ["ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
    ...extraOptions,
  });
}

// ---------- Modular routes ----------
router.use("/auth", authRoutes);
router.use("/payments", paymentRoutes);
router.use("/storage", storageRoutes);

// ---------- CRUD Routes ----------
router.use("/products/tags-presets", adminCRUD(db.productTagsPresets));
router.use("/products/options-presets", adminCRUD(db.productOptionsPresets));

router.use(
  "/products/reviews",
  adminCRUD(db.productReviews, { create: ["USER", "ADMIN"] })
);

// Products must come last as it has nested routes
router.use("/products", adminCRUD(db.products));

// Product reviews can be created by any authenticated user
router.use("/catalog/categories", adminCRUD(db.categories));
router.use("/catalog/collections", adminCRUD(db.collections));

// Orders and Users have custom read/update rules
router.use("/orders", adminCRUD(db.orders, { read: ["ADMIN", "OWNER"] }));

router.use(
  "/users",
  adminCRUD(db.users, {
    create: ["ADMIN"],
    read: ["ADMIN", "OWNER"],
    update: ["ADMIN", "OWNER"],
  })
);

export default router;
