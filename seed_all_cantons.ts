import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const LOCATION_DATA: Record<string, string[]> = {
  "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés Castro"],
  "Alajuela": ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
  "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
  "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
  "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
  "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito", "Monteverde", "Puerto Jiménez"],
  "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"]
};

const LUXURY_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80',
];

async function main() {
  const tenant = await prisma.tenant.findUnique({
    where: { domain: 'localhost:3000' }
  });

  if (!tenant) {
    console.log("No se encontro el tenant");
    return;
  }

  let count = 0;
  for (const [province, cantons] of Object.entries(LOCATION_DATA)) {
    for (const canton of cantons) {
      
      // Select random image
      const randomImage = LUXURY_IMAGES[Math.floor(Math.random() * LUXURY_IMAGES.length)];
      
      await prisma.property.create({
        data: {
          title: `PROPIEDAD LUXURY EN ${canton.toUpperCase()}`,
          description: `Exclusiva propiedad ubicada en el hermoso cantón de ${canton}, provincia de ${province}. Cuenta con acabados premium, arquitectura moderna y vistas incomparables. Ideal para inversión o residencia de alto perfil.`,
          location: `Centro de ${canton}, ${province}`,
          price: `$${(Math.floor(Math.random() * 900) + 100)},000`,
          beds: Math.floor(Math.random() * 4) + 2,
          baths: Math.floor(Math.random() * 4) + 1.5,
          constructionArea: Math.floor(Math.random() * 500) + 150,
          lotArea: Math.floor(Math.random() * 2000) + 300,
          yearBuilt: Math.floor(Math.random() * 24) + 2000,
          floors: Math.floor(Math.random() * 3) + 1,
          propertyType: Math.random() > 0.5 ? "Casa" : "Finca",
          status: "En Venta",
          images: JSON.stringify([randomImage]),
          province: province,
          canton: canton,
          tenantId: tenant.id
        }
      });
      count++;
    }
  }

  console.log(`Se insertaron con exito ${count} propiedades de prueba (1 para cada canton de Costa Rica).`);
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
