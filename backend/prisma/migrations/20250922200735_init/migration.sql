/*
  Warnings:

  - Added the required column `productId` to the `ProductTag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductTag" ("color", "id", "name") SELECT "color", "id", "name" FROM "ProductTag";
DROP TABLE "ProductTag";
ALTER TABLE "new_ProductTag" RENAME TO "ProductTag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
