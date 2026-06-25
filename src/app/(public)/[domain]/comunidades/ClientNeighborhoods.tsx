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

function ClientNeighborhoodsContent() {
  const searchParams = useSearchParams();
  const initialZone = searchParams.get('zona') || 'Todas';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(initialZone);

  const provinces = ["Todas", "San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];

  // Conjunto de imágenes rotativas premium (playas, ciudades, montañas)
  const premiumImages = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518182170546-076616fdacaf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520116468816-921d7b6935cc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"
  ];

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

    return {
      name,
      province: prov,
      img: premiumImages[index % premiumImages.length]
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

export default function ClientNeighborhoods() {
  return (
    <Suspense fallback={<div className="w-full bg-white dark:bg-neutral-950 pb-20 min-h-screen"></div>}>
      <ClientNeighborhoodsContent />
    </Suspense>
  );
}
