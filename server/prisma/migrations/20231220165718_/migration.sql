-- CreateTable
CREATE TABLE "UserModalState" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isOpen" BOOLEAN NOT NULL,

    CONSTRAINT "UserModalState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserModalState" ADD CONSTRAINT "UserModalState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
