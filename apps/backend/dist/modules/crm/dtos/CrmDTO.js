"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOpportunitySchema = exports.UpdateOpportunityStageSchema = exports.CreateOpportunitySchema = exports.CreateAccountSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.CreateAccountSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Account name is required'),
    industry: zod_1.z.string().optional(),
});
exports.CreateOpportunitySchema = zod_1.z.object({
    accountId: zod_1.z.string().uuid('Invalid Account ID').optional(),
    clientId: zod_1.z.string().uuid('Invalid Client ID').optional(),
    ownerId: zod_1.z.string().uuid('Invalid Owner ID').optional(),
    name: zod_1.z.string().min(1, 'Opportunity name is required'),
    stage: zod_1.z.nativeEnum(client_1.PipelineStage).default(client_1.PipelineStage.PROSPECTING),
    probability: zod_1.z.number().min(0).max(100),
    expectedCloseDate: zod_1.z.string().datetime().optional(),
    dealValue: zod_1.z.number().min(0),
});
exports.UpdateOpportunityStageSchema = zod_1.z.object({
    stage: zod_1.z.nativeEnum(client_1.PipelineStage),
    probability: zod_1.z.number().min(0).max(100).optional(),
    lostRemarks: zod_1.z.string().optional(),
});
exports.UpdateOpportunitySchema = exports.CreateOpportunitySchema.partial();
