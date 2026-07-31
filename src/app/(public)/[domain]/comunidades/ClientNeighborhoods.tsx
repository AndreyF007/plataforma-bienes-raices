'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface Canton {
  name: string;
  province: string;
  img: string;
}

function ClientNeighborhoodsContent({ zones = [] }: { zones?: any[] }) {
  const searchParams = useSearchParams();
  const initialZone = searchParams.get('zona') || 'Todas';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(initialZone);

  const provinces = ["Todas", "San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];

  // Conjunto de imágenes 100% auténticas de paisajes y monumentos costarricenses (bosques tropicales, volcanes, playas y arquitectura local - CERO nieve, CERO desierto)
  const authenticCRFallbacks = [
    "https://upload.wikimedia.org/wikipedia/commons/e/ea/Teatro_Nacional_de_Costa_Rica.jpg", // Teatro Nacional
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg/1280px-Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg", // Volcán Arenal
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Manuel_Antonio_Beach_Costa_Rica.jpg/1280px-Manuel_Antonio_Beach_Costa_Rica.jpg", // Manuel Antonio
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg/1280px-Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg", // Basílica Cartago
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg/1280px-Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg", // Monteverde
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tamarindo_Beach_Costa_Rica.jpg/1280px-Tamarindo_Beach_Costa_Rica.jpg", // Tamarindo
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Puerto_Viejo_de_Talamanca_Beach.jpg/1280px-Puerto_Viejo_de_Talamanca_Beach.jpg", // Puerto Viejo Limon
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volcan_Poas_Crater_Costa_Rica.jpg/1280px-Volcan_Poas_Crater_Costa_Rica.jpg", // Volcán Poás
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/El_Fort%C3%ADn_Heredia_Costa_Rica.jpg/1280px-El_Fort%C3%ADn_Heredia_Costa_Rica.jpg", // El Fortín Heredia
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rio_Celeste_Waterfall_Costa_Rica.jpg/1280px-Rio_Celeste_Waterfall_Costa_Rica.jpg", // Río Celeste
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Coffee_Plantation_Costa_Rica.jpg/1280px-Coffee_Plantation_Costa_Rica.jpg", // Cafetales Tarrazú/Los Santos
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Corcovado_National_Park_Costa_Rica.jpg/1280px-Corcovado_National_Park_Costa_Rica.jpg", // Corcovado
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Zarcero_Topiary_Park_Costa_Rica.jpg/1280px-Zarcero_Topiary_Park_Costa_Rica.jpg", // Zarcero Parque
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sarchi_Oxcart_Costa_Rica.jpg/1280px-Sarchi_Oxcart_Costa_Rica.jpg" // Sarchí Carreta Tica
  ];

  // Mapas específicos de fotos reales por cantón para que TODAS las tarjetitas muestren lugares representativos costarricenses
  const defaultCantonImages: Record<string, string> = {
    // San José (20)
    "San José": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Teatro_Nacional_de_Costa_Rica.jpg",
    "Escazú": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Church_of_San_Miguel_in_Escazu.jpg",
    "Desamparados": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Catedral_de_Nuestra_Se%C3%B1ora_de_los_Desamparados.jpg",
    "Puriscal": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ruinas_de_la_Antigua_Iglesia_de_Puriscal.jpg",
    "Tarrazú": "https://upload.wikimedia.org/wikipedia/commons/3/33/San_Marcos_de_Tarraz%C3%BAn%2C_Costa_Rica.jpg",
    "Aserrí": "https://upload.wikimedia.org/wikipedia/commons/9/90/Vista_de_Aserri_y_sus_monta%C3%B1as.jpg",
    "Mora": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Ciudad_Col%C3%B3n_centro.jpg",
    "Goicoechea": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Guadalupe_Goicoechea_parque.jpg",
    "Santa Ana": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Valley_of_Santa_Ana%2C_Costa_Rica.jpg",
    "Alajuelita": "https://upload.wikimedia.org/wikipedia/commons/8/8e/La_Cruz_de_Alajuelita_Cerro_San_Miguel.jpg",
    "Vázquez de Coronado": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Iglesia_de_Coronado_Costa_Rica.jpg",
    "Acosta": "https://upload.wikimedia.org/wikipedia/commons/5/5e/San_Ignacio_de_Acosta_templo.jpg",
    "Tibás": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Estadio_Ricardo_Saprissa.jpg",
    "Moravia": "https://upload.wikimedia.org/wikipedia/commons/d/df/San_Vicente_de_Moravia_iglesia.jpg",
    "Montes de Oca": "https://upload.wikimedia.org/wikipedia/commons/6/64/Fuente_de_la_Hispanidad_Costa_Rica.jpg",
    "Turrubares": "https://upload.wikimedia.org/wikipedia/commons/2/25/San_Pablo_de_Turrubares_Costa_Rica.jpg",
    "Dota": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Santa_Maria_de_Dota_Costa_Rica.jpg",
    "Curridabat": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Curridabat_centro_iglesia.jpg",
    "Pérez Zeledón": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Cerro_Chirrip%C3%B3_Costa_Rica.jpg",
    "León Cortés Castro": "https://upload.wikimedia.org/wikipedia/commons/0/02/San_Pablo_de_Leon_Cortes.jpg",

    // Alajuela (16)
    "Alajuela": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Juan_Santamaria_Statue_Alajuela.jpg/800px-Juan_Santamaria_Statue_Alajuela.jpg",
    "San Ramón": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/San_Ramon_Costa_Rica_Church.jpg/800px-San_Ramon_Costa_Rica_Church.jpg",
    "Grecia": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Metal_Church_Grecia_Costa_Rica.jpg/800px-Metal_Church_Grecia_Costa_Rica.jpg",
    "San Carlos": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg/800px-Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg",
    "Zarcero": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Zarcero_Topiary_Park_Costa_Rica.jpg/800px-Zarcero_Topiary_Park_Costa_Rica.jpg",
    "Sarchí": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sarchi_Oxcart_Costa_Rica.jpg/800px-Sarchi_Oxcart_Costa_Rica.jpg",
    "Poás": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volcan_Poas_Crater_Costa_Rica.jpg/800px-Volcan_Poas_Crater_Costa_Rica.jpg",
    "Atenas": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Atenas_Central_Park_Costa_Rica.jpg/800px-Atenas_Central_Park_Costa_Rica.jpg",
    
    // Cartago (8)
    "Cartago": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg/800px-Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg",
    "Oreamuno": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Irazu_Volcano_Crater_Costa_Rica.jpg/800px-Irazu_Volcano_Crater_Costa_Rica.jpg",
    "Paraíso": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Orosi_Valley_Costa_Rica.jpg/800px-Orosi_Valley_Costa_Rica.jpg",
    "Turrialba": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Turrialba_Volcano_Costa_Rica.jpg/800px-Turrialba_Volcano_Costa_Rica.jpg",

    // Heredia (10)
    "Heredia": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/El_Fort%C3%ADn_Heredia_Costa_Rica.jpg/800px-El_Fort%C3%ADn_Heredia_Costa_Rica.jpg",
    "Barva": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Barva_Volcano_Lagoon_Costa_Rica.jpg/800px-Barva_Volcano_Lagoon_Costa_Rica.jpg",
    "Sarapiquí": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sarapiqui_River_Rainforest.jpg/800px-Sarapiqui_River_Rainforest.jpg",

    // Guanacaste (11)
    "Liberia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liberia_Costa_Rica_Colonial_Architecture.jpg/800px-Liberia_Costa_Rica_Colonial_Architecture.jpg",
    "Nicoya": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Iglesia_Colonial_de_Nicoya.jpg/800px-Iglesia_Colonial_de_Nicoya.jpg",
    "Santa Cruz": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tamarindo_Beach_Costa_Rica.jpg/800px-Tamarindo_Beach_Costa_Rica.jpg",
    "Carrillo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Playa_Conchal_Guanacaste.jpg/800px-Playa_Conchal_Guanacaste.jpg",
    "Tilarán": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lake_Arenal_Windmills_Tilaran.jpg/800px-Lake_Arenal_Windmills_Tilaran.jpg",

    // Puntarenas (13)
    "Puntarenas": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paseo_de_los_Turistas_Puntarenas.jpg/800px-Paseo_de_los_Turistas_Puntarenas.jpg",
    "Quepos": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Manuel_Antonio_Beach_Costa_Rica.jpg/800px-Manuel_Antonio_Beach_Costa_Rica.jpg",
    "Monteverde": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg/800px-Monteverde_Cloud_Forest_Reserve_Costa_Rica.jpg",
    "Garabito": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Jaco_Beach_Costa_Rica.jpg/800px-Jaco_Beach_Costa_Rica.jpg",
    "Osa": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Corcovado_National_Park_Costa_Rica.jpg/800px-Corcovado_National_Park_Costa_Rica.jpg",
    "Golfito": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Golfito_Bay_Costa_Rica.jpg/800px-Golfito_Bay_Costa_Rica.jpg",

    // Limón (6)
    "Limón": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Puerto_Limon_Coast_Costa_Rica.jpg/800px-Puerto_Limon_Coast_Costa_Rica.jpg",
    "Talamanca": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Puerto_Viejo_de_Talamanca_Beach.jpg/800px-Puerto_Viejo_de_Talamanca_Beach.jpg",
    "Pococí": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tortuguero_Canals_Costa_Rica.jpg/800px-Tortuguero_Canals_Costa_Rica.jpg",
    "Siquirres": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Pacuare_River_Rapids_Costa_Rica.jpg/800px-Pacuare_River_Rapids_Costa_Rica.jpg"
  };

  // Base de datos de los 84 Cantones
  const allCantonsData = [
    // San José (20)
    "San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés Castro",
    // Alajuela (16)
    "Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto",
    // Cartago (8)
    "Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco",
    // Heredia (10)
    "Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí",
    // Guanacaste (11)
    "Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha",
    // Puntarenas (13)
    "Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito", "Monteverde", "Puerto Jiménez",
    // Limón (6)
    "Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"
  ];

  // Mapear la provincia según el índice para evitar hardcodear 84 objetos a mano
  const mappedCantons: Canton[] = allCantonsData.map((name, index) => {
    let prov = "";
    if (index < 20) prov = "San José";
    else if (index < 36) prov = "Alajuela";
    else if (index < 44) prov = "Cartago";
    else if (index < 54) prov = "Heredia";
    else if (index < 65) prov = "Guanacaste";
    else if (index < 78) prov = "Puntarenas";
    else prov = "Limón";

    const matchedZone = zones?.find(z => z.name.toLowerCase() === name.toLowerCase());
    // Prioridad 1: Imagen que tengas en base de datos de administración (si se modificó)
    // Prioridad 2: Nuestro mapa específico de hitos ticos para el cantón
    // Prioridad 3: Fotos costarricenses de bosques/playas en rotación (CERO desiertos ni nieve)
    let customImg = matchedZone ? (matchedZone.image || matchedZone.coverImage) : null;
    if (!customImg || customImg.includes("unsplash.com")) {
      customImg = defaultCantonImages[name] || null;
    }
    const finalImg = (customImg && customImg !== '') ? customImg : authenticCRFallbacks[index % authenticCRFallbacks.length];

    return {
      name,
      province: prov,
      img: finalImg
    };
  });

  // Filtrar
  const filteredCantons = mappedCantons.filter(c => {
    const matchProvince = selectedProvince === "Todas" || c.province === selectedProvince;
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchProvince && matchSearch;
  });

  return (
    <div className="w-full bg-white dark:bg-neutral-950 pb-20">
       
       {/* BARRA DE BÚSQUEDA Y FILTROS */}
       <div className="w-full max-w-[1200px] mx-auto px-6 py-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
             
             {/* Pestañas de Provincias */}
             <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 flex-1">
                {provinces.map(prov => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvince(prov)}
                    className={`px-4 py-2 text-[10px] md:text-[12px] uppercase tracking-[0.1em] font-medium transition-all duration-300 border-b-2 hover:-translate-y-1 hover:scale-105 ${
                      selectedProvince === prov 
                        ? 'border-black dark:border-white text-black dark:text-white' 
                        : 'border-transparent text-black dark:text-white'
                    }`}
                  >
                    {prov}
                  </button>
                ))}
             </div>

             {/* Buscador */}
             <div className="relative w-full md:w-[300px]">
                <input 
                  type="text"
                  placeholder="BUSCAR CANTÓN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-black dark:text-white border-b border-black/30 dark:border-white/20 py-2 pl-8 pr-4 text-[12px] uppercase tracking-[0.1em] font-light focus:outline-none focus:border-black dark:focus:border-white/50 placeholder:text-black dark:placeholder:text-white"
                />
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black dark:text-white" />
             </div>
             
          </div>

          {/* Resultados de Búsqueda Info */}
          <div className="text-[12px] text-black dark:text-white uppercase tracking-[0.1em] mb-8">
            MOSTRANDO {filteredCantons.length} {filteredCantons.length === 1 ? 'CANTÓN' : 'CANTONES'} EN {selectedProvince.toUpperCase()}
          </div>
       </div>

       {/* GRID DE CANTONES (Filtro Activo) */}
       {filteredCantons.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
           {filteredCantons.map((hood, idx) => (
             <Link href={`/comunidades/${hood.name.toLowerCase().replace(/ /g, '-')}`} key={`${hood.name}-${idx}`} className="group relative w-full h-[300px] overflow-hidden block">
               {/* Overlay oscuro para legibilidad */}
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 z-10"></div>
               
               {/* Imagen de fondo */}
               <img 
                 src={hood.img} 
                 alt={hood.name} 
                 onError={(e) => {
                   const fallbacks = ["/images/zone-escazu.png", "/images/zone-guanacaste.png", "/images/zone-manuel.png", "/images/zone-nosara.png"];
                   (e.target as HTMLImageElement).src = fallbacks[idx % fallbacks.length];
                 }}
                 className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               
               {/* Contenido (Nombre) */}
               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                 <h3 className="text-white text-[18px] md:text-[22px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.15em] mb-2 group-hover:-translate-y-4 transition-transform duration-500">
                   {hood.name}
                 </h3>
                 <span className="text-white text-[10px] uppercase tracking-[0.2em] mb-4 group-hover:-translate-y-4 transition-transform duration-500 delay-75">
                   {hood.province}
                 </span>
                 
                 {/* Botón Learn More oculto que aparece en hover */}
                 <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-block border border-white text-white text-[10px] uppercase tracking-[0.2em] px-8 py-3">
                       EXPLORAR ZONA
                    </span>
                 </div>
               </div>
             </Link>
           ))}
         </div>
       ) : (
         <div className="w-full py-20 text-center flex flex-col items-center justify-center min-h-[300px]">
            <Search className="w-12 h-12 text-black mb-4" />
            <p className="text-[14px] text-black dark:text-white uppercase tracking-[0.1em] font-light">NO SE ENCONTRARON CANTONES CON ESE NOMBRE.</p>
         </div>
       )}
    </div>
  );
}

export default function ClientNeighborhoods({ zones = [] }: { zones?: any[] }) {
  return (
    <Suspense fallback={<div className="w-full bg-white dark:bg-neutral-950 pb-20 min-h-screen"></div>}>
      <ClientNeighborhoodsContent zones={zones} />
    </Suspense>
  );
}
