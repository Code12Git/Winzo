/*
  Warnings:

  - You are about to drop the column `number` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "number";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "number";
