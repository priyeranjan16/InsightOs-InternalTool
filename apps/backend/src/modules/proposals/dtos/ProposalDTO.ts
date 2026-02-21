import { z } from 'zod';
import { ProposalStatus } from '@prisma/client';

export const ProposalStatusEnum = z.nativeEnum(ProposalStatus);

export const CreateProposalSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    clientId: z.string().uuid().optional(),
    opportunityId: z.string().uuid().optional(),
    content: z.any(), // JSON content for sections
    dealValue: z.number().optional(),
    validUntil: z.string().datetime().optional()
});

export const UpdateProposalSchema = CreateProposalSchema.partial();

export type CreateProposalDTO = z.infer<typeof CreateProposalSchema>;
export type UpdateProposalDTO = z.infer<typeof UpdateProposalSchema>;
