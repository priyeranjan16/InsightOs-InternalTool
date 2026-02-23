"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTimesheetSchema = exports.CreateTaskSchema = exports.CreateProjectSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.CreateProjectSchema = zod_1.z.object({
    opportunityId: zod_1.z.string().uuid().optional(),
    clientId: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string().min(1, 'Project name is required'),
    billingModel: zod_1.z.nativeEnum(client_1.BillingModel),
    budget: zod_1.z.number().min(0).optional(),
});
exports.CreateTaskSchema = zod_1.z.object({
    projectId: zod_1.z.string().uuid('Invalid Project ID'),
    title: zod_1.z.string().min(1, 'Task title is required'),
    description: zod_1.z.string().optional(),
    status: zod_1.z.string().default('To Do'),
});
exports.CreateTimesheetSchema = zod_1.z.object({
    projectId: zod_1.z.string().uuid('Invalid Project ID'),
    hoursLogged: zod_1.z.number().min(0.1),
    date: zod_1.z.string().datetime(),
    isBillable: zod_1.z.boolean().default(true),
});
