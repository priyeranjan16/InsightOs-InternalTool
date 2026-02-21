import { PrismaClient, BusinessUnit, OrgRole, OrgUserMapping } from '@prisma/client';
import { singleton, inject } from 'tsyringe';

@singleton()
export class OrgUnitRepository {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) { }

    async create(data: { name: string; parentId?: string }): Promise<BusinessUnit> {
        return this.prisma.businessUnit.create({
            data: {
                name: data.name,
                parentId: data.parentId || null,
            },
        });
    }

    async findAll(): Promise<BusinessUnit[]> {
        return this.prisma.businessUnit.findMany({
            include: {
                children: true,
                _count: {
                    select: { mappings: true }
                }
            },
        });
    }

    async findTree() {
        const units = await this.prisma.businessUnit.findMany({
            include: {
                children: true,
                mappings: {
                    include: {
                        user: {
                            select: { id: true, email: true }
                        },
                        role: true
                    }
                }
            }
        });

        // Simple tree builder
        const buildTree = (parentId: string | null = null): any[] => {
            return units
                .filter(u => u.parentId === parentId)
                .map(u => ({
                    ...u,
                    children: buildTree(u.id)
                }));
        };

        return buildTree(null);
    }

    async update(id: string, data: { name: string }): Promise<BusinessUnit> {
        return this.prisma.businessUnit.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<BusinessUnit> {
        return this.prisma.businessUnit.delete({
            where: { id },
        });
    }

    async mapUser(userId: string, unitId: string, roleId: string): Promise<OrgUserMapping> {
        return this.prisma.orgUserMapping.upsert({
            where: {
                userId_unitId: { userId, unitId }
            },
            update: { roleId },
            create: { userId, unitId, roleId }
        });
    }

    async getRoles(): Promise<OrgRole[]> {
        return this.prisma.orgRole.findMany();
    }
}
