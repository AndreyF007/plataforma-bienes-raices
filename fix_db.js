const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.findFirst();
  if (tenant) {
    await prisma.user.update({
      where: { email: 'admin@antigravity.com' },
      data: { tenantId: tenant.id }
    });
    console.log('Updated admin tenantId');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
