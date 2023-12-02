/*
  Warnings:

  - You are about to drop the column `balance` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "balance";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" INTEGER;
