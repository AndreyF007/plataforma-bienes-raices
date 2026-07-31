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

  return {
    population: dbZone?.population || base.population,
    medianAge: dbZone?.medianAge || base.medianAge,
    avgIncome: dbZone?.avgIncome || base.avgIncome,
    walkScore: dbZone?.walkScore || base.walkScore,
    bikeScore: dbZone?.bikeScore || base.bikeScore,
  };
}

export const DEFAULT_CANTON_IMAGES: Record<string, string> = {
  // San José (20)
  "san josé": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Teatro_Nacional_de_Costa_Rica.jpg",
  "escazú": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Church_of_San_Miguel_in_Escazu.jpg",
  "desamparados": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Catedral_de_Nuestra_Se%C3%B1ora_de_los_Desamparados.jpg",
  "puriscal": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ruinas_de_la_Antigua_Iglesia_de_Puriscal.jpg",
  "tarrazú": "https://upload.wikimedia.org/wikipedia/commons/3/33/San_Marcos_de_Tarraz%C3%BAn%2C_Costa_Rica.jpg",
  "aserrí": "https://upload.wikimedia.org/wikipedia/commons/9/90/Vista_de_Aserri_y_sus_monta%C3%B1as.jpg",
  "mora": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Ciudad_Col%C3%B3n_centro.jpg",
  "ciudad colón": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Ciudad_Col%C3%B3n_centro.jpg",
  "goicoechea": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Guadalupe_Goicoechea_parque.jpg",
  "santa ana": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Valley_of_Santa_Ana%2C_Costa_Rica.jpg",
  "alajuelita": "https://upload.wikimedia.org/wikipedia/commons/8/8e/La_Cruz_de_Alajuelita_Cerro_San_Miguel.jpg",
  "vázquez de coronado": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Iglesia_de_Coronado_Costa_Rica.jpg",
  "coronado": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Iglesia_de_Coronado_Costa_Rica.jpg",
  "acosta": "https://upload.wikimedia.org/wikipedia/commons/5/5e/San_Ignacio_de_Acosta_templo.jpg",
  "tibás": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Estadio_Ricardo_Saprissa.jpg",
  "moravia": "https://upload.wikimedia.org/wikipedia/commons/d/df/San_Vicente_de_Moravia_iglesia.jpg",
  "montes de oca": "https://upload.wikimedia.org/wikipedia/commons/6/64/Fuente_de_la_Hispanidad_Costa_Rica.jpg",
  "san pedro": "https://upload.wikimedia.org/wikipedia/commons/6/64/Fuente_de_la_Hispanidad_Costa_Rica.jpg",
  "turrubares": "https://upload.wikimedia.org/wikipedia/commons/2/25/San_Pablo_de_Turrubares_Costa_Rica.jpg",
  "dota": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Santa_Maria_de_Dota_Costa_Rica.jpg",
  "curridabat": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Curridabat_centro_iglesia.jpg",
  "pérez zeledón": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Cerro_Chirrip%C3%B3_Costa_Rica.jpg",
  "león cortés castro": "https://upload.wikimedia.org/wikipedia/commons/0/02/San_Pablo_de_Leon_Cortes.jpg",

  // Alajuela (16)
  "alajuela": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Juan_Santamaria_Statue_Alajuela.jpg/800px-Juan_Santamaria_Statue_Alajuela.jpg",
  "san ramón": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/San_Ramon_Costa_Rica_Church.jpg/800px-San_Ramon_Costa_Rica_Church.jpg",
  "grecia": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Metal_Church_Grecia_Costa_Rica.jpg/800px-Metal_Church_Grecia_Costa_Rica.jpg",
  "san carlos": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg/800px-Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg",
  "ciudad quesada": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg/800px-Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg",
  "zarcero": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Zarcero_Topiary_Park_Costa_Rica.jpg/800px-Zarcero_Topiary_Park_Costa_Rica.jpg",
  "sarchí": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sarchi_Oxcart_Costa_Rica.jpg/800px-Sarchi_Oxcart_Costa_Rica.jpg",
  "poás": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volcan_Poas_Crater_Costa_Rica.jpg/800px-Volcan_Poas_Crater_Costa_Rica.jpg",
  "atenas": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Atenas_Central_Park_Costa_Rica.jpg/800px-Atenas_Central_Park_Costa_Rica.jpg",
  
  // Cartago (8)
  "cartago": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg/800px-Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg",
  "oreamuno": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Irazu_Volcano_Crater_Costa_Rica.jpg/800px-Irazu_Volcano_Crater_Costa_Rica.jpg",
  "paraíso": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Orosi_Valley_Costa_Rica.jpg/800px-Orosi_Valley_Costa_Rica.jpg",
  "turrialba": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Turrialba_Volcano_Costa_Rica.jpg/800px-Turrialba_Volcano_Costa_Rica.jpg",

  // Heredia (10)
  "heredia": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/El_Fort%C3%ADn_Heredia_Costa_Rica.jpg/800px-El_Fort%C3%ADn_Heredia_Costa_Rica.jpg",
  "barva": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Barva_Volcano_Lagoon_Costa_Rica.jpg/800px-Barva_Volcano_Lagoon_Costa_Rica.jpg",
  "sarapiquí": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sarapiqui_River_Rainforest.jpg/800px-Sarapiqui_River_Rainforest.jpg",

  // Guanacaste (11)
  "liberia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liberia_Costa_Rica_Colonial_Architecture.jpg/800px-Liberia_Costa_Rica_Colonial_Architecture.jpg",
  "nicoya": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Iglesia_Colonial_de_Nicoya.jpg/800px-Iglesia_Colonial_de_Nicoya.jpg",
  "santa cruz": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tamarindo_Beach_Costa_Rica.jpg/800px-Tamarindo_Beach_Costa_Rica.jpg",
  "carrillo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Playa_Conchal_Guanacaste.jpg/800px-Playa_Conchal_Guanacaste.jpg",
  "tilarán": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lake_Arenal_Windmills_Tilaran.jpg/800px-Lake_Arenal_Windmills_Tilaran.jpg",

  // Puntarenas (13)
  "puntarenas": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paseo_de_los_Turistas_Puntarenas.jpg/800px-Paseo_de_los_Turistas_Puntarenas.jpg",
  "quepos": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Manuel_Antonio_Beach_Costa_Rica.jpg/800px-Manuel_Antonio_Beach_Costa_Rica.jpg",
  "monteverde": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg/800px-Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg",
  "garabito": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Jaco_Beach_Costa_Rica.jpg/800px-Jaco_Beach_Costa_Rica.jpg",
  "jacó": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Jaco_Beach_Costa_Rica.jpg/800px-Jaco_Beach_Costa_Rica.jpg",
  "osa": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Corcovado_National_Park_Costa_Rica.jpg/800px-Corcovado_National_Park_Costa_Rica.jpg",
  "golfito": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Golfito_Bay_Costa_Rica.jpg/800px-Golfito_Bay_Costa_Rica.jpg",

  // Limón (6)
  "limón": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Puerto_Limon_Coast_Costa_Rica.jpg/800px-Puerto_Limon_Coast_Costa_Rica.jpg",
  "talamanca": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Puerto_Viejo_de_Talamanca_Beach.jpg/800px-Puerto_Viejo_de_Talamanca_Beach.jpg",
  "puerto viejo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Puerto_Viejo_de_Talamanca_Beach.jpg/800px-Puerto_Viejo_de_Talamanca_Beach.jpg",
  "pococí": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tortuguero_Canals_Costa_Rica.jpg/800px-Tortuguero_Canals_Costa_Rica.jpg",
  "siquirres": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Pacuare_River_Rapids_Costa_Rica.jpg/800px-Pacuare_River_Rapids_Costa_Rica.jpg"
};

export const AUTHENTIC_CR_FALLBACKS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Manuel_Antonio_Beach_Costa_Rica.jpg/800px-Manuel_Antonio_Beach_Costa_Rica.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg/800px-Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Corcovado_National_Park_Costa_Rica.jpg/800px-Corcovado_National_Park_Costa_Rica.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Orosi_Valley_Costa_Rica.jpg/800px-Orosi_Valley_Costa_Rica.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a2/Valley_of_Santa_Ana%2C_Costa_Rica.jpg"
];

export function getCantonCoverImage(cantonName: string, dbZone?: { image?: string | null; coverImage?: string | null }, fallbackIndex: number = 0): string {
  // 1. Prioridad máxima: foto personalizada subida o establecida en la base de datos por el administrador
  let customImg = dbZone ? (dbZone.coverImage || dbZone.image) : null;
  
  // Si no se personalizó en DB o quedó un placeholder genérico de unsplash/desiertos, usar nuestra galería oficial tica
  if (!customImg || customImg.trim() === '' || customImg.includes("unsplash.com")) {
    const normalized = cantonName.trim().toLowerCase();
    customImg = DEFAULT_CANTON_IMAGES[normalized] || Object.entries(DEFAULT_CANTON_IMAGES).find(([key]) => normalized.includes(key) || key.includes(normalized))?.[1] || null;
  }
  
  // Respaldo oficial costarricense si el cantón no tiene foto asignada
  if (!customImg || customImg.trim() === '') {
    customImg = AUTHENTIC_CR_FALLBACKS[Math.abs(fallbackIndex) % AUTHENTIC_CR_FALLBACKS.length];
  }

  return customImg;
}
