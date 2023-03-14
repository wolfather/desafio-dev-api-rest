/*
  Warnings:

  - You are about to drop the column `balance` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "documentNumber" INTEGER NOT NULL,
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
