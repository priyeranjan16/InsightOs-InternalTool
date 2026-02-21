import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { AccountingService } from '../services/AccountingService';
import { CreateInvoiceSchema, CreateExpenseSchema } from '../dtos/AccountingDTO';

@injectable()
export class AccountingController {
    constructor(@inject(AccountingService) private accountingService: AccountingService) { }

    createInvoice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = CreateInvoiceSchema.parse(req.body);
            const invoice = await this.accountingService.createInvoice(parsedData);
            res.status(201).json({ status: 'success', data: invoice });
        } catch (err) {
            next(err);
        }
    };

    getInvoices = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const invoices = await this.accountingService.getInvoices();
            res.status(200).json({ status: 'success', data: invoices });
        } catch (err) {
            next(err);
        }
    };

    createExpense = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = CreateExpenseSchema.parse(req.body);
            const expense = await this.accountingService.createExpense(parsedData);
            res.status(201).json({ status: 'success', data: expense });
        } catch (err) {
            next(err);
        }
    };

    getExpenses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const expenses = await this.accountingService.getExpenses();
            res.status(200).json({ status: 'success', data: expenses });
        } catch (err) {
            next(err);
        }
    };

    getGstr1 = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const report = await this.accountingService.generateGstr1Report();
            res.status(200).json({ status: 'success', data: report });
        } catch (err) {
            next(err);
        }
    };
}
