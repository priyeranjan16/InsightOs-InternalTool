"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserSchema = exports.RegisterUserSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.RegisterUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    role: zod_1.z.nativeEnum(client_1.Role).optional().default(client_1.Role.EMPLOYEE),
    businessUnitId: zod_1.z.string().uuid('Invalid Business Unit ID').optional(),
});
exports.LoginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string(),
});
