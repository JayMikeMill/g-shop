// src/crud/ProductCRUD.ts
import Database from "better-sqlite3";

import type {
  Product,
  ProductOption,
  ProductOptionValue,
  ProductImageSet,
  ProductOptionPreset,
} from "@shared/types/product";
import { QueryOptions } from "@shared/types/query-options";

interface ProductRow
  extends Omit<Product, "id" | "images" | "tags" | "options"> {
  id: number;
  tags: string | null;
}

interface ProductOptionRow extends ProductOption {
  id: number;
  product_id: number;
}

interface ProductOptionValueRow extends ProductOptionValue {
  id: number;
  option_id: number;
}

export class ProductCRUD {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  // ---------- CREATE ----------
  async create(product: Product): Promise<Product> {
    try {
      const result = this.db
        .prepare(
          `INSERT INTO products (name, price, discount, description, tags, stock)
					VALUES (?, ?, ?, ?, ?, ?)`
        )
        .run(
          product.name,
          product.price,
          product.discount ?? null,
          product.description,
          JSON.stringify(product.tags ?? []),
          product.stock
        );

      const productId = Number(result.lastInsertRowid);
      if (!productId) throw new Error("Failed to insert product");

      // Images
      if (product.images?.length) {
        const stmt = this.db.prepare(
          `INSERT INTO product_images (product_id, main, preview, thumbnail) VALUES (?, ?, ?, ?)`
        );
        for (const img of product.images) {
          if (!img.main || !img.preview || !img.thumbnail) {
            throw new Error("Product image is missing required fields");
          }
          stmt.run(productId, img.main, img.preview, img.thumbnail);
        }
      }

      // Options & Values
      if (product.options?.length) {
        const optionStmt = this.db.prepare(
          `INSERT INTO product_options (product_id, name) VALUES (?, ?)`
        );
        const valueStmt = this.db.prepare(
          `INSERT INTO product_option_values (option_id, value, stock) VALUES (?, ?, ?)`
        );

        for (const option of product.options) {
          if (option.name === null) {
            throw new Error("Product option is missing required fields");
          }
          const optResult = optionStmt.run(productId, option.name);
          const optionId = Number(optResult.lastInsertRowid);
          if (!optionId) throw new Error("Failed to insert product option");

          for (const value of option.values ?? []) {
            if (
              typeof value.value !== "string" ||
              typeof value.stock !== "number"
            ) {
              throw new Error(
                "Product option value is missing required fields"
              );
            }
            valueStmt.run(optionId, value.value, value.stock);
          }
        }
      }

      return { ...product, id: productId };
    } catch (err) {
      throw new Error(`ProductCRUD.create failed: ${(err as Error).message}`);
    }
  }

  // ---------- READ ----------
  async get(id: number): Promise<Product | null> {
    try {
      if (typeof id !== "number" || isNaN(id))
        throw new Error("Invalid product id: " + id);

      const row = this.db
        .prepare(`SELECT * FROM products WHERE id = ?`)
        .get(id) as ProductRow | undefined;
      if (!row) return null;

      // Images
      const images: ProductImageSet[] = (
        this.db
          .prepare(
            `SELECT main, preview, thumbnail FROM product_images WHERE product_id = ?`
          )
          .all(id) as ProductImageSet[]
      ).map((img) => ({
        main: img.main,
        preview: img.preview,
        thumbnail: img.thumbnail,
      }));

      // Options
      const optionRows: ProductOptionRow[] = this.db
        .prepare(`SELECT * FROM product_options WHERE product_id = ?`)
        .all(id) as ProductOptionRow[];

      const valueStmt = this.db.prepare(
        `SELECT * FROM product_option_values WHERE option_id = ?`
      );

      const options: ProductOption[] = optionRows.map((opt) => {
        const valueRows = valueStmt.all(opt.id) as ProductOptionValueRow[];
        const values: ProductOptionValue[] = valueRows.map((v) => ({
          id: v.id,
          optionId: String(v.option_id),
          value: v.value,
          stock: v.stock,
        }));
        return {
          id: opt.id,
          productId: opt.product_id,
          name: opt.name,
          values,
        };
      });

      return {
        id: row.id,
        name: row.name,
        price: row.price,
        discount: row.discount ?? undefined,
        description: row.description,
        tags: row.tags ? JSON.parse(row.tags) : [],
        stock: row.stock,
        images,
        options,
      };
    } catch (err) {
      throw new Error(`ProductCRUD.get failed: ${(err as Error).message}`);
    }
  }

  // ---------- GET ALL ----------
  async query(query?: QueryOptions): Promise<Product[]> {
    try {
      const rows = this.db.prepare(`SELECT id FROM products`).all() as {
        id: number;
      }[];
      const products: Product[] = [];
      for (const r of rows) {
        const p = await this.get(r.id);
        if (p) products.push(p);
      }
      return products;
    } catch (err) {
      throw new Error(`ProductCRUD.getAll failed: ${(err as Error).message}`);
    }
  }

  // ---------- UPDATE ----------
  async update(id: number, update: Partial<Product>): Promise<Product | null> {
    try {
      if (typeof id !== "number" || isNaN(id))
        throw new Error("Invalid product id: " + id);

      const product = await this.get(id);
      if (!product) return null;

      // Update product fields
      this.db
        .prepare(
          `
				UPDATE products SET name = ?, price = ?, discount = ?, description = ?, tags = ?, stock = ? WHERE id = ?
			`
        )
        .run(
          update.name ?? product.name,
          update.price ?? product.price,
          update.discount ?? product.discount,
          update.description ?? product.description,
          JSON.stringify(update.tags ?? product.tags ?? []),
          update.stock ?? product.stock,
          id
        );

      // Update images if provided
      if (update.images) {
        this.db
          .prepare(`DELETE FROM product_images WHERE product_id = ?`)
          .run(id);
        const stmt = this.db.prepare(
          `INSERT INTO product_images (product_id, main, preview, thumbnail) VALUES (?, ?, ?, ?)`
        );
        for (const img of update.images) {
          if (!img.main || !img.preview || !img.thumbnail) {
            throw new Error("Product image is missing required fields");
          }
          stmt.run(id, img.main, img.preview, img.thumbnail);
        }
      }

      // Update options if provided
      if (update.options) {
        // Delete existing options & values
        this.db
          .prepare(
            `DELETE FROM product_option_values WHERE option_id IN (SELECT id FROM product_options WHERE product_id = ?)`
          )
          .run(id);
        this.db
          .prepare(`DELETE FROM product_options WHERE product_id = ?`)
          .run(id);

        const optionStmt = this.db.prepare(
          `INSERT INTO product_options (product_id, name) VALUES (?, ?)`
        );
        const valueStmt = this.db.prepare(
          `INSERT INTO product_option_values (option_id, value, stock) VALUES (?, ?, ?)`
        );

        for (const option of update.options) {
          if (option.name === null) {
            throw new Error("Product option is missing required fields");
          }
          const optResult = optionStmt.run(id, option.name);
          const optionId = Number(optResult.lastInsertRowid);
          if (!optionId) throw new Error("Failed to insert product option");

          for (const value of option.values ?? []) {
            if (
              typeof value.value !== "string" ||
              typeof value.stock !== "number"
            ) {
              throw new Error(
                "Product option value is missing required fields"
              );
            }
            valueStmt.run(optionId, value.value, value.stock);
          }
        }
      }

      return this.get(id);
    } catch (err) {
      throw new Error(`ProductCRUD.update failed: ${(err as Error).message}`);
    }
  }

  // ---------- DELETE ----------
  async delete(id: number): Promise<void> {
    try {
      if (typeof id !== "number" || isNaN(id))
        throw new Error("Invalid product id");
      this.db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
    } catch (err) {
      throw new Error(`ProductCRUD.delete failed: ${(err as Error).message}`);
    }
  }

  // ---------- PRESETS ----------
  async createOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset> {
    try {
      const valuesStr = JSON.stringify(preset.values) ?? "[]";
      const result = this.db
        .prepare(
          `INSERT INTO product_options_presets (name, [values]) VALUES (?, ?)`
        )
        .run(preset.name, valuesStr);
      const id = Number(result.lastInsertRowid);
      return { id, name: preset.name, values: preset.values };
    } catch (err) {
      throw new Error(
        `ProductCRUD.createOptionsPreset failed: ${(err as Error).message}`
      );
    }
  }

  async getOptionsPresets(): Promise<ProductOptionPreset[]> {
    try {
      const rows = this.db
        .prepare(`SELECT id, name, [values] FROM product_options_presets`)
        .all() as { id: number; name: string; values: string }[];
      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        values: JSON.parse(r.values) as ProductOptionValue[],
      }));
    } catch (err) {
      throw new Error(
        `ProductCRUD.queryOptionsPreset failed: ${(err as Error).message}`
      );
    }
  }

  async deleteOptionsPreset(id: number): Promise<void> {
    try {
      this.db
        .prepare(`DELETE FROM product_options_presets WHERE id = ?`)
        .run(id);
    } catch (err) {
      throw new Error(
        `ProductCRUD.deleteOptionsPreset failed: ${(err as Error).message}`
      );
    }
  }
}
