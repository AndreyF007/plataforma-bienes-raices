import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  // Super Admin
  await prisma.user.upsert({
    where: { email: 'admin@antigravity.com' },
    update: {},
    create: {
      email: 'admin@antigravity.com',
      name: 'Super Admin',
      password,
      role: 'superadmin',
    },
  })

  // Create default tenant (localhost:3000)
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'localhost:3000' },
    update: {},
    create: {
      domain: 'localhost:3000',
      name: 'ANDRÉS REALTY',
      heroImage: '/images/hero-bg.png',
      stats: {
        create: [
          { value: '15+', label: 'AÑOS DE EXPERIENCIA' },
          { value: '$50M+', label: 'EN VENTAS TOTALES' },
          { value: 'TOP 1%', label: 'EN COSTA RICA' },
          { value: '200+', label: 'FAMILIAS FELICES' },
        ]
      },
      properties: {
        create: [
          {
            title: 'VILLA PACÍFICO',
            location: 'PLAYA FLAMINGO, GUANACASTE',
            price: '$1,250,000',
            description: 'Hermosa villa frente al mar con acabados de lujo.',
            images: JSON.stringify(['/images/property-1.png']),
          },
          {
            title: 'PENTHOUSE ESCAZÚ',
            location: 'ESCAZÚ, SAN JOSÉ',
            price: '$890,000',
            description: 'Exclusivo penthouse con vistas panorámicas a la ciudad.',
            images: JSON.stringify(['/images/property-2.png']),
          },
          {
            title: 'REFUGIO SELVA',
            location: 'MANUEL ANTONIO',
            price: '$675,000',
            description: 'Refugio inmerso en la selva, ideal para amantes de la naturaleza.',
            images: JSON.stringify(['/images/property-3.png']),
          }
        ]
      },
      zones: {
        create: [
          { name: 'GUANACASTE', image: '/images/zone-guanacaste.png' },
          { name: 'ESCAZÚ', image: '/images/zone-escazu.png' },
          { name: 'NOSARA', image: '/images/zone-nosara.png' }
        ]
      }
    },
  })

  // Tenant Admin
  await prisma.user.upsert({
    where: { email: 'andres@realty.com' },
    update: {},
    create: {
      email: 'andres@realty.com',
      name: 'Andres (Corredor)',
      password,
      role: 'tenant',
      tenantId: tenant.id,
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
