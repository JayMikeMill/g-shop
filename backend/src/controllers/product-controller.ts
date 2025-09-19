import { Request, Response, NextFunction } from "express";
import { ProductService } from "@services/product-service";

// Create product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.json(product);
  } catch (err: any) {
    next(err);
  }
};

// Get single product
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductService.getProduct(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err: any) {
    next(err);
  }
};

// Get all products (with pagination)
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options: any = {};
    if (req.query.limit) options.limit = parseInt(req.query.limit as string);
    if (req.query.page) options.page = parseInt(req.query.page as string);
    if (req.query.sortBy) options.sortBy = req.query.sortBy as string;
    if (req.query.sortOrder)
      options.sortOrder = req.query.sortOrder as "asc" | "desc";
    const products = await ProductService.getProducts(options);
    res.json(products);
  } catch (err: any) {
    next(err);
  }
};

// Update product
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await ProductService.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

// Delete product
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await ProductService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err: any) {
    next(err);
  }
};

// ---------- PRODUCT OPTIONS PRESETS ----------
export const createProductOptionsPreset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const preset = await ProductService.createProductOptionsPreset(req.body);
    res.json(preset);
  } catch (err: any) {
    next(err);
  }
};

export const getProductOptionsPresets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const presets = await ProductService.getProductOptionsPresets();
    res.json(presets);
  } catch (err: any) {
    next(err);
  }
};

export const deleteProductOptionsPreset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProductOptionsPreset(req.params.id);
    res.json({ message: "Product options preset deleted" });
  } catch (err: any) {
    next(err);
  }
};

// ---------- CATEGORY CRUD ----------
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await ProductService.createCategory(req.body);
    res.json(category);
  } catch (err: any) {
    next(err);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await ProductService.getCategory(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err: any) {
    next(err);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await ProductService.getCategories();
    res.json(categories);
  } catch (err: any) {
    next(err);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await ProductService.updateCategory(
      req.params.id,
      req.body
    );
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await ProductService.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err: any) {
    next(err);
  }
};
