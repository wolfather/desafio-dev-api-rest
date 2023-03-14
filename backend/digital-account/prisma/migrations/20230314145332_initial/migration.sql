-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "documentNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountNumber" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "blocked" BOOLEAN NOT NULL,
    "balance" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "agency" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "jointaccounts" (
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "accountId"),
    CONSTRAINT "jointaccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("documentNumber") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jointaccounts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_documentNumber_key" ON "users"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_accountNumber_key" ON "accounts"("accountNumber");
