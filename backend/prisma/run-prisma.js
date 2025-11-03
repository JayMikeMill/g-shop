#!/usr/bin/env node
const { execSync } = require("child_process");

// NPM passes the first argument as process.argv[2] when run like "npm run prisma gen"
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: npm run prisma <gen|push-force|push-reset|backup>");
  process.exit(1);
}

const command = args[0];

const cwd = __dirname; // absolute path to this script

const schemaFile = cwd + "/../schema.prisma";
try {
  if (command === "gen") {
    execSync(`npx prisma generate --schema=${schemaFile}`, {
      cwd,
      stdio: "inherit",
    });
    execSync("node post-typegen.js", { cwd, stdio: "inherit" });
  } else if (command === "push") {
    execSync(`npx prisma db push --schema=${schemaFile}`, {
      cwd: "prisma",
      stdio: "inherit",
    });
    execSync("node post-typegen.js", { cwd, stdio: "inherit" });
  } else if (command === "push-force") {
    execSync(`npx prisma db push --force --schema=${schemaFile}`, {
      cwd,
      stdio: "inherit",
    });
    execSync("node post-typegen.js", { cwd, stdio: "inherit" });
  } else if (command === "push-reset") {
    execSync(`npx prisma db push --force --reset --schema=${schemaFile}`, {
      cwd: `${cwd}/..`,
      stdio: "inherit",
    });
    execSync("node post-typegen.js", { cwd, stdio: "inherit" });
  } else if (command === "backup") {
    execSync("node backup.js", { cwd, stdio: "inherit" });
  } else {
    console.error(
      "Invalid command. Only 'gen', 'push-force', 'push-reset', or 'backup' allowed."
    );
    process.exit(1);
  }

  const commandText =
    command === "gen" ? "generation" : command === "push" ? "push" : "backup";
  console.log(
    "\n✅ Prisma " + commandText + " complete and types updated successfully!"
  );
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
