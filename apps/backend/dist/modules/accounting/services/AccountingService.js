"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
const tsyringe_1 = require("tsyringe");
const AccountingRepository_1 = require("../repositories/AccountingRepository");
const ProjectsRepository_1 = require("../../projects/repositories/ProjectsRepository");
const GST_RATE = 0.18; // 18% standard GST rate for services
let AccountingService = class AccountingService {
    accountingRepository;
    projectsRepository;
    constructor(accountingRepository, projectsRepository) {
        this.accountingRepository = accountingRepository;
        this.projectsRepository = projectsRepository;
    }
    async createInvoice(dto) {
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
        }
        else {
            cgst = taxAmount / 2;
            sgst = taxAmount / 2;
        }
        const total = dto.amount + taxAmount;
        const invoiceDate = dto.date ? new Date(dto.date) : new Date();
        const dueDate = dto.dueDate ? new Date(dto.dueDate) : new Date(invoiceDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Net 30 default
        return this.accountingRepository.createInvoice({
            projectId: dto.projectId,
            clientId,
            amount: dto.amount,
            cgst,
            sgst,
            igst,
            total,
            items: dto.items,
            hsnSacCode: dto.hsnSacCode,
            status: dto.status || 'SENT',
            date: invoiceDate,
            dueDate: dueDate,
        });
    }
    async getInvoices() {
        return this.accountingRepository.getInvoices();
    }
    async createExpense(dto) {
        const taxAmount = dto.amount * GST_RATE;
        let cgst = 0, sgst = 0, igst = 0;
        if (dto.isInterState) {
            igst = taxAmount;
        }
        else {
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
        const b2b = [];
        const b2c = [];
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
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AccountingRepository_1.AccountingRepository)),
    __param(1, (0, tsyringe_1.inject)(ProjectsRepository_1.ProjectsRepository)),
    __metadata("design:paramtypes", [AccountingRepository_1.AccountingRepository,
        ProjectsRepository_1.ProjectsRepository])
], AccountingService);
