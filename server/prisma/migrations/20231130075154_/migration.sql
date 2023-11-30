/*
  Warnings:

  - You are about to drop the column `screenshot` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "screenshot";

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" SERIAL NOT NULL,
    "screenshot" TEXT NOT NULL,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);
