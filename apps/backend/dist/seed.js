"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding Database...');
    // 1. Create Business Units Hierarchy
    const hq = await prisma.businessUnit.create({
        data: { name: 'Corporate Headquarters' },
    });
    const salesDept = await prisma.businessUnit.create({
        data: {
            name: 'Sales Department',
            parentId: hq.id
        },
    });
    const domesticSales = await prisma.businessUnit.create({
        data: {
            name: 'Domestic Sales',
            parentId: salesDept.id
        }
    });
    const internationalSales = await prisma.businessUnit.create({
        data: {
            name: 'International Sales',
            parentId: salesDept.id
        }
    });
    // 2. Create Org Roles
    const roles = [
        { name: 'Account Manager', permissions: ['crm:read', 'crm:write'] },
        { name: 'Sales Representative', permissions: ['crm:read'] },
        { name: 'Marketing Lead', permissions: ['marketing:all'] },
    ];
    for (const role of roles) {
        await prisma.orgRole.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }
    // 3. Create Admin User
    const salt = await bcryptjs_1.default.genSalt(10);
    const passwordHash = await bcryptjs_1.default.hash('admin123', salt);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@insightos.com' },
        update: {},
        create: {
            email: 'admin@insightos.com',
            passwordHash,
            role: client_1.Role.ADMIN,
            businessUnitId: hq.id,
        },
    });
    console.log(`Created admin: ${admin.email}`);
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
