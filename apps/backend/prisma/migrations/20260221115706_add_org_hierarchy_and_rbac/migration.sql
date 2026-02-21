-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MARKETING';

-- AlterTable
ALTER TABLE "BusinessUnit" ADD COLUMN     "parentId" TEXT;

-- CreateTable
CREATE TABLE "OrgRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" TEXT[],

    CONSTRAINT "OrgRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgUserMapping" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "OrgUserMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrgRole_name_key" ON "OrgRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OrgUserMapping_userId_unitId_key" ON "OrgUserMapping"("userId", "unitId");

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUserMapping" ADD CONSTRAINT "OrgUserMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUserMapping" ADD CONSTRAINT "OrgUserMapping_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUserMapping" ADD CONSTRAINT "OrgUserMapping_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "OrgRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
