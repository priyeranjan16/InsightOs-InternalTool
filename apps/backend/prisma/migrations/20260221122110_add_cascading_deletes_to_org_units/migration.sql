-- DropForeignKey
ALTER TABLE "BusinessUnit" DROP CONSTRAINT "BusinessUnit_parentId_fkey";

-- DropForeignKey
ALTER TABLE "OrgUserMapping" DROP CONSTRAINT "OrgUserMapping_unitId_fkey";

-- DropForeignKey
ALTER TABLE "OrgUserMapping" DROP CONSTRAINT "OrgUserMapping_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_businessUnitId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "businessUnitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BusinessUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUserMapping" ADD CONSTRAINT "OrgUserMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUserMapping" ADD CONSTRAINT "OrgUserMapping_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
