-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "betAmount" INTEGER,
ALTER COLUMN "balance" DROP NOT NULL;
