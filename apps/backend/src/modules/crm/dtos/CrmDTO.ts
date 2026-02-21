import { z } from 'zod';
import { PipelineStage } from '@prisma/client';

export const CreateAccountSchema = z.object({
    name: z.string().min(1, 'Account name is required'),
    industry: z.string().optional(),
});

export const CreateOpportunitySchema = z.object({
    accountId: z.string().uuid('Invalid Account ID').optional(),
    clientId: z.string().uuid('Invalid Client ID').optional(),
    ownerId: z.string().uuid('Invalid Owner ID').optional(),
    name: z.string().min(1, 'Opportunity name is required'),
    stage: z.nativeEnum(PipelineStage).default(PipelineStage.PROSPECTING),
    probability: z.number().min(0).max(100),
    expectedCloseDate: z.string().datetime().optional(),
    dealValue: z.number().min(0),
});

export const UpdateOpportunityStageSchema = z.object({
    stage: z.nativeEnum(PipelineStage),
    probability: z.number().min(0).max(100).optional(),
});

export const UpdateOpportunitySchema = CreateOpportunitySchema.partial();

export type CreateAccountDTO = z.infer<typeof CreateAccountSchema>;
export type CreateOpportunityDTO = z.infer<typeof CreateOpportunitySchema>;
export type UpdateOpportunityStageDTO = z.infer<typeof UpdateOpportunityStageSchema>;
export type UpdateOpportunityDTO = z.infer<typeof UpdateOpportunitySchema>;
