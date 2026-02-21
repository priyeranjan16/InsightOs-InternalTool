import { injectable, inject } from 'tsyringe';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { CreateProposalDTO, UpdateProposalDTO } from '../dtos/ProposalDTO';
import { AppError } from '../../../shared/utils/AppError';

@injectable()
export class ProposalService {
    constructor(@inject(ProposalRepository) private proposalRepository: ProposalRepository) { }

    async createProposal(data: CreateProposalDTO) {
        return this.proposalRepository.create(data);
    }

    async getProposals() {
        return this.proposalRepository.findAll();
    }

    async getProposal(id: string) {
        const proposal = await this.proposalRepository.findById(id);
        if (!proposal) throw new AppError('Proposal not found', 404);
        return proposal;
    }

    async updateProposal(id: string, data: UpdateProposalDTO) {
        return this.proposalRepository.update(id, data);
    }

    async deleteProposal(id: string) {
        return this.proposalRepository.delete(id);
    }
}
