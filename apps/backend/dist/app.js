"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errorHandler_1 = require("./shared/middlewares/errorHandler");
const app = (0, express_1.default)();
// Global Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});
const routes_1 = __importDefault(require("./modules/users/routes"));
const routes_2 = __importDefault(require("./modules/crm/routes"));
const routes_3 = __importDefault(require("./modules/projects/routes"));
const routes_4 = __importDefault(require("./modules/accounting/routes"));
const routes_5 = __importDefault(require("./modules/clients/routes"));
const routes_6 = __importDefault(require("./modules/proposals/routes"));
// Swagger mapping placeholder
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// API Routes
app.use('/api/users', routes_1.default);
app.use('/api/crm', routes_2.default);
app.use('/api/projects', routes_3.default);
app.use('/api/accounting', routes_4.default);
app.use('/api/clients', routes_5.default);
app.use('/api/proposals', routes_6.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
