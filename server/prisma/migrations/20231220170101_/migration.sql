/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserModalState` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserModalState_userId_key" ON "UserModalState"("userId");
