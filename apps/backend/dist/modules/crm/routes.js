"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const CrmController_1 = require("./controllers/CrmController");
const authMiddleware_1 = require("../../shared/middlewares/authMiddleware");
const router = (0, express_1.Router)();
const crmController = tsyringe_1.container.resolve(CrmController_1.CrmController);
// Apply auth middleware to all CRM routes
router.use(authMiddleware_1.protect);
router.post('/accounts', (0, authMiddleware_1.restrictTo)('ADMIN', 'SALES'), crmController.createAccount);
router.get('/accounts', crmController.getAccounts);
router.post('/opportunities', (0, authMiddleware_1.restrictTo)('ADMIN', 'SALES'), crmController.createOpportunity);
router.get('/opportunities', crmController.getOpportunities);
router.patch('/opportunities/:id', (0, authMiddleware_1.restrictTo)('ADMIN', 'SALES'), crmController.updateOpportunity);
router.patch('/opportunities/:id/stage', (0, authMiddleware_1.restrictTo)('ADMIN', 'SALES'), crmController.updateOpportunityStage);
router.post('/opportunities/:id/convert', (0, authMiddleware_1.restrictTo)('ADMIN', 'SALES'), crmController.convertToProject);
exports.default = router;
