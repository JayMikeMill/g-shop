// batchReplaceArrays.ts
import fs from "fs";
import path from "path";

// Path to your generated TS file
const filePath = path.join(__dirname, "PrismaTypes.ts");

// Read the file
let content = fs.readFileSync(filePath, "utf-8");

// Array of [find, replace] pairs
const replacements: [string, string][] = [
  ["id:", "id?:"],
  ["Id:", "Id?:"],
  ["createdAt:", "createdAt?:"],
  ["updatedAt:", "updatedAt?:"],
  ["values: JsonValue", "values: string[]"],
  ["options: JsonValue", "options: string[]"],
  ["productOptions: JsonValue", "productOptions: ProductOption[]"],
  ["product: JsonValue;", "product: Product"],
  ["variant?: JsonValue | null", "variant?: ProductVariant"],
  // Add more [find, replace] pairs here
];

// Apply all replacements
for (const [find, replace] of replacements) {
  // Escape special regex chars in find string
  const escapedFind = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedFind, "g");
  content = content.replace(regex, replace);
}

// Write the modified file back
fs.writeFileSync(filePath, content, "utf-8");

console.log("✅ All replacements applied successfully!");
