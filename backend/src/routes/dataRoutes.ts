import { Router } from "express";

import {
  createCrudRoute as CR,
  reqAdminEdit,
  reqOwnerEdit,
} from "@utils/createCrudRoute";

import { db } from "@adapters/services";

const router = Router();

// ----------- Products/Product Sub Resources ----------------
const TagsCrud = CR(db.productTagsPresets, reqAdminEdit);
const OptionsCrud = CR(db.productOptionsPresets, reqAdminEdit);
router.use(`/products/tags-presets`, TagsCrud);
router.use(`/products/options-presets`, OptionsCrud);
router.use(`/products`, CR(db.products, reqAdminEdit));

// ---------------- Categories/Collections ----------------
router.use("/catalog/categories", CR(db.categories, reqAdminEdit));
router.use("/catalog/collections", CR(db.collections, reqAdminEdit));

// ---------------- Orders ----------------
router.use("/orders", CR(db.orders, { read: ["ADMIN", "OWNER"] }));

// ---------------- Users ----------------
router.use(`/users/reviews`, CR(db.productReviews, reqOwnerEdit));
router.use("/users", CR(db.users, reqOwnerEdit));

export default router;
