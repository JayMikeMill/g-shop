// PostTypeGen.ts
import fs from "fs";
import path from "path";

// Path to your generated TS file
const filePath = path.join(__dirname, "PrismaTypes.ts");

// Read file content
let content = fs.readFileSync(filePath, "utf-8");

// --- Apply direct field replacements ---
const replacements: [string, string][] = [
  ["id:", "id?:"],
  ["Id:", "Id?:"],
  ["createdAt:", "createdAt?:"],
  ["updatedAt:", "updatedAt?:"],
];

for (const [find, replace] of replacements) {
  const escapedFind = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedFind, "g");
  content = content.replace(regex, replace);
}

// ---  Replace comment-guided JsonValue conversions (is*TYPE*) ---
content = content.replace(
  /\/\*\*\s*\n\s*\*\s*is\*([^\*]+)\*\s*\n\s*\*\s*\/\s*\n\s*([\w?]+:\s*)(JsonValue)([^\n;]*;)/g,
  (_match, typeName, prefix, _json, suffix) => {
    const cleanType = typeName.trim();
    return `${prefix}${cleanType}${suffix}`;
  }
);

// --- Convert multi-line block headers to single-line comments ---
content = content.replace(
  /\/\*\*\s*\n\s*\*\s*\/{59,}\s*\n\s*\*\s*(.*?)\s*\n\s*\*\s*\/{59,}\s*\n\s*\*\//g,
  (match, title) => {
    const cleaned = title.replace(/^\*?\s*\/{0,}\s*/, "").trim();
    return `//////////////////////////////////////////////////////////////\n// ${cleaned}\n//////////////////////////////////////////////////////////////\n`;
  }
);

// Write back the modified file
fs.writeFileSync(filePath, content, "utf-8");

console.log("✅ Headers and replacements applied successfully!");
