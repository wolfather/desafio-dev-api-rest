/*
  Warnings:

  - You are about to drop the column `value` on the `Account` table. All the data in the column will be lost.

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
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Account" ("accountNumber", "agency", "balance", "blocked", "createdAt", "documentNumber", "id", "number", "updatedAt") SELECT "accountNumber", "agency", "balance", "blocked", "createdAt", "documentNumber", "id", "number", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_accountNumber_key" ON "Account"("accountNumber");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "documentNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "documentNumber", "firstName", "id", "lastName", "updatedAt") SELECT "createdAt", "documentNumber", "firstName", "id", "lastName", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_documentNumber_key" ON "User"("documentNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
