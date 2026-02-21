import { Router } from 'express';
import { container } from 'tsyringe';
import { CrmController } from './controllers/CrmController';
import { protect, restrictTo } from '../../shared/middlewares/authMiddleware';

const router = Router();
const crmController = container.resolve(CrmController);

// Apply auth middleware to all CRM routes
router.use(protect);

router.post('/accounts', restrictTo('ADMIN', 'SALES'), crmController.createAccount);
router.get('/accounts', crmController.getAccounts);

router.post('/opportunities', restrictTo('ADMIN', 'SALES'), crmController.createOpportunity);
router.get('/opportunities', crmController.getOpportunities);
router.patch('/opportunities/:id', restrictTo('ADMIN', 'SALES'), crmController.updateOpportunity);
router.patch('/opportunities/:id/stage', restrictTo('ADMIN', 'SALES'), crmController.updateOpportunityStage);
router.post('/opportunities/:id/convert', restrictTo('ADMIN', 'SALES'), crmController.convertToProject);

export default router;
