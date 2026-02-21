import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

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
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@insightos.com' },
        update: {},
        create: {
            email: 'admin@insightos.com',
            passwordHash,
            role: Role.ADMIN,
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
