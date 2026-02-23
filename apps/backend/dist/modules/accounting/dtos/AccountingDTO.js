"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpenseSchema = exports.CreateInvoiceSchema = exports.InvoiceStatus = void 0;
const zod_1 = require("zod");
// Assuming InvoiceStatus enum is defined elsewhere or needs to be added.
// For the purpose of this edit, I will add a placeholder enum definition
// to ensure the resulting file is syntactically correct as per the instruction's Code Edit.
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "DRAFT";
    InvoiceStatus["SENT"] = "SENT";
    InvoiceStatus["PAID"] = "PAID";
    InvoiceStatus["OVERDUE"] = "OVERDUE";
    InvoiceStatus["CANCELLED"] = "CANCELLED";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
exports.CreateInvoiceSchema = zod_1.z.object({
    projectId: zod_1.z.string().uuid().optional(),
    clientId: zod_1.z.string().uuid().optional(),
    amount: zod_1.z.number().min(0),
    items: zod_1.z.array(zod_1.z.object({
        description: zod_1.z.string(),
        quantity: zod_1.z.number().min(1),
        unitPrice: zod_1.z.number().min(0),
        amount: zod_1.z.number().min(0)
    })).default([]),
    isInterState: zod_1.z.boolean().default(false),
    status: zod_1.z.nativeEnum(InvoiceStatus).default(InvoiceStatus.SENT),
    hsnSacCode: zod_1.z.string().optional(),
    date: zod_1.z.string().datetime().optional(),
    dueDate: zod_1.z.string().datetime().optional(),
});
exports.CreateExpenseSchema = zod_1.z.object({
    description: zod_1.z.string().min(1),
    amount: zod_1.z.number().min(0),
    category: zod_1.z.string().min(1),
    isInterState: zod_1.z.boolean().default(false),
    isReverseCharge: zod_1.z.boolean().default(false),
    date: zod_1.z.string().datetime(),
});
