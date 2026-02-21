import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { ProposalService } from '../services/ProposalService';
import { CreateProposalSchema, UpdateProposalSchema } from '../dtos/ProposalDTO';

@injectable()
export class ProposalController {
    constructor(@inject(ProposalService) private proposalService: ProposalService) { }

    createProposal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = CreateProposalSchema.parse(req.body);
            const proposal = await this.proposalService.createProposal(parsedData);
            res.status(201).json({ status: 'success', data: proposal });
        } catch (err) {
            next(err);
        }
    };

    getProposals = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const proposals = await this.proposalService.getProposals();
            res.status(200).json({ status: 'success', data: proposals });
        } catch (err) {
            next(err);
        }
    };

    getProposal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const proposal = await this.proposalService.getProposal(req.params.id);
            res.status(200).json({ status: 'success', data: proposal });
        } catch (err) {
            next(err);
        }
    };

    updateProposal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = UpdateProposalSchema.parse(req.body);
            const proposal = await this.proposalService.updateProposal(req.params.id, parsedData);
            res.status(200).json({ status: 'success', data: proposal });
        } catch (err) {
            next(err);
        }
    };

    deleteProposal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.proposalService.deleteProposal(req.params.id);
            res.status(204).json({ status: 'success', data: null });
        } catch (err) {
            next(err);
        }
    };
}
