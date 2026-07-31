const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const superadmin = await prisma.user.upsert({
    where: { email: 'admin@andreyrealty.com' },
    update: {},
    create: {
      email: 'admin@andreyrealty.com',
      name: 'SuperAdmin',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });

  const tenant = await prisma.tenant.upsert({
    where: { domain: 'AndreyRealty' },
    update: {},
    create: {
      name: 'Andrey Realty',
      domain: 'AndreyRealty', // Default fallback
      heroTitle: 'Andrey Realty',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
      siteSettings: JSON.stringify({
        agentPhoto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        aboutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
      }),
    },
  });

  await prisma.user.update({
    where: { email: 'admin@andreyrealty.com' },
    data: { tenantId: tenant.id }
  });

  console.log('Database seeded successfully');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect() })
