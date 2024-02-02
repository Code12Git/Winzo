/*
  Warnings:

  - Changed the type of `won` on the `RandomUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RandomUser" DROP COLUMN "won",
ADD COLUMN     "won" INTEGER NOT NULL;
