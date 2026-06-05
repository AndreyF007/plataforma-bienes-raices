import { PropertyData } from '@/components/properties/PropertyCard';

// Colecciones de fotos de lujo genéricas para rellenar los carruseles
const imgPool1 = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
];

const imgPool2 = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1613490908676-e17502b4d24a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"
];

const imgPool3 = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
];

const imgPoolLotes = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534802046520-4f27db7f3ae5?auto=format&fit=crop&w=800&q=80"
];

const descLujo = "Esta impresionante propiedad ofrece un diseño arquitectónico sin precedentes, combinando acabados de mármol importado, amplios ventanales de piso a techo y tecnología inteligente. Disfrute de vistas panorámicas, privacidad absoluta y amenidades de primera clase en una de las ubicaciones más prestigiosas.";
const descApto = "Un refugio urbano de elegancia incomparable. Este lujoso apartamento cuenta con una cocina de chef, suite principal tipo spa y una amplia terraza privada ideal para el entretenimiento. Ubicado en una torre exclusiva con seguridad 24/7 y amenidades tipo resort.";
const descLote = "Una oportunidad excepcional para construir la propiedad de sus sueños. Este terreno privilegiado ofrece topografía ideal, vistas despejadas y se encuentra en una comunidad cerrada de ultra-lujo, garantizando exclusividad y plusvalía.";

export const allProperties: PropertyData[] = [
  // ESCAZÚ
  { id: 1, title: "Villa Moderna Exclusiva", price: 1250000, priceStr: "$1,250,000", type: "Casas", address: "Residencial de Montaña, Escazú", beds: 4, baths: 4.5, sqm: 450, img: imgPool1[0], images: imgPool1, status: "NUEVO", description: descLujo },
  { id: 2, title: "Apartamento de Lujo con Vista", price: 550000, priceStr: "$550,000", type: "Apartamentos", address: "Torres del Sol, Escazú", beds: 2, baths: 2, sqm: 150, img: imgPool3[0], images: imgPool3, status: "EN VENTA", description: descApto },
  { id: 3, title: "Mansión Contemporánea", price: 3400000, priceStr: "$3,400,000", type: "Casas", address: "Cerros de Escazú, Escazú", beds: 6, baths: 7, sqm: 950, img: imgPool2[1], images: imgPool2, status: "EXCLUSIVO", description: descLujo },
  { id: 4, title: "Penthouse Infinity", price: 1850000, priceStr: "$1,850,000", type: "Apartamentos", address: "Trejos Montealegre, Escazú", beds: 4, baths: 4, sqm: 380, img: imgPool3[2], images: imgPool3, status: "VENDIDO", description: descApto },
  { id: 5, title: "Lote Panorámico", price: 450000, priceStr: "$450,000", type: "Lotes", address: "Bello Horizonte, Escazú", beds: 0, baths: 0, sqm: 1200, img: imgPoolLotes[0], images: imgPoolLotes, status: "NUEVO", description: descLote },

  // SANTA ANA
  { id: 6, title: "Residencia Familiar Clásica", price: 850000, priceStr: "$850,000", type: "Casas", address: "Centro Histórico, Santa Ana", beds: 3, baths: 3, sqm: 320, img: imgPool2[0], images: imgPool2, status: "DESTACADO", description: descLujo },
  { id: 7, title: "Villa Ecuestre", price: 2100000, priceStr: "$2,100,000", type: "Casas", address: "Lindora, Santa Ana", beds: 5, baths: 6, sqm: 800, img: imgPool1[1], images: imgPool1, status: "EXCLUSIVO", description: descLujo },
  { id: 8, title: "Condominio Minimalista", price: 420000, priceStr: "$420,000", type: "Apartamentos", address: "Río Oro, Santa Ana", beds: 2, baths: 2.5, sqm: 140, img: imgPool3[3], images: imgPool3, status: "EN VENTA", description: descApto },
  { id: 9, title: "Hacienda del Sol", price: 1550000, priceStr: "$1,550,000", type: "Casas", address: "Alto de las Palomas, Santa Ana", beds: 4, baths: 4, sqm: 500, img: imgPool1[2], images: imgPool1, status: "NUEVO", description: descLujo },
  { id: 10, title: "Lote Comercial VIP", price: 1100000, priceStr: "$1,100,000", type: "Lotes", address: "Vía Lindora, Santa Ana", beds: 0, baths: 0, sqm: 2500, img: imgPoolLotes[2], images: imgPoolLotes, status: "EN VENTA", description: descLote },

  // SAN JOSÉ
  { id: 11, title: "Penthouse Panorámico", price: 1100000, priceStr: "$1,100,000", type: "Apartamentos", address: "Sabana Oeste, San José", beds: 3, baths: 3.5, sqm: 280, img: imgPool3[1], images: imgPool3, status: "DESTACADO", description: descApto },
  { id: 12, title: "Casa Boutique Colonial", price: 780000, priceStr: "$780,000", type: "Casas", address: "Barrio Amón, San José", beds: 4, baths: 3, sqm: 310, img: imgPool2[2], images: imgPool2, status: "NUEVO", description: descLujo },
  { id: 13, title: "Loft Industrial de Lujo", price: 350000, priceStr: "$350,000", type: "Apartamentos", address: "Barrio Escalante, San José", beds: 1, baths: 1.5, sqm: 110, img: imgPool3[0], images: imgPool3, status: "REDUCIDO", description: descApto },
  { id: 14, title: "Torre Rohrmoser", price: 620000, priceStr: "$620,000", type: "Apartamentos", address: "Nunciatura, San José", beds: 2, baths: 2, sqm: 165, img: imgPool3[2], images: imgPool3, status: "NUEVO", description: descApto },
  
  // OTROS (Mora, Puriscal, etc.)
  { id: 15, title: "Quinta Ecológica", price: 950000, priceStr: "$950,000", type: "Casas", address: "Ciudad Colón, Mora", beds: 3, baths: 2, sqm: 250, img: imgPool2[3], images: imgPool2, status: "EN VENTA", description: descLujo },
  { id: 16, title: "Finca de Retiro", price: 600000, priceStr: "$600,000", type: "Lotes", address: "Santiago, Puriscal", beds: 0, baths: 0, sqm: 15000, img: imgPoolLotes[1], images: imgPoolLotes, status: "DESTACADO", description: descLote }
];
