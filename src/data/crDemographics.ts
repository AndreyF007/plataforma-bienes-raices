export interface CantonDemography {
  population: string;
  medianAge: number;
  avgIncome: string; // En Colones Costarricenses (₡) por defecto, salario promedio individual mensual según estimaciones basadas en INEC
  walkScore: number;
  bikeScore: number;
}

export const CANTON_DEMOGRAPHICS: Record<string, CantonDemography> = {
  // PROVINCIA DE SAN JOSÉ
  "san josé": { population: "352,381", medianAge: 34, avgIncome: "₡745,000", walkScore: 88, bikeScore: 72 },
  "escazú": { population: "71,538", medianAge: 36, avgIncome: "₡1,680,000", walkScore: 78, bikeScore: 65 },
  "desamparados": { population: "247,380", medianAge: 32, avgIncome: "₡540,000", walkScore: 74, bikeScore: 60 },
  "puriscal": { population: "39,215", medianAge: 35, avgIncome: "₡480,000", walkScore: 60, bikeScore: 45 },
  "tarrazú": { population: "18,311", medianAge: 31, avgIncome: "₡460,000", walkScore: 55, bikeScore: 40 },
  "aserrí": { population: "63,145", medianAge: 33, avgIncome: "₡510,000", walkScore: 65, bikeScore: 50 },
  "mora": { population: "31,438", medianAge: 34, avgIncome: "₡850,000", walkScore: 70, bikeScore: 58 },
  "ciudad colón": { population: "31,438", medianAge: 34, avgIncome: "₡850,000", walkScore: 70, bikeScore: 58 },
  "goicoechea": { population: "135,594", medianAge: 35, avgIncome: "₡680,000", walkScore: 82, bikeScore: 68 },
  "santa ana": { population: "62,310", medianAge: 35, avgIncome: "₡1,750,000", walkScore: 76, bikeScore: 66 },
  "alajuelita": { population: "92,201", medianAge: 29, avgIncome: "₡430,000", walkScore: 72, bikeScore: 55 },
  "vázquez de coronado": { population: "71,215", medianAge: 34, avgIncome: "₡720,000", walkScore: 68, bikeScore: 54 },
  "coronado": { population: "71,215", medianAge: 34, avgIncome: "₡720,000", walkScore: 68, bikeScore: 54 },
  "acosta": { population: "22,504", medianAge: 34, avgIncome: "₡440,000", walkScore: 55, bikeScore: 40 },
  "tibás": { population: "83,501", medianAge: 36, avgIncome: "₡790,000", walkScore: 85, bikeScore: 70 },
  "moravia": { population: "61,402", medianAge: 36, avgIncome: "₡920,000", walkScore: 80, bikeScore: 65 },
  "montes de oca": { population: "63,124", medianAge: 33, avgIncome: "₡1,150,000", walkScore: 89, bikeScore: 78 },
  "san pedro": { population: "63,124", medianAge: 33, avgIncome: "₡1,150,000", walkScore: 89, bikeScore: 78 },
  "turrubares": { population: "7,120", medianAge: 33, avgIncome: "₡420,000", walkScore: 48, bikeScore: 35 },
  "dota": { population: "7,851", medianAge: 34, avgIncome: "₡470,000", walkScore: 52, bikeScore: 38 },
  "curridabat": { population: "79,204", medianAge: 36, avgIncome: "₡1,550,000", walkScore: 84, bikeScore: 72 },
  "pérez zeledón": { population: "145,201", medianAge: 33, avgIncome: "₡520,000", walkScore: 75, bikeScore: 60 },
  "león cortés castro": { population: "13,850", medianAge: 31, avgIncome: "₡430,000", walkScore: 50, bikeScore: 38 },

  // PROVINCIA DE ALAJUELA
  "alajuela": { population: "322,104", medianAge: 33, avgIncome: "₡680,000", walkScore: 82, bikeScore: 70 },
  "san ramón": { population: "90,412", medianAge: 34, avgIncome: "₡560,000", walkScore: 76, bikeScore: 62 },
  "grecia": { population: "81,304", medianAge: 35, avgIncome: "₡610,000", walkScore: 74, bikeScore: 60 },
  "san mateo": { population: "7,124", medianAge: 34, avgIncome: "₡490,000", walkScore: 58, bikeScore: 48 },
  "atenas": { population: "30,215", medianAge: 37, avgIncome: "₡780,000", walkScore: 68, bikeScore: 55 },
  "naranjo": { population: "49,150", medianAge: 35, avgIncome: "₡570,000", walkScore: 70, bikeScore: 56 },
  "palmares": { population: "34,120", medianAge: 33, avgIncome: "₡540,000", walkScore: 75, bikeScore: 62 },
  "poás": { population: "32,450", medianAge: 33, avgIncome: "₡550,000", walkScore: 64, bikeScore: 50 },
  "orotina": { population: "24,180", medianAge: 33, avgIncome: "₡520,000", walkScore: 68, bikeScore: 55 },
  "san carlos": { population: "195,124", medianAge: 31, avgIncome: "₡580,000", walkScore: 75, bikeScore: 64 },
  "ciudad quesada": { population: "195,124", medianAge: 31, avgIncome: "₡580,000", walkScore: 75, bikeScore: 64 },
  "zarcero": { population: "14,210", medianAge: 34, avgIncome: "₡540,000", walkScore: 62, bikeScore: 48 },
  "sarchí": { population: "23,410", medianAge: 35, avgIncome: "₡550,000", walkScore: 68, bikeScore: 55 },
  "upala": { population: "52,140", medianAge: 29, avgIncome: "₡410,000", walkScore: 58, bikeScore: 60 },
  "los chiles": { population: "35,210", medianAge: 27, avgIncome: "₡390,000", walkScore: 55, bikeScore: 62 },
  "guatuso": { population: "19,104", medianAge: 28, avgIncome: "₡400,000", walkScore: 52, bikeScore: 58 },
  "río cuarto": { population: "14,310", medianAge: 30, avgIncome: "₡450,000", walkScore: 54, bikeScore: 50 },

  // PROVINCIA DE CARTAGO
  "cartago": { population: "165,412", medianAge: 34, avgIncome: "₡690,000", walkScore: 84, bikeScore: 72 },
  "paraíso": { population: "64,120", medianAge: 33, avgIncome: "₡550,000", walkScore: 74, bikeScore: 60 },
  "la unión": { population: "110,412", medianAge: 35, avgIncome: "₡1,120,000", walkScore: 78, bikeScore: 65 },
  "tres ríos": { population: "110,412", medianAge: 35, avgIncome: "₡1,120,000", walkScore: 78, bikeScore: 65 },
  "jiménez": { population: "16,104", medianAge: 34, avgIncome: "₡480,000", walkScore: 62, bikeScore: 50 },
  "turrialba": { population: "75,210", medianAge: 33, avgIncome: "₡510,000", walkScore: 72, bikeScore: 58 },
  "alvarado": { population: "15,210", medianAge: 33, avgIncome: "₡490,000", walkScore: 58, bikeScore: 46 },
  "oreamuno": { population: "51,214", medianAge: 33, avgIncome: "₡560,000", walkScore: 70, bikeScore: 55 },
  "el guarco": { population: "46,120", medianAge: 33, avgIncome: "₡580,000", walkScore: 72, bikeScore: 58 },

  // PROVINCIA DE HEREDIA
  "heredia": { population: "144,512", medianAge: 35, avgIncome: "₡950,000", walkScore: 86, bikeScore: 75 },
  "barva": { population: "46,120", medianAge: 34, avgIncome: "₡720,000", walkScore: 76, bikeScore: 64 },
  "santo domingo": { population: "47,812", medianAge: 36, avgIncome: "₡980,000", walkScore: 80, bikeScore: 68 },
  "santa bárbara": { population: "42,150", medianAge: 34, avgIncome: "₡690,000", walkScore: 74, bikeScore: 60 },
  "san rafael": { population: "52,140", medianAge: 35, avgIncome: "₡850,000", walkScore: 75, bikeScore: 62 },
  "san isidro": { population: "24,150", medianAge: 36, avgIncome: "₡890,000", walkScore: 72, bikeScore: 58 },
  "belén": { population: "26,410", medianAge: 36, avgIncome: "₡1,650,000", walkScore: 82, bikeScore: 70 },
  "flores": { population: "24,180", medianAge: 35, avgIncome: "₡880,000", walkScore: 78, bikeScore: 66 },
  "san pablo": { population: "32,410", medianAge: 35, avgIncome: "₡860,000", walkScore: 80, bikeScore: 68 },
  "sarapiquí": { population: "85,210", medianAge: 29, avgIncome: "₡450,000", walkScore: 60, bikeScore: 62 },

  // PROVINCIA DE GUANACASTE
  "liberia": { population: "74,512", medianAge: 32, avgIncome: "₡680,000", walkScore: 80, bikeScore: 74 },
  "nicoya": { population: "55,210", medianAge: 35, avgIncome: "₡530,000", walkScore: 74, bikeScore: 68 },
  "santa cruz": { population: "68,140", medianAge: 33, avgIncome: "₡850,000", walkScore: 75, bikeScore: 70 },
  "tamarindo": { population: "68,140", medianAge: 33, avgIncome: "₡980,000", walkScore: 78, bikeScore: 75 },
  "bagaces": { population: "23,150", medianAge: 32, avgIncome: "₡490,000", walkScore: 62, bikeScore: 60 },
  "carrillo": { population: "45,210", medianAge: 33, avgIncome: "₡780,000", walkScore: 72, bikeScore: 66 },
  "cañas": { population: "31,410", medianAge: 32, avgIncome: "₡520,000", walkScore: 70, bikeScore: 65 },
  "abangares": { population: "19,850", medianAge: 33, avgIncome: "₡480,000", walkScore: 64, bikeScore: 55 },
  "tilarán": { population: "21,410", medianAge: 36, avgIncome: "₡510,000", walkScore: 68, bikeScore: 58 },
  "nandayure": { population: "12,310", medianAge: 35, avgIncome: "₡490,000", walkScore: 58, bikeScore: 50 },
  "la cruz": { population: "26,410", medianAge: 29, avgIncome: "₡460,000", walkScore: 62, bikeScore: 58 },
  "hojancha": { population: "7,950", medianAge: 37, avgIncome: "₡520,000", walkScore: 60, bikeScore: 52 },

  // PROVINCIA DE PUNTARENAS
  "puntarenas": { population: "140,210", medianAge: 33, avgIncome: "₡580,000", walkScore: 78, bikeScore: 72 },
  "esparza": { population: "37,210", medianAge: 34, avgIncome: "₡540,000", walkScore: 72, bikeScore: 64 },
  "buenos aires": { population: "48,150", medianAge: 29, avgIncome: "₡410,000", walkScore: 60, bikeScore: 54 },
  "montes de oro": { population: "14,210", medianAge: 34, avgIncome: "₡490,000", walkScore: 62, bikeScore: 50 },
  "osa": { population: "32,150", medianAge: 34, avgIncome: "₡650,000", walkScore: 64, bikeScore: 60 },
  "uvita": { population: "32,150", medianAge: 34, avgIncome: "₡720,000", walkScore: 68, bikeScore: 64 },
  "quepos": { population: "31,410", medianAge: 33, avgIncome: "₡720,000", walkScore: 76, bikeScore: 68 },
  "manuel antonio": { population: "31,410", medianAge: 33, avgIncome: "₡780,000", walkScore: 72, bikeScore: 64 },
  "golfito": { population: "42,150", medianAge: 31, avgIncome: "₡480,000", walkScore: 68, bikeScore: 62 },
  "coto brus": { population: "44,210", medianAge: 30, avgIncome: "₡440,000", walkScore: 60, bikeScore: 50 },
  "parrita": { population: "21,410", medianAge: 31, avgIncome: "₡520,000", walkScore: 66, bikeScore: 62 },
  "corredores": { population: "51,210", medianAge: 29, avgIncome: "₡460,000", walkScore: 68, bikeScore: 66 },
  "garabito": { population: "27,410", medianAge: 34, avgIncome: "₡850,000", walkScore: 82, bikeScore: 78 },
  "jaco": { population: "27,410", medianAge: 34, avgIncome: "₡850,000", walkScore: 84, bikeScore: 80 },
  "jacó": { population: "27,410", medianAge: 34, avgIncome: "₡850,000", walkScore: 84, bikeScore: 80 },
  "monteverde": { population: "7,150", medianAge: 35, avgIncome: "₡790,000", walkScore: 72, bikeScore: 48 },
  "puerto jiménez": { population: "12,410", medianAge: 32, avgIncome: "₡540,000", walkScore: 65, bikeScore: 68 },

  // PROVINCIA DE LIMÓN
  "limón": { population: "105,210", medianAge: 31, avgIncome: "₡550,000", walkScore: 76, bikeScore: 72 },
  "pococí": { population: "148,210", medianAge: 29, avgIncome: "₡520,000", walkScore: 74, bikeScore: 70 },
  "guápiles": { population: "148,210", medianAge: 29, avgIncome: "₡520,000", walkScore: 74, bikeScore: 70 },
  "siquirres": { population: "63,140", medianAge: 30, avgIncome: "₡490,000", walkScore: 70, bikeScore: 68 },
  "talamanca": { population: "41,210", medianAge: 29, avgIncome: "₡620,000", walkScore: 68, bikeScore: 74 },
  "puerto viejo": { population: "41,210", medianAge: 29, avgIncome: "₡680,000", walkScore: 72, bikeScore: 78 },
  "matina": { population: "46,120", medianAge: 28, avgIncome: "₡440,000", walkScore: 62, bikeScore: 64 },
  "guácimo": { population: "51,210", medianAge: 29, avgIncome: "₡460,000", walkScore: 66, bikeScore: 66 },

  // DISTRITOS Y ZONAS EXCLUSIVAS DE ALTA GAMA
  "rohrmoser": { population: "32,150", medianAge: 37, avgIncome: "₡1,450,000", walkScore: 88, bikeScore: 82 },
  "la sabana": { population: "25,410", medianAge: 36, avgIncome: "₡1,350,000", walkScore: 90, bikeScore: 85 },
  "lindora": { population: "18,410", medianAge: 38, avgIncome: "₡1,850,000", walkScore: 74, bikeScore: 68 },
  "la garita": { population: "12,410", medianAge: 38, avgIncome: "₡790,000", walkScore: 64, bikeScore: 55 },
  "cariari": { population: "15,210", medianAge: 38, avgIncome: "₡1,650,000", walkScore: 80, bikeScore: 72 },
  "flamingo": { population: "6,410", medianAge: 39, avgIncome: "₡1,150,000", walkScore: 72, bikeScore: 68 },
  "conchal": { population: "5,120", medianAge: 38, avgIncome: "₡1,250,000", walkScore: 70, bikeScore: 66 },
  "papagayo": { population: "4,210", medianAge: 40, avgIncome: "₡1,450,000", walkScore: 65, bikeScore: 60 },
  "potrero": { population: "8,120", medianAge: 37, avgIncome: "₡920,000", walkScore: 74, bikeScore: 68 },
  "las catalinas": { population: "3,500", medianAge: 39, avgIncome: "₡1,350,000", walkScore: 92, bikeScore: 85 },
  "nosara": { population: "9,410", medianAge: 35, avgIncome: "₡1,100,000", walkScore: 76, bikeScore: 74 },
  "playa grande": { population: "4,510", medianAge: 36, avgIncome: "₡950,000", walkScore: 72, bikeScore: 68 },
  "hermosa": { population: "7,410", medianAge: 37, avgIncome: "₡920,000", walkScore: 75, bikeScore: 70 },
  "cóbano": { population: "14,210", medianAge: 33, avgIncome: "₡780,000", walkScore: 70, bikeScore: 68 },
  "santa teresa": { population: "11,210", medianAge: 32, avgIncome: "₡980,000", walkScore: 78, bikeScore: 76 },
  "mal país": { population: "4,120", medianAge: 34, avgIncome: "₡950,000", walkScore: 70, bikeScore: 68 },
  "tambor": { population: "6,810", medianAge: 36, avgIncome: "₡680,000", walkScore: 68, bikeScore: 64 },
  "paquera": { population: "10,210", medianAge: 34, avgIncome: "₡510,000", walkScore: 64, bikeScore: 60 },
  "lepanto": { population: "11,410", medianAge: 35, avgIncome: "₡480,000", walkScore: 62, bikeScore: 58 },
  "dominical": { population: "5,410", medianAge: 33, avgIncome: "₡750,000", walkScore: 72, bikeScore: 66 },
  "bahía ballena": { population: "8,410", medianAge: 33, avgIncome: "₡720,000", walkScore: 70, bikeScore: 64 },
  "cocles": { population: "4,210", medianAge: 31, avgIncome: "₡680,000", walkScore: 72, bikeScore: 74 },
  "manzanillo": { population: "3,810", medianAge: 32, avgIncome: "₡650,000", walkScore: 70, bikeScore: 72 },
  "cahuita": { population: "8,510", medianAge: 33, avgIncome: "₡580,000", walkScore: 74, bikeScore: 76 },
};

// Respaldo promedio nacional oficial de Costa Rica si no se encuentra el cantón
const NATIONAL_AVERAGE: CantonDemography = {
  population: "38,500",
  medianAge: 33,
  avgIncome: "₡625,000",
  walkScore: 72,
  bikeScore: 65
};

export function getCantonDemographicStats(cantonName: string, dbZone?: any): CantonDemography {
  const normalized = cantonName.trim().toLowerCase();
  const base = CANTON_DEMOGRAPHICS[normalized] || Object.entries(CANTON_DEMOGRAPHICS).find(([key]) => normalized.includes(key) || key.includes(normalized))?.[1] || NATIONAL_AVERAGE;

  // ESTRICTA DEFENSA ANTI-DÓLARES: Rechazamos tajantemente cualquier valor en la base de datos que contenga símbolo $, sea menor de 6 caracteres, comience con coma o no esté formateado con Colón Costarricense (₡).
  let finalIncome = base.avgIncome;
  if (dbZone?.avgIncome && typeof dbZone.avgIncome === 'string') {
    const val = dbZone.avgIncome.trim();
    if (!val.includes('$') && !val.startsWith(',') && val.startsWith('₡') && val.length >= 6) {
      finalIncome = val;
    }
  }

  return {
    population: dbZone?.population || base.population,
    medianAge: dbZone?.medianAge || base.medianAge,
    avgIncome: finalIncome,
    walkScore: dbZone?.walkScore || base.walkScore,
    bikeScore: dbZone?.bikeScore || base.bikeScore,
  };
}

export const DEFAULT_CANTON_IMAGES: Record<string, string> = {
  // San José (20) - Propiedades de lujo en Valle Central y montaña
  "san josé": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90",
  "escazú": "/images/zone-escazu.png",
  "desamparados": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
  "puriscal": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90",
  "tarrazú": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=90",
  "aserrí": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=90",
  "mora": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=90",
  "ciudad colón": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=90",
  "goicoechea": "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1920&q=90",
  "santa ana": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=90",
  "alajuelita": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90",
  "vázquez de coronado": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=90",
  "coronado": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=90",
  "acosta": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90",
  "tibás": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
  "moravia": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90",
  "montes de oca": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90",
  "san pedro": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90",
  "turrubares": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=90",
  "dota": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=90",
  "curridabat": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=90",
  "pérez zeledón": "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1920&q=90",
  "león cortés castro": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=90",

  // Alajuela (16)
  "alajuela": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=90",
  "san ramón": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90",
  "grecia": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
  "san carlos": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90",
  "ciudad quesada": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90",
  "zarcero": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=90",
  "sarchí": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=90",
  "poás": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=90",
  "atenas": "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1920&q=90",
  
  // Cartago (8)
  "cartago": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=90",
  "oreamuno": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90",
  "paraíso": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=90",
  "turrialba": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90",

  // Heredia (10)
  "heredia": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
  "barva": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90",
  "sarapiquí": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=90",

  // Guanacaste (11)
  "liberia": "/images/zone-guanacaste.png",
  "nicoya": "/images/zone-nosara.png",
  "santa cruz": "/images/zone-guanacaste.png",
  "carrillo": "/images/zone-nosara.png",
  "tilarán": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=90",

  // Puntarenas (13)
  "puntarenas": "/images/zone-manuel.png",
  "quepos": "/images/zone-manuel.png",
  "monteverde": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=90",
  "garabito": "/images/zone-manuel.png",
  "jacó": "/images/zone-manuel.png",
  "osa": "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1920&q=90",
  "golfito": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=90",

  // Limón (6)
  "limón": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90",
  "talamanca": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=90",
  "puerto viejo": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=90",
  "pococí": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90",
  "siquirres": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90"
};

export const AUTHENTIC_CR_FALLBACKS = [
  "/images/zone-escazu.png",
  "/images/zone-guanacaste.png",
  "/images/zone-manuel.png",
  "/images/zone-nosara.png",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=90"
];

function isUnwantedOldImage(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const l = url.toLowerCase();
  // Rechazar inmediatamente CUALQUIER URL antigua de Wikipedia o Wikimedia (evita carro rojo de Fuente Hispanidad, iglesias y pantallas negras por bloqueo 403)
  if (l.includes('wikimedia.org') || l.includes('wikipedia') || l.includes('hispanidad') || l.includes('church') || l.includes('iglesia') || l.includes('catedral')) {
    return true;
  }
  return false;
}

function isUserUploaded(url?: string | null): boolean {
  if (!url || typeof url !== 'string' || url.trim() === '') return false;
  const l = url.toLowerCase();
  if (l.includes('wikimedia') || l.includes('wikipedia') || l.includes('hispanidad') || l.includes('unsplash')) {
    return false;
  }
  return true;
}

export function getCantonCardImage(cantonName: string, dbZone?: { image?: string | null; coverImage?: string | null }, fallbackIndex: number = 0): string {
  // 1. Prioridad ABSOLUTA: Si el usuario subió su propia foto real en el panel de administración (WhatsApp, cámara, archivo local)
  if (dbZone?.image && isUserUploaded(dbZone.image)) {
    return dbZone.image;
  }
  if (dbZone?.coverImage && isUserUploaded(dbZone.coverImage)) {
    return dbZone.coverImage;
  }

  // 2. Si no hay foto subida por el usuario, usar lo que tenga en BD siempre que no sea Wikimedia prohibida
  let customImg = dbZone ? (dbZone.image || dbZone.coverImage) : null;
  if (isUnwantedOldImage(customImg) && customImg === dbZone?.image) {
    customImg = dbZone?.coverImage || null;
  }
  if (isUnwantedOldImage(customImg)) {
    customImg = null;
  }
  
  if (!customImg || customImg.trim() === '') {
    const normalized = cantonName.trim().toLowerCase();
    customImg = DEFAULT_CANTON_IMAGES[normalized] || Object.entries(DEFAULT_CANTON_IMAGES).find(([key]) => normalized.includes(key) || key.includes(normalized))?.[1] || null;
  }
  
  if (!customImg || customImg.trim() === '') {
    customImg = AUTHENTIC_CR_FALLBACKS[Math.abs(fallbackIndex) % AUTHENTIC_CR_FALLBACKS.length];
  }

  return customImg;
}

export function getCantonCoverImage(cantonName: string, dbZone?: { image?: string | null; coverImage?: string | null }, fallbackIndex: number = 0): string {
  // 1. Prioridad ABSOLUTA: Si el usuario subió su propia foto real en el panel de administración
  if (dbZone?.coverImage && isUserUploaded(dbZone.coverImage)) {
    return dbZone.coverImage;
  }
  if (dbZone?.image && isUserUploaded(dbZone.image)) {
    return dbZone.image;
  }

  // 2. Si no hay foto subida por el usuario, usar la portada de la BD siempre que no sea Wikimedia prohibida
  let customImg = dbZone ? (dbZone.coverImage || dbZone.image) : null;
  if (isUnwantedOldImage(customImg) && customImg === dbZone?.coverImage) {
    customImg = dbZone?.image || null;
  }
  if (isUnwantedOldImage(customImg)) {
    customImg = null;
  }
  
  // Solo si el administrador NO ha configurado una foto auténtica, usamos la galería oficial por defecto
  if (!customImg || customImg.trim() === '') {
    const normalizeText = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
    const normalizedInput = normalizeText(cantonName);
    
    // Primero exacta
    const exact = cantonName.trim().toLowerCase();
    if (DEFAULT_CANTON_IMAGES[exact]) {
      customImg = DEFAULT_CANTON_IMAGES[exact];
    } else {
      // Luego sin tildes
      for (const [key, value] of Object.entries(DEFAULT_CANTON_IMAGES)) {
        const normalizedKey = normalizeText(key);
        if (normalizedKey === normalizedInput || normalizedInput.includes(normalizedKey) || normalizedKey.includes(normalizedInput)) {
          customImg = value;
          break;
        }
      }
    }
  }
  
  if (!customImg || customImg.trim() === '') {
    customImg = AUTHENTIC_CR_FALLBACKS[Math.abs(fallbackIndex) % AUTHENTIC_CR_FALLBACKS.length];
  }

  return customImg;
}
