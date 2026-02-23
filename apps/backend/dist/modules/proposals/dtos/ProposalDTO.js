"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProposalSchema = exports.CreateProposalSchema = exports.ProposalStatusEnum = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.ProposalStatusEnum = zod_1.z.nativeEnum(client_1.ProposalStatus);
exports.CreateProposalSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    clientId: zod_1.z.string().uuid().optional(),
    opportunityId: zod_1.z.string().uuid().optional(),
    content: zod_1.z.any(), // JSON content for sections
    dealValue: zod_1.z.number().optional(),
    validUntil: zod_1.z.string().datetime().optional()
});
exports.UpdateProposalSchema = exports.CreateProposalSchema.partial();
