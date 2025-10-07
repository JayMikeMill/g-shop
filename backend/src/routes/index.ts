import { Router } from "express";

// Modular routes
import authRoutes from "@routes/auth";
import storageRoutes from "@routes/storage";
import orderRoutes from "@routes/orders";

// CRUD route factory
import { createCrudRoute } from "@routes/createCrudRoute";

// Database for CRUD routes
import { db } from "@config/adapters";

const router = Router();

// ---------- Modular routes ----------
router.use("/auth", authRoutes);
router.use("/storage", storageRoutes);
router.use("/orders", orderRoutes);

// ---------- CRUD Routes ----------
function adminCrud(crud: any, extraOptions: any = {}) {
  return createCrudRoute(crud, {
    create: ["ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
    ...extraOptions,
  });
}

// Product sub-resources
router.use("/products/tags-presets", adminCrud(db.productTagsPresets));
router.use("/products/options-presets", adminCrud(db.productOptionsPresets));
router.use(
  "/products/reviews",
  adminCrud(db.productReviews, { create: ["USER", "ADMIN"] })
);

// Products must come last as it has nested routes
router.use("/products", adminCrud(db.products));

// Product reviews can be created by any authenticated user
router.use("/catalog/categories", adminCrud(db.categories));
router.use("/catalog/collections", adminCrud(db.collections));

// Orders and Users have custom read/update rules,
// Orders are separate from order processing
router.use("/orders", adminCrud(db.orders, { read: ["ADMIN", "OWNER"] }));

// Users can be created by admin only, but read and updated by owner as well
router.use(
  "/users",
  adminCrud(db.users, {
    create: ["ADMIN"],
    read: ["ADMIN", "OWNER"],
    update: ["ADMIN", "OWNER"],
  })
);

export default router;
