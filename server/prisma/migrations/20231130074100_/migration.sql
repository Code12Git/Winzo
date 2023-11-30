/*
  Warnings:

  - You are about to drop the `Screenshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "screenshot" TEXT;

-- DropTable
DROP TABLE "Screenshot";
