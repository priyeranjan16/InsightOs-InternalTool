import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './shared/middlewares/errorHandler';

const app: Application = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

import userRoutes from './modules/users/routes';
import crmRoutes from './modules/crm/routes';
import projectRoutes from './modules/projects/routes';
import accountingRoutes from './modules/accounting/routes';
import clientRoutes from './modules/clients/routes';
import proposalRoutes from './modules/proposals/routes';

// Swagger mapping placeholder
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/accounting', accountingRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/proposals', proposalRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
