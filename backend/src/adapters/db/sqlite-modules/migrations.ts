import Database from "better-sqlite3";

export function initTables(db: Database.Database) {
  // USERS
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY UNIQUE,
			data TEXT NOT NULL
		)
	`
  ).run();

  // PRODUCTS
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS products (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			price REAL NOT NULL,
			discount TEXT,
			description TEXT NOT NULL,
			tags TEXT,
			stock INTEGER NOT NULL
		)
	`
  ).run();

  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS product_images (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			product_id INTEGER NOT NULL,
			main TEXT NOT NULL,
			preview TEXT NOT NULL,
			thumbnail TEXT NOT NULL,
			FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
		)
	`
  ).run();

  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS product_options (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			product_id INTEGER NOT NULL,
			name TEXT NOT NULL,
			type TEXT NOT NULL,
			FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
		)
	`
  ).run();

  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS product_option_values (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			option_id INTEGER NOT NULL,
			value TEXT NOT NULL,
			stock INTEGER DEFAULT 0,
			FOREIGN KEY(option_id) REFERENCES product_options(id) ON DELETE CASCADE
		)
	`
  ).run();

  // ORDERS
  db.prepare(
    `
		CREATE TABLE IF NOT EXISTS orders (
			id TEXT PRIMARY KEY UNIQUE,
			data TEXT NOT NULL
		)
	`
  ).run();
}
