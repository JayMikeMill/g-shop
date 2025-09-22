import { Request, Response, NextFunction } from "express";
import { CatalogService } from "@services/catalog-service";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CatalogService.createCategory(req.body);
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
    const category = await CatalogService.getCategory(req.params.id);
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
    const categories = await CatalogService.getCategories();
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
    const updated = await CatalogService.updateCategory(
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
    const deleted = await CatalogService.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err: any) {
    next(err);
  }
};
