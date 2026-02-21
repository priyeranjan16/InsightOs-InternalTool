import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from './controllers/UserController';
import { OrgUnitController } from './controllers/OrgUnitController';

import { protect, restrictTo } from '../../shared/middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();
const userController = container.resolve(UserController);
const orgUnitController = container.resolve(OrgUnitController);

router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes for business units and users
router.get('/', protect, restrictTo(Role.ADMIN), userController.getUsers);
router.get('/business-units', protect, restrictTo(Role.ADMIN), userController.getBusinessUnits);
router.post('/business-units', protect, restrictTo(Role.ADMIN), userController.createBusinessUnit);

// Org Unit Hierarchy Routes
router.get('/org-units/tree', protect, restrictTo(Role.ADMIN), orgUnitController.getTree);
router.post('/org-units', protect, restrictTo(Role.ADMIN), orgUnitController.createUnit);
router.patch('/org-units/:id', protect, restrictTo(Role.ADMIN), orgUnitController.updateUnit);
router.delete('/org-units/:id', protect, restrictTo(Role.ADMIN), orgUnitController.deleteUnit);
router.get('/org-units/roles', protect, restrictTo(Role.ADMIN), orgUnitController.getRoles);
router.post('/org-units/map', protect, restrictTo(Role.ADMIN), orgUnitController.mapUser);
router.patch('/:id/toggle-status', protect, restrictTo(Role.ADMIN), userController.toggleStatus);

export default router;
