"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const ProposalController_1 = require("./controllers/ProposalController");
const authMiddleware_1 = require("../../shared/middlewares/authMiddleware");
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(ProposalController_1.ProposalController);
router.use(authMiddleware_1.protect);
router.route('/')
    .get(controller.getProposals)
    .post(controller.createProposal);
router.route('/:id')
    .get(controller.getProposal)
    .patch(controller.updateProposal)
    .delete(controller.deleteProposal);
exports.default = router;
