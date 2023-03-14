/*
  Warnings:

  - The primary key for the `jointaccounts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jointaccounts" (
    "userId" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "accountId"),
    CONSTRAINT "jointaccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("documentNumber") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jointaccounts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_jointaccounts" ("accountId", "userId") SELECT "accountId", "userId" FROM "jointaccounts";
DROP TABLE "jointaccounts";
ALTER TABLE "new_jointaccounts" RENAME TO "jointaccounts";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "documentNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("createdAt", "documentNumber", "firstName", "id", "lastName", "updatedAt") SELECT "createdAt", "documentNumber", "firstName", "id", "lastName", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_documentNumber_key" ON "users"("documentNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
