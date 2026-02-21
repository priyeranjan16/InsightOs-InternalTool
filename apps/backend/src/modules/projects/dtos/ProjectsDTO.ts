import { z } from 'zod';
import { BillingModel } from '@prisma/client';

export const CreateProjectSchema = z.object({
    opportunityId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
    name: z.string().min(1, 'Project name is required'),
    billingModel: z.nativeEnum(BillingModel),
    budget: z.number().min(0).optional(),
});

export const CreateTaskSchema = z.object({
    projectId: z.string().uuid('Invalid Project ID'),
    title: z.string().min(1, 'Task title is required'),
    description: z.string().optional(),
    status: z.string().default('To Do'),
});

export const CreateTimesheetSchema = z.object({
    projectId: z.string().uuid('Invalid Project ID'),
    hoursLogged: z.number().min(0.1),
    date: z.string().datetime(),
    isBillable: z.boolean().default(true),
});

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
export type CreateTaskDTO = z.infer<typeof CreateTaskSchema>;
export type CreateTimesheetDTO = z.infer<typeof CreateTimesheetSchema>;
