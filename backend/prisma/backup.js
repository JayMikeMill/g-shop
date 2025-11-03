#!/usr/bin/env node
const { execSync } = require("child_process");

// pg_dump --dbname="postgresql://postgres.xbbovndnldxrkoozastv:GShopY3`$hua711@aws-1-us-east-2.pooler.supabase.com:5432/postgres" --file="gshop_backup.sql"
// psql "postgresql://postgres:GShopY3`$hua711@gshop-db.czowauoie5ln.us-east-2.rds.amazonaws.com:5432/gshop" -f "gshop_backup.sql"
// pg_dump --format=custom --no-owner --no-acl --dbname="postgresql://postgres.xbbovndnldxrkoozastv:GShopY3`$hua711@aws-1-us-east-2.pooler.supabase.com:5432/postgres" --file="supabase_clean.dump"

// pg_dump --format=custom --no-owner --no-acl `
//   --exclude-extension=pg_graphql `
//   --exclude-extension=supabase_vault `
//   --exclude-schema=auth `
//   --exclude-schema=graphql `
//   --exclude-schema=vault `
//   --exclude-schema=storage `
//   --exclude-schema=pgbouncer `
//   --dbname="postgresql://postgres.xbbovndnldxrkoozastv:GShopY3`$hua711@aws-1-us-east-2.pooler.supabase.com:5432/postgres" `
//   --file="gshop.dump"

// pg_restore --dbname="postgresql://postgres.ryqzaybytwfqsppjhmvw:Chuck`$h0p2025@aws-1-us-east-2.pooler.supabase.com:5432/postgres" --clean --if-exists --no-owner --no-acl "gshop.dump"

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
