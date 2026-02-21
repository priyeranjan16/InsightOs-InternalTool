import { injectable, inject } from 'tsyringe';
import { AccountingRepository } from '../repositories/AccountingRepository';
import { ProjectsRepository } from '../../projects/repositories/ProjectsRepository';
import { CreateInvoiceDTO, CreateExpenseDTO } from '../dtos/AccountingDTO';

const GST_RATE = 0.18; // 18% standard GST rate for services

@injectable()
export class AccountingService {
    constructor(
        @inject(AccountingRepository) private accountingRepository: AccountingRepository,
        @inject(ProjectsRepository) private projectsRepository: ProjectsRepository
    ) { }

    async createInvoice(dto: CreateInvoiceDTO) {
        const taxAmount = dto.amount * GST_RATE;
        let cgst = 0, sgst = 0, igst = 0;
        let clientId = dto.clientId;

        if (dto.projectId && !clientId) {
            const projects = await this.projectsRepository.getProjects();
            const project = projects.find(p => p.id === dto.projectId);
            if (project?.clientId) {
                clientId = project.clientId;
            }
        }

        if (dto.isInterState) {
            igst = taxAmount;
        } else {
            cgst = taxAmount / 2;
            sgst = taxAmount / 2;
        }

        const total = dto.amount + taxAmount;

        return this.accountingRepository.createInvoice({
            projectId: dto.projectId,
            clientId,
            amount: dto.amount,
            cgst,
            sgst,
            igst,
            total,
            hsnSacCode: dto.hsnSacCode,
            status: dto.status || 'SENT',
            date: dto.date || new Date(),
            dueDate: dto.dueDate,
        });
    }

    async getInvoices() {
        return this.accountingRepository.getInvoices();
    }

    async createExpense(dto: CreateExpenseDTO) {
        const taxAmount = dto.amount * GST_RATE;
        let cgst = 0, sgst = 0, igst = 0;

        if (dto.isInterState) {
            igst = taxAmount;
        } else {
            cgst = taxAmount / 2;
            sgst = taxAmount / 2;
        }

        return this.accountingRepository.createExpense({
            description: dto.description,
            amount: dto.amount,
            category: dto.category,
            cgst,
            sgst,
            igst,
            isReverseCharge: dto.isReverseCharge,
            date: dto.date,
        });
    }

    async getExpenses() {
        return this.accountingRepository.getExpenses();
    }

    async generateGstr1Report() {
        const invoices = await this.accountingRepository.getInvoices();

        // GSTR-1 mock generation (B2B, B2C grouping based on GST logic)
        const b2b: any[] = [];
        const b2c: any[] = [];

        invoices.forEach(inv => {
            // Mock logic: assume all are B2C for simplicity in MVP unless specified
            b2c.push({
                invoiceId: inv.id,
                val: inv.amount,
                txval: inv.amount,
                iamt: inv.igst,
                camt: inv.cgst,
                samt: inv.sgst
            });
        });

        return {
            gstin: '07AAAAA0000A1Z5',
            fp: '102026',
            b2b,
            b2cl: b2c
        };
    }
}
