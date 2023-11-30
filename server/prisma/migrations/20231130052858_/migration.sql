/*
  Warnings:

  - Added the required column `screenshot` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "screenshot" TEXT NOT NULL,
ALTER COLUMN "withdrawal" DROP NOT NULL;
