"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgUnitRepository = void 0;
const client_1 = require("@prisma/client");
const tsyringe_1 = require("tsyringe");
let OrgUnitRepository = class OrgUnitRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.businessUnit.create({
            data: {
                name: data.name,
                parentId: data.parentId || null,
            },
        });
    }
    async findAll() {
        return this.prisma.businessUnit.findMany({
            include: {
                children: true,
                _count: {
                    select: { mappings: true }
                }
            },
        });
    }
    async findTree() {
        const units = await this.prisma.businessUnit.findMany({
            include: {
                children: true,
                mappings: {
                    include: {
                        user: {
                            select: { id: true, email: true }
                        },
                        role: true
                    }
                }
            }
        });
        // Simple tree builder
        const buildTree = (parentId = null) => {
            return units
                .filter(u => u.parentId === parentId)
                .map(u => ({
                ...u,
                children: buildTree(u.id)
            }));
        };
        return buildTree(null);
    }
    async update(id, data) {
        return this.prisma.businessUnit.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.businessUnit.delete({
            where: { id },
        });
    }
    async mapUser(userId, unitId, roleId) {
        return this.prisma.orgUserMapping.upsert({
            where: {
                userId_unitId: { userId, unitId }
            },
            update: { roleId },
            create: { userId, unitId, roleId }
        });
    }
    async getRoles() {
        return this.prisma.orgRole.findMany();
    }
};
exports.OrgUnitRepository = OrgUnitRepository;
exports.OrgUnitRepository = OrgUnitRepository = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)('PrismaClient')),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], OrgUnitRepository);
