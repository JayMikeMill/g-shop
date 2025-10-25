#!/usr/bin/env node
const { execSync } = require("child_process");

// Function to generate readable timestamp without seconds
function getTimestamp() {
  const pad = (n) => (n < 10 ? "0" + n : n);
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "_" +
    pad(d.getHours()) +
    "-" +
    pad(d.getMinutes())
  );
}
const timestamp = getTimestamp();
const fileName = `../../gshop_backup_${timestamp}.sql`;

const connectionString =
  "postgresql://postgres.xbbovndnldxrkoozastv:GShopY3$hua711@aws-1-us-east-2.pooler.supabase.com:5432/postgres";

const command = `pg_dump --dbname="${connectionString}" --file="${fileName}"`;

console.log(`Backing up database to ${fileName}...`);

try {
  execSync(command, { stdio: "inherit" });
  console.log(`✅ Backup complete: ${fileName}`);
} catch (error) {
  console.error("❌ Backup failed:", error.message);
  process.exit(1);
}
