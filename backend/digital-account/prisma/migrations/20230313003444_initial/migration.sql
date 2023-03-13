-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "documentNumber" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "accountNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "blocked" BOOLEAN NOT NULL,
    "balance" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "agency" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "JointAccount" (
    "userId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "accountId"),
    CONSTRAINT "JointAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("documentNumber") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JointAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_documentNumber_key" ON "users"("documentNumber");
