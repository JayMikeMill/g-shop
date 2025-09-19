import Database from "better-sqlite3";

export function initTables(db: Database.Database) {
  // =========================
  // USERS
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY UNIQUE,   -- UUID for the user
			data TEXT NOT NULL            -- JSON string with user profile & settings
		)
		`
  ).run();

  // =========================
  // PRODUCTS
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS products (
			id INTEGER PRIMARY KEY AUTOINCREMENT, -- Product ID (auto increment)
			name TEXT NOT NULL,                   -- Product name
			price REAL NOT NULL,                  -- Base price
			discount TEXT,                        -- Optional discount info (could be % or flat)
			description TEXT NOT NULL,            -- Product description
			tags TEXT,                            -- JSON array of tags
			stock INTEGER NOT NULL                -- Default/global stock count
		)
		`
  ).run();

  // =========================
  // PRODUCT IMAGES
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS product_images (
			id INTEGER PRIMARY KEY AUTOINCREMENT, -- Image ID
			product_id INTEGER NOT NULL,          -- Linked product
			main TEXT NOT NULL,                   -- Full-size image URL/path
			preview TEXT NOT NULL,                -- Medium image
			thumbnail TEXT NOT NULL,              -- Small image (for listings)
			FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
		)
		`
  ).run();

  // =========================
  // PRODUCT OPTIONS (e.g. Color, Size)
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS product_options (
			id INTEGER PRIMARY KEY AUTOINCREMENT, -- Option ID
			product_id INTEGER NOT NULL,          -- Linked product
			name TEXT NOT NULL,                   -- Option name (e.g. "Color", "Size")
			FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
		)
		`
  ).run();

  // =========================
  // PRODUCT OPTION VALUES (e.g. Red, Blue, Small, Large)
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS product_option_values (
			id INTEGER PRIMARY KEY AUTOINCREMENT, -- Value ID
			option_id INTEGER NOT NULL,           -- Linked option
			value TEXT NOT NULL,                  -- Value (e.g. "Red", "M", "XL")
			stock INTEGER DEFAULT 0,              -- Stock for this specific option value
			FOREIGN KEY(option_id) REFERENCES product_options(id) ON DELETE CASCADE
		)
		`
  ).run();

  // =========================
  // PRODUCT OPTION PRESETS (Reusable sets of options)
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS product_options_presets (
			id INTEGER PRIMARY KEY AUTOINCREMENT, -- Preset ID
			name TEXT NOT NULL,                   -- Preset name (e.g. "Shirt Sizes")
			[values] TEXT NOT NULL                -- JSON array of values (e.g. ["S","M","L","XL"])
		)
		`
  ).run();

  // =========================
  // CATEGORIES
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS categories (
			id TEXT PRIMARY KEY UNIQUE,           -- UUID for category
			name TEXT NOT NULL,                   -- Display name (e.g. "Men's T-Shirts")
			slug TEXT NOT NULL UNIQUE,            -- URL-friendly identifier (e.g. "mens-t-shirts")
			description TEXT,                     -- Optional description (for SEO / info page)
			image TEXT,                           -- Category image (thumbnail/banner)
			parent_id TEXT,                       -- Parent category ID (for hierarchy)
			created_at TEXT NOT NULL,             -- ISO timestamp
			updated_at TEXT NOT NULL,             -- ISO timestamp
			FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
		)
		`
  ).run();

  // =========================
  // ORDERS
  // =========================
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS orders (
			id TEXT PRIMARY KEY UNIQUE, -- UUID for order
			data TEXT NOT NULL          -- JSON string with order details (cart, user, status, etc.)
		)
		`
  ).run();
}
