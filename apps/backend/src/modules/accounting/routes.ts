import { Router } from 'express';
import { container } from 'tsyringe';
import { AccountingController } from './controllers/AccountingController';
import { protect, restrictTo } from '../../shared/middlewares/authMiddleware';

const router = Router();
const accountingController = container.resolve(AccountingController);

router.use(protect);

router.post('/invoices', restrictTo('ADMIN', 'FINANCE'), accountingController.createInvoice);
router.get('/invoices', restrictTo('ADMIN', 'FINANCE', 'PROJECT_MANAGER'), accountingController.getInvoices);

router.post('/expenses', restrictTo('ADMIN', 'FINANCE', 'EMPLOYEE'), accountingController.createExpense);
router.get('/expenses', restrictTo('ADMIN', 'FINANCE'), accountingController.getExpenses);

router.get('/reports/gstr1', restrictTo('ADMIN', 'FINANCE'), accountingController.getGstr1);

export default router;
