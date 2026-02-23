import { injectable, inject } from 'tsyringe';
import { CrmRepository } from '../repositories/CrmRepository';
import { ProjectsService } from '../../projects/services/ProjectsService';
import { CreateAccountDTO, CreateOpportunityDTO, UpdateOpportunityStageDTO, UpdateOpportunityDTO } from '../dtos/CrmDTO';
import { AppError } from '../../../shared/utils/AppError';
import { PipelineStage, BillingModel } from '@prisma/client';

@injectable()
export class CrmService {
    constructor(
        @inject(CrmRepository) private crmRepository: CrmRepository,
        @inject(ProjectsService) private projectsService: ProjectsService
    ) { }

    async createAccount(data: CreateAccountDTO) {
        return this.crmRepository.createAccount(data);
    }

    async getAccounts() {
        return this.crmRepository.getAccounts();
    }

    async createOpportunity(dto: CreateOpportunityDTO) {
        console.log('CrmService: Creating Opportunity with DTO:', JSON.stringify(dto, null, 2));
        const data = {
            ...dto,
            stage: (dto.stage as PipelineStage) || PipelineStage.PROSPECTING,
            ownerId: dto.ownerId || undefined,
            accountId: dto.accountId || undefined,
            clientId: dto.clientId || undefined,
            probability: Math.round(dto.probability),
            dealValue: dto.dealValue
        };
        return this.crmRepository.createOpportunity(data);
    }

    async updateOpportunityStage(id: string, data: UpdateOpportunityStageDTO) {
        if (!id) throw new AppError('Opportunity ID is required', 400);

        const oldOpp = await this.crmRepository.getOpportunities().then(opps => opps.find(o => o.id === id));
        if (!oldOpp) throw new AppError('Opportunity not found', 404);

        const updatedOpp = await this.crmRepository.updateOpportunityStage(id, data);

        if (data.stage === PipelineStage.CLOSED_WON && oldOpp.stage !== PipelineStage.CLOSED_WON) {
            console.log(`Opportunity ${id} moved to CLOSED_WON. Auto-creating project...`);
            try {
                await this.convertToProject(id, BillingModel.FIXED);
            } catch (err) {
                console.error(`Failed to auto-create project for opp ${id}:`, err);
                // We still want to return the updated opportunity even if project creation fails
            }
        }

        return updatedOpp;
    }

    async updateOpportunity(id: string, data: UpdateOpportunityDTO) {
        if (!id) throw new AppError('Opportunity ID is required', 400);
        return this.crmRepository.updateOpportunity(id, data);
    }

    async convertToProject(opportunityId: string, billingModel: BillingModel = BillingModel.FIXED) {
        const opps = await this.crmRepository.getOpportunities();
        const opportunity = opps.find(o => o.id === opportunityId);

        if (!opportunity) throw new AppError('Opportunity not found', 404);
        if (opportunity.stage !== PipelineStage.CLOSED_WON) {
            throw new AppError('Only CLOSED_WON opportunities can be converted to projects', 400);
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
}
