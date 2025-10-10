import { Router } from "express";
import { createCrudRoute } from "@utils/createCrudRoute";
import { db } from "@adapters/services";

const router = Router();

// ===============================
// Helper for admin-only CRUD
// ===============================
function adminCrud(crud: any, extraOptions: any = {}) {
  return createCrudRoute(crud, {
    create: ["ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
    ...extraOptions,
  });
}

// ===============================
// Product sub-resources
// ===============================
router.use("/products/tags-presets", adminCrud(db.productTagsPresets));
router.use("/products/options-presets", adminCrud(db.productOptionsPresets));
router.use(
  "/products/reviews",
  adminCrud(db.productReviews, { create: ["USER", "ADMIN"] })
);

// ===============================
// Products
// ===============================
router.use("/products", adminCrud(db.products));

// ===============================
// Catalog
// ===============================
router.use("/catalog/categories", adminCrud(db.categories));
router.use("/catalog/collections", adminCrud(db.collections));

// ===============================
// Orders
// ===============================
router.use("/orders", adminCrud(db.orders, { read: ["ADMIN", "OWNER"] }));

// ===============================
// Users
// ===============================
router.use(
  "/users",
  adminCrud(db.users, {
    create: ["ADMIN"],
    read: ["ADMIN", "OWNER"],
    update: ["ADMIN", "OWNER"],
  })
);

export default router;
