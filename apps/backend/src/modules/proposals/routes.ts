import { Router } from 'express';
import { container } from 'tsyringe';
import { ProposalController } from './controllers/ProposalController';
import { protect } from '../../shared/middlewares/authMiddleware';

const router = Router();
const controller = container.resolve(ProposalController);

router.use(protect);

router.route('/')
    .get(controller.getProposals)
    .post(controller.createProposal);

router.route('/:id')
    .get(controller.getProposal)
    .patch(controller.updateProposal)
    .delete(controller.deleteProposal);

export default router;
