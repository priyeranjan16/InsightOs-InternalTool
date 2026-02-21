-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_accountId_fkey";

-- AlterTable
ALTER TABLE "Opportunity" ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
