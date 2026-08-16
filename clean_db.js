const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanGenericData() {
  console.log("Limpiando imágenes secundarias de WhatsApp...");
  const updatedImg = await prisma.zone.updateMany({
    where: { image: { contains: 'WhatsApp' } },
    data: { image: "" }
  });
  console.log(`Se limpiaron ${updatedImg.count} imágenes secundarias de WhatsApp.`);

  console.log("¡Limpieza completada!");
}

cleanGenericData()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
