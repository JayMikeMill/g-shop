import { Router } from "express";

import { createCrudRoute as CR, reqAdminEdit, reqOwnerAll } from "@utils";

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
router.use("/orders", CR(db.orders, reqOwnerAll));

// ---------------- Users ----------------
router.use(`/users/reviews`, CR(db.productReviews, reqOwnerAll));
router.use("/users", CR(db.users, reqOwnerAll));

export default router;
