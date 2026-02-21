import { injectable, inject } from 'tsyringe';
import { PrismaClient, Invoice, Expense } from '@prisma/client';

@injectable()
export class AccountingRepository {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) { }

    async createInvoice(data: any): Promise<Invoice> {
        return this.prisma.invoice.create({ data });
    }

    async getInvoices(): Promise<Invoice[]> {
        return this.prisma.invoice.findMany({
            include: { project: true, client: true },
            orderBy: { date: 'desc' },
        });
    }

    async createExpense(data: any): Promise<Expense> {
        return this.prisma.expense.create({ data });
    }

    async getExpenses(): Promise<Expense[]> {
        return this.prisma.expense.findMany({
            orderBy: { date: 'desc' },
        });
    }
}
