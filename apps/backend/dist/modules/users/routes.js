"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const UserController_1 = require("./controllers/UserController");
const OrgUnitController_1 = require("./controllers/OrgUnitController");
const authMiddleware_1 = require("../../shared/middlewares/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const userController = tsyringe_1.container.resolve(UserController_1.UserController);
const orgUnitController = tsyringe_1.container.resolve(OrgUnitController_1.OrgUnitController);
router.post('/register', userController.register);
router.post('/login', userController.login);
// Routes for business units and users
router.get('/', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), userController.getUsers);
router.get('/business-units', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), userController.getBusinessUnits);
router.post('/business-units', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), userController.createBusinessUnit);
// Org Unit Hierarchy Routes
router.get('/org-units/tree', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), orgUnitController.getTree);
router.post('/org-units', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), orgUnitController.createUnit);
router.patch('/org-units/:id', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), orgUnitController.updateUnit);
router.delete('/org-units/:id', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), orgUnitController.deleteUnit);
router.get('/org-units/roles', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), orgUnitController.getRoles);
router.post('/org-units/map', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), orgUnitController.mapUser);
router.patch('/:id/toggle-status', authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), userController.toggleStatus);
exports.default = router;
