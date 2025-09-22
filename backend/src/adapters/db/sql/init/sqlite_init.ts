import Database from "better-sqlite3";
import { SQLTables } from "./sql_tables";

// Exported function: initialize all tables
export function initTables(db: Database.Database) {
  for (const [tableName, fields] of Object.entries(SQLTables)) {
    syncTable(db, tableName, fields);
  }

  dropExtraTables(db);

  console.log("SQLite: Tables synced.");
}

// =========================
// Private helper: sync a single table
// =========================
function syncTable(
  db: Database.Database,
  tableName: string,
  fields: Record<string, string>
) {
  const schemaCols = Object.keys(fields);

  // -------------------------
  // Get existing columns for this table
  // -------------------------
  const existingCols = db
    .prepare(`PRAGMA table_info(${tableName})`)
    .all()
    .map((col: any) => col.name);

  // -------------------------
  // Remove extra columns if any
  // -------------------------
  const removeCols = existingCols.filter((c) => !schemaCols.includes(c));
  if (removeCols.length) {
    const tempTable = `${tableName}_temp`;
    const columnsDef = Object.entries(fields)
      .map(([key, type]) => `${key} ${type.split(" --")[0]}`)
      .join(", ");
    db.prepare(`CREATE TABLE ${tempTable} (${columnsDef})`).run();

    // Copy over only the columns that exist in both old and new schema
    const keepCols = schemaCols.filter((c) => existingCols.includes(c));
    if (keepCols.length) {
      const colsList = keepCols.join(", ");
      db.prepare(
        `INSERT INTO ${tempTable} (${colsList}) SELECT ${colsList} FROM ${tableName}`
      ).run();
    }

    db.prepare(`DROP TABLE ${tableName}`).run();
    db.prepare(`ALTER TABLE ${tempTable} RENAME TO ${tableName}`).run();
    console.log(
      `SQLite: Table '${tableName}' - removed columns: ${removeCols}`
    );
  }

  // -------------------------
  // Create table if it doesn't exist
  // -------------------------
  if (existingCols.length === 0) {
    const columnsDef = Object.entries(fields)
      .map(([key, type]) => `${key} ${type.split(" --")[0]}`)
      .join(", ");
    db.prepare(`CREATE TABLE ${tableName} (${columnsDef})`).run();
    console.log(`SQLite: Table '${tableName}' created.`);
  }

  // -------------------------
  // Add missing columns
  // -------------------------
  const updatedExistingCols = db
    .prepare(`PRAGMA table_info(${tableName})`)
    .all()
    .map((col: any) => col.name);

  const addCols = schemaCols.filter((c) => !updatedExistingCols.includes(c));
  if (addCols.length) {
    const sql = addCols
      .map(
        (c) =>
          `ALTER TABLE ${tableName} ADD COLUMN ${c} ${fields[c].split(" --")[0]};`
      )
      .join("\n");
    db.exec(sql);
    console.log(`SQLite: Table '${tableName}' - added columns: ${addCols}`);
  }
}

// Drop tables not in schema
function dropExtraTables(db: Database.Database) {
  const existingTables = db
    .prepare(`SELECT name FROM sqlite_master WHERE type='table'`)
    .all()
    .map((row: any) => row.name);

  for (const table of existingTables as string[]) {
    // Skip system tables
    if (table.startsWith("sqlite_")) continue;

    if (!(table in SQLTables)) {
      db.prepare(`DROP TABLE ${table}`).run(); // drops the table and all its data
      console.log(`SQLite: Dropped extra table '${table}' not in schema.`);
    }
  }
}
