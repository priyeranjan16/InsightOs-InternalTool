import { z } from 'zod';
import { Role } from '@prisma/client';

export const RegisterUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.nativeEnum(Role).optional().default(Role.EMPLOYEE),
    businessUnitId: z.string().uuid('Invalid Business Unit ID').optional(),
});

export const LoginUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string(),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;
export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
