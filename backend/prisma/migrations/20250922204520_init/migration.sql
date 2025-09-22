-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollectionImageSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "banner" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    CONSTRAINT "CollectionImageSet_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CollectionImageSet" ("banner", "collectionId", "id", "preview", "thumbnail") SELECT "banner", "collectionId", "id", "preview", "thumbnail" FROM "CollectionImageSet";
DROP TABLE "CollectionImageSet";
ALTER TABLE "new_CollectionImageSet" RENAME TO "CollectionImageSet";
CREATE UNIQUE INDEX "CollectionImageSet_collectionId_key" ON "CollectionImageSet"("collectionId");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("createdAt", "id", "invoiceNumber", "orderId", "pdfUrl") SELECT "createdAt", "id", "invoiceNumber", "orderId", "pdfUrl" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("id", "orderId", "price", "productId", "quantity", "variantId") SELECT "id", "orderId", "price", "productId", "quantity", "variantId" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
CREATE TABLE "new_OrderStatusHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderStatusHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderStatusHistory" ("id", "orderId", "status", "timestamp") SELECT "id", "orderId", "status", "timestamp" FROM "OrderStatusHistory";
DROP TABLE "OrderStatusHistory";
ALTER TABLE "new_OrderStatusHistory" RENAME TO "OrderStatusHistory";
CREATE TABLE "new_ProductDimensions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "weight_grams" REAL,
    "length_cm" REAL,
    "width_cm" REAL,
    "height_cm" REAL,
    CONSTRAINT "ProductDimensions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductDimensions" ("height_cm", "id", "length_cm", "productId", "weight_grams", "width_cm") SELECT "height_cm", "id", "length_cm", "productId", "weight_grams", "width_cm" FROM "ProductDimensions";
DROP TABLE "ProductDimensions";
ALTER TABLE "new_ProductDimensions" RENAME TO "ProductDimensions";
CREATE UNIQUE INDEX "ProductDimensions_productId_key" ON "ProductDimensions"("productId");
CREATE TABLE "new_ProductImageSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "main" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    CONSTRAINT "ProductImageSet_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductImageSet" ("id", "main", "preview", "productId", "thumbnail") SELECT "id", "main", "preview", "productId", "thumbnail" FROM "ProductImageSet";
DROP TABLE "ProductImageSet";
ALTER TABLE "new_ProductImageSet" RENAME TO "ProductImageSet";
CREATE TABLE "new_ProductOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductOption" ("id", "name", "productId") SELECT "id", "name", "productId" FROM "ProductOption";
DROP TABLE "ProductOption";
ALTER TABLE "new_ProductOption" RENAME TO "ProductOption";
CREATE TABLE "new_ProductOptionPresetValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "presetId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "ProductOptionPresetValue_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "ProductOptionPreset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductOptionPresetValue" ("id", "presetId", "value") SELECT "id", "presetId", "value" FROM "ProductOptionPresetValue";
DROP TABLE "ProductOptionPresetValue";
ALTER TABLE "new_ProductOptionPresetValue" RENAME TO "ProductOptionPresetValue";
CREATE TABLE "new_ProductOptionValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productOptionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "ProductOptionValue_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductOptionValue" ("id", "productOptionId", "value") SELECT "id", "productOptionId", "value" FROM "ProductOptionValue";
DROP TABLE "ProductOptionValue";
ALTER TABLE "new_ProductOptionValue" RENAME TO "ProductOptionValue";
CREATE TABLE "new_ProductReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductReview" ("comment", "createdAt", "id", "productId", "rating", "userId") SELECT "comment", "createdAt", "id", "productId", "rating", "userId" FROM "ProductReview";
DROP TABLE "ProductReview";
ALTER TABLE "new_ProductReview" RENAME TO "ProductReview";
CREATE TABLE "new_ProductTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductTag" ("color", "id", "name", "productId") SELECT "color", "id", "name", "productId" FROM "ProductTag";
DROP TABLE "ProductTag";
ALTER TABLE "new_ProductTag" RENAME TO "ProductTag";
CREATE TABLE "new_ProductVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "sku" TEXT,
    "priceOverride" REAL,
    "stock" INTEGER NOT NULL,
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductVariant" ("id", "priceOverride", "productId", "sku", "stock") SELECT "id", "priceOverride", "productId", "sku", "stock" FROM "ProductVariant";
DROP TABLE "ProductVariant";
ALTER TABLE "new_ProductVariant" RENAME TO "ProductVariant";
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "billingAddress" JSONB,
    CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "billingAddress", "currency", "id", "method", "orderId", "status") SELECT "amount", "billingAddress", "currency", "id", "method", "orderId", "status" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");
CREATE TABLE "new_UserAddress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserAddress" ("city", "country", "id", "isDefault", "label", "state", "street", "userId", "zip") SELECT "city", "country", "id", "isDefault", "label", "state", "street", "userId", "zip" FROM "UserAddress";
DROP TABLE "UserAddress";
ALTER TABLE "new_UserAddress" RENAME TO "UserAddress";
CREATE TABLE "new_UserPaymentMethod" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "last4" TEXT NOT NULL,
    "expiry" TEXT NOT NULL,
    "providerToken" TEXT NOT NULL,
    CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserPaymentMethod" ("expiry", "id", "last4", "providerToken", "type", "userId") SELECT "expiry", "id", "last4", "providerToken", "type", "userId" FROM "UserPaymentMethod";
DROP TABLE "UserPaymentMethod";
ALTER TABLE "new_UserPaymentMethod" RENAME TO "UserPaymentMethod";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
