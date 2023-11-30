/*
  Warnings:

  - You are about to drop the column `screenshot` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "screenshot";

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
