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
exports.CrmRepository = void 0;
const tsyringe_1 = require("tsyringe");
const client_1 = require("@prisma/client");
let CrmRepository = class CrmRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAccount(data) {
        return this.prisma.account.create({ data });
    }
    async getAccounts() {
        return this.prisma.account.findMany({ include: { opportunities: true } });
    }
    async createOpportunity(data) {
        try {
            return await this.prisma.opportunity.create({ data: data });
        }
        catch (err) {
            console.error('CrmRepository: Prisma creation failed. Data:', JSON.stringify(data, null, 2));
            console.error('Prisma Error Details:', err);
            throw err;
        }
    }
    async updateOpportunityStage(id, data) {
        return this.prisma.opportunity.update({
            where: { id },
            data,
        });
    }
    async updateOpportunity(id, data) {
        return this.prisma.opportunity.update({
            where: { id },
            data: data,
        });
    }
    async getOpportunities() {
        return this.prisma.opportunity.findMany({ include: { account: true, client: true, owner: true, activities: true } });
    }
};
exports.CrmRepository = CrmRepository;
exports.CrmRepository = CrmRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('PrismaClient')),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], CrmRepository);
