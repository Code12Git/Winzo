/*
  Warnings:

  - Added the required column `userId` to the `Screenshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Screenshot" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
