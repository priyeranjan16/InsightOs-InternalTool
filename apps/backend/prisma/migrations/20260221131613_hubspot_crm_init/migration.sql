/*
  Warnings:

  - The values [QUALIFICATION,PROPOSAL] on the enum `PipelineStage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PipelineStage_new" AS ENUM ('PROSPECTING', 'INITIAL_MEETING', 'PROPOSAL_SENT', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST');
ALTER TABLE "Opportunity" ALTER COLUMN "stage" TYPE "PipelineStage_new" USING ("stage"::text::"PipelineStage_new");
ALTER TYPE "PipelineStage" RENAME TO "PipelineStage_old";
ALTER TYPE "PipelineStage_new" RENAME TO "PipelineStage";
DROP TYPE "PipelineStage_old";
COMMIT;

-- AlterTable
ALTER TABLE "Opportunity" ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
