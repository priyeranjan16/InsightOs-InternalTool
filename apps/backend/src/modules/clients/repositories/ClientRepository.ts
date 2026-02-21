import { PrismaClient, Client } from '@prisma/client';
import { singleton, inject } from 'tsyringe';

@singleton()
export class ClientRepository {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) { }

    async create(data: { name: string; email?: string; phone?: string; address?: string }): Promise<Client> {
        return this.prisma.client.create({
            data
        });
    }

    async findAll(): Promise<Client[]> {
        return this.prisma.client.findMany({
            include: {
                _count: {
                    select: { projects: true, opportunities: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string): Promise<Client | null> {
        return this.prisma.client.findUnique({
            where: { id },
            include: {
                projects: true,
                opportunities: true
            }
        });
    }

    async update(id: string, data: Partial<{ name: string; email: string; phone: string; address: string }>): Promise<Client> {
        return this.prisma.client.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<Client> {
        return this.prisma.client.delete({
            where: { id }
        });
    }
}
