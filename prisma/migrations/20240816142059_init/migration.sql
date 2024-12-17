/*
  Warnings:

  - You are about to drop the column `currency` on the `Terminal` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Terminal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "merchantCode" TEXT NOT NULL,
    "merchantName" TEXT NOT NULL,
    "merchantCity" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL
);
INSERT INTO "new_Terminal" ("countryCode", "currencyCode", "id", "merchantCity", "merchantCode", "merchantName", "symbol") SELECT "countryCode", "currencyCode", "id", "merchantCity", "merchantCode", "merchantName", "symbol" FROM "Terminal";
DROP TABLE "Terminal";
ALTER TABLE "new_Terminal" RENAME TO "Terminal";
CREATE UNIQUE INDEX "Terminal_id_key" ON "Terminal"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
