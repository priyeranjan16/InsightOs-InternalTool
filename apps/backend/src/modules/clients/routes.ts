import { Router } from 'express';
import { container } from 'tsyringe';
import { ClientController } from './controllers/ClientController';
import { protect, restrictTo } from '../../shared/middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();
const clientController = container.resolve(ClientController);

router.use(protect);

router.route('/')
    .get(clientController.getAll)
    .post(restrictTo(Role.ADMIN, Role.SALES, Role.PROJECT_MANAGER), clientController.create);

router.route('/:id')
    .get(clientController.getById)
    .patch(restrictTo(Role.ADMIN, Role.SALES, Role.PROJECT_MANAGER), clientController.update)
    .delete(restrictTo(Role.ADMIN), clientController.delete);

export default router;
