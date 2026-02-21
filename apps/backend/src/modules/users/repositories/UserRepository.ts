import { injectable, inject } from 'tsyringe';
import { PrismaClient, User, BusinessUnit } from '@prisma/client';
import { RegisterUserDTO } from '../dtos/AuthDTO';

@injectable()
export class UserRepository {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: RegisterUserDTO, passwordHash: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                email: data.email,
                passwordHash,
                role: data.role as any,
                businessUnitId: data.businessUnitId || null,
            },
        });
    }

    async toggleStatus(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new Error('User not found');
        return this.prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive }
        });
    }

    async getBusinessUnits() {
        return this.prisma.businessUnit.findMany({
            include: {
                _count: {
                    select: { users: true }
                }
            }
        });
    }

    async getUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
                businessUnit: true,
                createdAt: true,
                orgMappings: {
                    include: {
                        unit: true,
                        role: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async createBusinessUnit(name: string): Promise<BusinessUnit> {
        return this.prisma.businessUnit.create({
            data: { name },
        });
    }
}
