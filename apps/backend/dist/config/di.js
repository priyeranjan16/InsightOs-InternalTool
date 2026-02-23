"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.container = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
require("reflect-metadata");
const client_1 = require("@prisma/client");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
// Initialize Prisma — pool settings are controlled via DATABASE_URL query params
// (connection_limit=20&pool_timeout=30) to prevent P2024 connection exhaustion.
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
exports.prisma = prisma;
// Register Prisma to DI
tsyringe_1.container.register('PrismaClient', {
    useValue: prisma,
});
