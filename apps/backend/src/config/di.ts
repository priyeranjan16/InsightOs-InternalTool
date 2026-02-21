/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

// Initialize Prisma — pool settings are controlled via DATABASE_URL query params
// (connection_limit=20&pool_timeout=30) to prevent P2024 connection exhaustion.
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

// Register Prisma to DI
container.register<PrismaClient>('PrismaClient', {
    useValue: prisma,
});

export { container, prisma };
