const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const prisma = new PrismaClient()

async function main() {
  const seedPath = path.join(__dirname, 'seed_data.json');
  if (fs.existsSync(seedPath)) {
    console.log('Seeding comprehensive dataset from seed_data.json...');
    const data = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

    const tenantIdMap = {};

    for (const tenant of (data.Tenant || [])) {
      const upserted = await prisma.tenant.upsert({
        where: { domain: tenant.domain },
        update: {
          name: tenant.name,
          isActive: Boolean(tenant.isActive),
          heroImage: tenant.heroImage,
          heroTitle: tenant.heroTitle,
          siteSettings: tenant.siteSettings,
        },
        create: {
          id: tenant.id,
          name: tenant.name,
          domain: tenant.domain,
          isActive: Boolean(tenant.isActive),
          heroImage: tenant.heroImage,
          heroTitle: tenant.heroTitle,
          siteSettings: tenant.siteSettings,
          createdAt: tenant.createdAt ? new Date(tenant.createdAt) : new Date(),
          updatedAt: tenant.updatedAt ? new Date(tenant.updatedAt) : new Date(),
        },
      });
      tenantIdMap[tenant.id] = upserted.id;
    }

    for (const user of (data.User || [])) {
      const mappedTenantId = tenantIdMap[user.tenantId] || user.tenantId;
      await prisma.user.upsert({
        where: { email: user.email || user.id },
        update: {
          name: user.name,
          password: user.password,
          role: user.role,
          tenantId: mappedTenantId,
        },
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
          password: user.password,
          role: user.role,
          tenantId: mappedTenantId,
        },
      });
    }

    for (const zone of (data.Zone || [])) {
      const mappedTenantId = tenantIdMap[zone.tenantId] || zone.tenantId;
      await prisma.zone.upsert({
        where: { id: zone.id },
        update: {
          name: zone.name,
          image: zone.image,
          coverImage: zone.coverImage,
          description: zone.description,
          population: zone.population,
          medianAge: zone.medianAge,
          avgIncome: zone.avgIncome,
          walkScore: zone.walkScore,
          bikeScore: zone.bikeScore,
          videos: zone.videos,
          tenantId: mappedTenantId,
        },
        create: { ...zone, tenantId: mappedTenantId },
      });
    }

    for (const prop of (data.Property || [])) {
      const mappedTenantId = tenantIdMap[prop.tenantId] || prop.tenantId;
      await prisma.property.upsert({
        where: { id: prop.id },
        update: { ...prop, tenantId: mappedTenantId },
        create: { ...prop, tenantId: mappedTenantId },
      });
    }

    for (const test of (data.Testimonial || [])) {
      const mappedTenantId = tenantIdMap[test.tenantId] || test.tenantId;
      const isApproved = Boolean(test.isApproved);
      const createdAt = test.createdAt ? new Date(test.createdAt) : new Date();
      await prisma.testimonial.upsert({
        where: { id: test.id },
        update: { ...test, tenantId: mappedTenantId, isApproved, createdAt },
        create: { ...test, tenantId: mappedTenantId, isApproved, createdAt },
      });
    }

    for (const stat of (data.Stat || [])) {
      const mappedTenantId = tenantIdMap[stat.tenantId] || stat.tenantId;
      await prisma.stat.upsert({
        where: { id: stat.id },
        update: { ...stat, tenantId: mappedTenantId },
        create: { ...stat, tenantId: mappedTenantId },
      });
    }

    console.log('Successfully seeded all zones, cantons, properties, and settings!');
    return;
  }

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
      domain: 'AndreyRealty',
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

  console.log('Database seeded default fallback');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect() })
