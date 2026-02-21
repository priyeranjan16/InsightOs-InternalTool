import { PrismaClient, Proposal } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import { CreateProposalDTO, UpdateProposalDTO } from '../dtos/ProposalDTO';

@injectable()
export class ProposalRepository {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) { }

    async create(data: CreateProposalDTO): Promise<Proposal> {
        return this.prisma.proposal.create({
            data: data as any
        });
    }

    async findById(id: string): Promise<Proposal | null> {
        return this.prisma.proposal.findUnique({
            where: { id },
            include: {
                client: true,
                opportunity: true
            }
        });
    }

    async findAll(): Promise<Proposal[]> {
        return this.prisma.proposal.findMany({
            include: {
                client: true,
                opportunity: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async update(id: string, data: UpdateProposalDTO): Promise<Proposal> {
        return this.prisma.proposal.update({
            where: { id },
            data: data as any
        });
    }

    async delete(id: string): Promise<Proposal> {
        return this.prisma.proposal.delete({
            where: { id }
        });
    }
}
