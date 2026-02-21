import { injectable, inject } from 'tsyringe';
import { PrismaClient, Account, Opportunity } from '@prisma/client';
import { CreateAccountDTO, CreateOpportunityDTO, UpdateOpportunityStageDTO, UpdateOpportunityDTO } from '../dtos/CrmDTO';

@injectable()
export class CrmRepository {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) { }

    async createAccount(data: CreateAccountDTO): Promise<Account> {
        return this.prisma.account.create({ data });
    }

    async getAccounts(): Promise<Account[]> {
        return this.prisma.account.findMany({ include: { opportunities: true } });
    }

    async createOpportunity(data: CreateOpportunityDTO): Promise<Opportunity> {
        try {
            return await this.prisma.opportunity.create({ data: data as any });
        } catch (err: any) {
            console.error('CrmRepository: Prisma creation failed. Data:', JSON.stringify(data, null, 2));
            console.error('Prisma Error Details:', err);
            throw err;
        }
    }

    async updateOpportunityStage(id: string, data: UpdateOpportunityStageDTO): Promise<Opportunity> {
        return this.prisma.opportunity.update({
            where: { id },
            data,
        });
    }

    async updateOpportunity(id: string, data: UpdateOpportunityDTO): Promise<Opportunity> {
        return this.prisma.opportunity.update({
            where: { id },
            data: data as any,
        });
    }

    async getOpportunities(): Promise<Opportunity[]> {
        return this.prisma.opportunity.findMany({ include: { account: true, client: true, owner: true, activities: true } });
    }
}
