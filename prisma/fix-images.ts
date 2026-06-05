import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateImages() {
  await prisma.tenant.updateMany({
    data: { heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80' }
  })
  
  const props = await prisma.property.findMany()
  const propImages = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&w=1000&q=80'
  ]
  for (let i = 0; i < props.length; i++) {
    await prisma.property.update({
      where: { id: props[i].id },
      data: { image: propImages[i % propImages.length] }
    })
  }

  const zones = await prisma.zone.findMany()
  const zoneImages = [
    'https://images.unsplash.com/photo-1571216656722-1d6ebfa77da1?auto=format&fit=crop&w=1000&q=80', // Guanacaste
    'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1000&q=80', // Escazu
    'https://images.unsplash.com/photo-1590494480572-870020120286?auto=format&fit=crop&w=1000&q=80'  // Nosara
  ]
  for (let i = 0; i < zones.length; i++) {
    await prisma.zone.update({
      where: { id: zones[i].id },
      data: { image: zoneImages[i % zoneImages.length] }
    })
  }

  console.log('Images updated')
}

updateImages().catch(console.error).finally(() => prisma.$disconnect())
