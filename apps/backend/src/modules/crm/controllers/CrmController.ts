import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { CrmService } from '../services/CrmService';
import { CreateAccountSchema, CreateOpportunitySchema, UpdateOpportunityStageSchema, UpdateOpportunitySchema } from '../dtos/CrmDTO';
import { AppError } from '../../../shared/utils/AppError';

@injectable()
export class CrmController {
    constructor(@inject(CrmService) private crmService: CrmService) { }

    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = CreateAccountSchema.parse(req.body);
            const account = await this.crmService.createAccount(parsedData);
            res.status(201).json({ status: 'success', data: account });
        } catch (err) {
            next(err);
        }
    };

    getAccounts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accounts = await this.crmService.getAccounts();
            res.status(200).json({ status: 'success', data: accounts });
        } catch (err) {
            next(err);
        }
    };

    createOpportunity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Creating Opportunity with body:', req.body);
            const parsedData = CreateOpportunitySchema.parse(req.body);
            console.log('Parsed Data:', parsedData);
            const opp = await this.crmService.createOpportunity(parsedData);
            res.status(201).json({ status: 'success', data: opp });
        } catch (err: any) {
            console.error('CONTROLLER ERROR:', err);
            // Catch Prisma errors and re-throw with message
            if (err.code && err.message) {
                return next(new AppError(`Prisma Error [${err.code}]: ${err.message}`, 500));
            }
            next(err);
        }
    };

    updateOpportunityStage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = UpdateOpportunityStageSchema.parse(req.body);
            const { id } = req.params;
            const opp = await this.crmService.updateOpportunityStage(id, parsedData);
            res.status(200).json({ status: 'success', data: opp });
        } catch (err) {
            next(err);
        }
    };

    updateOpportunity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = UpdateOpportunitySchema.parse(req.body);
            const { id } = req.params;
            const opp = await this.crmService.updateOpportunity(id, parsedData);
            res.status(200).json({ status: 'success', data: opp });
        } catch (err) {
            next(err);
        }
    };

    convertToProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { billingModel } = req.body;
            const project = await this.crmService.convertToProject(id, billingModel);
            res.status(200).json({ status: 'success', data: project });
        } catch (err) {
            next(err);
        }
    };

    getOpportunities = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const opps = await this.crmService.getOpportunities();
            res.status(200).json({ status: 'success', data: opps });
        } catch (err) {
            next(err);
        }
    };
}
