import { z } from 'zod';

// Assuming InvoiceStatus enum is defined elsewhere or needs to be added.
// For the purpose of this edit, I will add a placeholder enum definition
// to ensure the resulting file is syntactically correct as per the instruction's Code Edit.
export enum InvoiceStatus {
    DRAFT = 'DRAFT',
    SENT = 'SENT',
    PAID = 'PAID',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED',
}

export const CreateInvoiceSchema = z.object({
    projectId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
    amount: z.number().min(0),
    items: z.array(z.object({
        description: z.string(),
        quantity: z.number().min(1),
        unitPrice: z.number().min(0),
        amount: z.number().min(0)
    })).default([]),
    isInterState: z.boolean().default(false),
    status: z.nativeEnum(InvoiceStatus).default(InvoiceStatus.SENT),
    hsnSacCode: z.string().optional(),
    date: z.string().datetime().optional(),
    dueDate: z.string().datetime().optional(),
});

export const CreateExpenseSchema = z.object({
    description: z.string().min(1),
    amount: z.number().min(0),
    category: z.string().min(1),
    isInterState: z.boolean().default(false),
    isReverseCharge: z.boolean().default(false),
    date: z.string().datetime(),
});

export type CreateInvoiceDTO = z.infer<typeof CreateInvoiceSchema>;
export type CreateExpenseDTO = z.infer<typeof CreateExpenseSchema>;
