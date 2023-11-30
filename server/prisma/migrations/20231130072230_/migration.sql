/*
  Warnings:

  - You are about to drop the column `userId` on the `Screenshot` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Screenshot" DROP CONSTRAINT "Screenshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Screenshot" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userId";
