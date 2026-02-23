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
exports.CrmService = void 0;
const tsyringe_1 = require("tsyringe");
const CrmRepository_1 = require("../repositories/CrmRepository");
const ProjectsService_1 = require("../../projects/services/ProjectsService");
const AppError_1 = require("../../../shared/utils/AppError");
const client_1 = require("@prisma/client");
let CrmService = class CrmService {
    crmRepository;
    projectsService;
    constructor(crmRepository, projectsService) {
        this.crmRepository = crmRepository;
        this.projectsService = projectsService;
    }
    async createAccount(data) {
        return this.crmRepository.createAccount(data);
    }
    async getAccounts() {
        return this.crmRepository.getAccounts();
    }
    async createOpportunity(dto) {
        console.log('CrmService: Creating Opportunity with DTO:', JSON.stringify(dto, null, 2));
        const data = {
            ...dto,
            stage: dto.stage || client_1.PipelineStage.PROSPECTING,
            ownerId: dto.ownerId || undefined,
            accountId: dto.accountId || undefined,
            clientId: dto.clientId || undefined,
            probability: Math.round(dto.probability),
            dealValue: dto.dealValue
        };
        return this.crmRepository.createOpportunity(data);
    }
    async updateOpportunityStage(id, data) {
        if (!id)
            throw new AppError_1.AppError('Opportunity ID is required', 400);
        const oldOpp = await this.crmRepository.getOpportunities().then(opps => opps.find(o => o.id === id));
        if (!oldOpp)
            throw new AppError_1.AppError('Opportunity not found', 404);
        const updatedOpp = await this.crmRepository.updateOpportunityStage(id, data);
        if (data.stage === client_1.PipelineStage.CLOSED_WON && oldOpp.stage !== client_1.PipelineStage.CLOSED_WON) {
            console.log(`Opportunity ${id} moved to CLOSED_WON. Auto-creating project...`);
            try {
                await this.convertToProject(id, client_1.BillingModel.FIXED);
            }
            catch (err) {
                console.error(`Failed to auto-create project for opp ${id}:`, err);
                // We still want to return the updated opportunity even if project creation fails
            }
        }
        return updatedOpp;
    }
    async updateOpportunity(id, data) {
        if (!id)
            throw new AppError_1.AppError('Opportunity ID is required', 400);
        return this.crmRepository.updateOpportunity(id, data);
    }
    async convertToProject(opportunityId, billingModel = client_1.BillingModel.FIXED) {
        const opps = await this.crmRepository.getOpportunities();
        const opportunity = opps.find(o => o.id === opportunityId);
        if (!opportunity)
            throw new AppError_1.AppError('Opportunity not found', 404);
        if (opportunity.stage !== client_1.PipelineStage.CLOSED_WON) {
            throw new AppError_1.AppError('Only CLOSED_WON opportunities can be converted to projects', 400);
        }
        const project = await this.projectsService.createProject({
            opportunityId: opportunity.id,
            clientId: opportunity.clientId || undefined,
            name: opportunity.name,
            billingModel: billingModel,
            budget: Number(opportunity.dealValue)
        });
        return project;
    }
    async getOpportunities() {
        return this.crmRepository.getOpportunities();
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(CrmRepository_1.CrmRepository)),
    __param(1, (0, tsyringe_1.inject)(ProjectsService_1.ProjectsService)),
    __metadata("design:paramtypes", [CrmRepository_1.CrmRepository,
        ProjectsService_1.ProjectsService])
], CrmService);
