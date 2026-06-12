const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users:', users.map(u => u.email));

  const password = await bcrypt.hash('Andrey2026', 10);

  // Upsert user
  await prisma.user.upsert({
    where: { email: 'andreymartinezalvarado@gmail.com' },
    update: { password: password },
    create: {
      email: 'andreymartinezalvarado@gmail.com',
      name: 'Andrey',
      password: password,
      role: 'tenant',
      tenantId: users.find(u => u.tenantId)?.tenantId // Just attach to the first tenant found
    }
  });

  console.log('User password updated successfully to: Andrey2026');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
