/*
  Warnings:

  - You are about to drop the `JointAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "JointAccount";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "jointaccounts" (
    "userId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "accountId"),
    CONSTRAINT "jointaccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("documentNumber") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jointaccounts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("accountNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
