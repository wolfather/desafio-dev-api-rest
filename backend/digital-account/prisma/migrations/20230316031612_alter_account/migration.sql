/*
  Warnings:

  - Added the required column `withdrawValue` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountNumber" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL,
    "balance" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "agency" INTEGER NOT NULL,
    "withdrawValue" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Account" ("accountNumber", "agency", "balance", "blocked", "createdAt", "documentNumber", "id", "number", "updatedAt") SELECT "accountNumber", "agency", "balance", "blocked", "createdAt", "documentNumber", "id", "number", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_accountNumber_key" ON "Account"("accountNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
