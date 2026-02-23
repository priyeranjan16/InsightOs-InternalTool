"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const ClientController_1 = require("./controllers/ClientController");
const authMiddleware_1 = require("../../shared/middlewares/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const clientController = tsyringe_1.container.resolve(ClientController_1.ClientController);
router.use(authMiddleware_1.protect);
router.route('/')
    .get(clientController.getAll)
    .post((0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN, client_1.Role.SALES, client_1.Role.PROJECT_MANAGER), clientController.create);
router.route('/:id')
    .get(clientController.getById)
    .patch((0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN, client_1.Role.SALES, client_1.Role.PROJECT_MANAGER), clientController.update)
    .delete((0, authMiddleware_1.restrictTo)(client_1.Role.ADMIN), clientController.delete);
exports.default = router;
