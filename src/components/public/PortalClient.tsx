"use client";

import { useState, useMemo } from 'react';
import { Search, MapPin, Home, DollarSign, Tag } from 'lucide-react';
import PropertyCard, { PropertyData } from '@/components/properties/PropertyCard';

interface PortalClientProps {
  initialCanton: string | null;
  allProperties: PropertyData[];
}

const PROVINCE_CANTON_MAPPING: Record<string, string[]> = {
  "san josé": ["san josé", "escazú", "santa ana", "curridabat", "rohrmoser", "lindora", "mora", "ciudad colón", "moravia", "tibás", "goicoechea", "montes de oca", "san pedro", "pérez zeledón", "desamparados", "puriscal"],
  "alajuela": ["alajuela", "grecia", "atenas", "san ramón", "naranjo", "san carlos", "ciudad quesada", "palmares", "orotina", "la garita"],
  "cartago": ["cartago", "la unión", "tres ríos", "paraíso", "turrialba", "oreamuno", "el guarco"],
  "heredia": ["heredia", "belén", "san rafael", "san isidro", "santo domingo", "barva", "cariari", "santa bárbara", "san pablo", "flores"],
  "guanacaste": ["guanacaste", "liberia", "tamarindo", "flamingo", "papagayo", "santa cruz", "nicoya", "nosara", "conchal", "potrero", "las catalinas", "playa grande", "carrillo"],
  "puntarenas": ["puntarenas", "jacó", "jaco", "herradura", "los sueños", "manuel antonio", "quepos", "uvita", "osa", "dominical", "santa teresa", "malpaís", "monteverde", "golfito", "esparza"],
  "limón": ["limón", "puerto viejo", "cahuita", "talamanca", "pococí", "guápiles", "manzanillo", "cocles", "siquirres", "guácimo"]
};

export default function PortalClient({ initialCanton, allProperties }: PortalClientProps) {
  // Estados para los filtros (Con nuevo filtro inteligente por Provincia y Cantón)
  const [locationFilter, setLocationFilter] = useState(initialCanton || "Todas las Ubicaciones");
  const [propertyType, setPropertyType] = useState("Tipo de Propiedad");
  const [priceRange, setPriceRange] = useState("Cualquier Precio");
  const [statusType, setStatusType] = useState("Operación");
  const [sortOrder, setSortOrder] = useState("Más Recientes");
  
  // Estado para la paginación (Cargar Más)
  const [visibleCount, setVisibleCount] = useState(6);

  // Lógica matemática y geográfica de filtrado en tiempo real
  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    // 1. Filtro por Ubicación Inteligente (Provincia o Cantón/Comuna)
    if (locationFilter && locationFilter !== "Todas las Ubicaciones") {
      const cleanFilter = locationFilter.replace(/\s*\(Provincia\)\s*/i, "").trim().toLowerCase();
      
      // Verificamos si seleccionó una provincia para buscar cualquiera de sus cantones
      if (PROVINCE_CANTON_MAPPING[cleanFilter]) {
        const keywords = PROVINCE_CANTON_MAPPING[cleanFilter];
        result = result.filter(p => {
          const text = ((p.address || '') + ' ' + (p.title || '') + ' ' + ((p as any).location || '')).toLowerCase();
          return keywords.some(kw => text.includes(kw));
        });
      } else {
        // Búsqueda por cantones, comunidades o términos combinados (ej. "Tamarindo & Flamingo")
        const terms = cleanFilter.split(/[\/&,]/).map(t => t.trim()).filter(Boolean);
        result = result.filter(p => {
          const text = ((p.address || '') + ' ' + (p.title || '') + ' ' + ((p as any).location || '')).toLowerCase();
          return terms.some(term => text.includes(term));
        });
      }
    }

    // 2. Filtro por Tipo de Propiedad
    if (propertyType !== "Tipo de Propiedad") {
      result = result.filter(p => p.type?.toLowerCase() === propertyType.toLowerCase());
    }

    // 3. Filtro por Operación (Venta / Alquiler)
    if (statusType !== "Operación") {
      result = result.filter(p => p.status?.toLowerCase().includes(statusType.toLowerCase()));
    }

    // 4. Filtro por Rango de Precio
    if (priceRange !== "Cualquier Precio") {
      result = result.filter(p => {
        if (priceRange === "< $500k") return p.price < 500000;
        if (priceRange === "$500k - $1M") return p.price >= 500000 && p.price <= 1000000;
        if (priceRange === "$1M - $3M") return p.price > 1000000 && p.price <= 3000000;
        if (priceRange === "+ $3M") return p.price > 3000000;
        return true;
      });
    }

    // 5. Ordenamiento (Sort)
    if (sortOrder === "Precio: Mayor a Menor") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Precio: Menor a Mayor") {
      result.sort((a, b) => a.price - b.price);
    } else {
      // "Más Recientes" - Simulamos que el ID más alto es más reciente
      result.sort((a, b) => (b.id as number) - (a.id as number));
    }

    return result;
  }, [allProperties, locationFilter, propertyType, priceRange, statusType, sortOrder]);

  // Manejador de Cargar Más
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  return (
    <>
      {/* 2. BARRA DE FILTROS (STICKY Y RESPONSIVA) */}
      <div className="sticky top-0 z-40 w-full border-b border-black/10 dark:border-white/10 shadow-sm backdrop-blur-lg bg-white/95 dark:bg-neutral-950/95 transition-all duration-500">
         <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
               
               {/* FILTRO DE UBICACIÓN (PROVINCIA & CANTón) */}
               <div className="relative w-full group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.15em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                  >
                     <option className="text-black bg-white" value="Todas las Ubicaciones">Provincia / Cantón</option>
                     <optgroup label="📍 PROVINCIAS DE COSTA RICA" className="text-black font-bold bg-neutral-100">
                       <option className="text-black bg-white" value="San José (Provincia)">Provincia de San José</option>
                       <option className="text-black bg-white" value="Alajuela (Provincia)">Provincia de Alajuela</option>
                       <option className="text-black bg-white" value="Cartago (Provincia)">Provincia de Cartago</option>
                       <option className="text-black bg-white" value="Heredia (Provincia)">Provincia de Heredia</option>
                       <option className="text-black bg-white" value="Guanacaste (Provincia)">Provincia de Guanacaste</option>
                       <option className="text-black bg-white" value="Puntarenas (Provincia)">Provincia de Puntarenas</option>
                       <option className="text-black bg-white" value="Limón (Provincia)">Provincia de Limón</option>
                     </optgroup>
                     <optgroup label="🏙️ CANTONES & COMUNIDADES EXCLUSIVAS" className="text-black font-bold bg-neutral-100">
                       <option className="text-black bg-white" value="Escazú">Escazú</option>
                       <option className="text-black bg-white" value="Santa Ana">Santa Ana</option>
                       <option className="text-black bg-white" value="Curridabat">Curridabat</option>
                       <option className="text-black bg-white" value="Rohrmoser">Rohrmoser & La Sabana</option>
                       <option className="text-black bg-white" value="Tres Ríos">La Unión / Tres Ríos</option>
                       <option className="text-black bg-white" value="Belén">Belén & Cariari</option>
                       <option className="text-black bg-white" value="Grecia">Grecia & Atenas</option>
                       <option className="text-black bg-white" value="Tamarindo">Tamarindo & Flamingo</option>
                       <option className="text-black bg-white" value="Papagayo">Papagayo & Conchal</option>
                       <option className="text-black bg-white" value="Nosara">Nosara & Las Catalinas</option>
                       <option className="text-black bg-white" value="Jacó">Jacó & Los Sueños</option>
                       <option className="text-black bg-white" value="Manuel Antonio">Manuel Antonio & Quepos</option>
                       <option className="text-black bg-white" value="Uvita">Uvita & Dominical</option>
                       <option className="text-black bg-white" value="Puerto Viejo">Puerto Viejo & Cahuita</option>
                     </optgroup>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-2 h-2 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-1 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                  </div>
               </div>

               {/* FILTRO TIPO DE PROPIEDAD */}
               <div className="relative w-full group">
                  <Home className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.15em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                  >
                     <option className="text-black bg-white" value="Tipo de Propiedad">Cualquier Tipo</option>
                     <option className="text-black bg-white" value="Casa">Casas de Lujo</option>
                     <option className="text-black bg-white" value="Apartamento">Apartamentos & Penthouse</option>
                     <option className="text-black bg-white" value="Lote">Lotes & Terrenos</option>
                     <option className="text-black bg-white" value="Edificio">Edificios Corporativos</option>
                     <option className="text-black bg-white" value="Finca">Fincas & Haciendas</option>
                     <option className="text-black bg-white" value="Local Comercial">Locales Comerciales</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-2 h-2 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-1 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                  </div>
               </div>

               {/* FILTRO DE PRESUPUESTO */}
               <div className="relative w-full group">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.15em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                  >
                     <option className="text-black bg-white" value="Cualquier Precio">Presupuesto (₡ / $)</option>
                     <option className="text-black bg-white" value="< $500k">Menos de $500k (₡260M)</option>
                     <option className="text-black bg-white" value="$500k - $1M">$500k - $1M (₡260M - ₡520M)</option>
                     <option className="text-black bg-white" value="$1M - $3M">$1M - $3M (₡520M - ₡1.5B)</option>
                     <option className="text-black bg-white" value="+ $3M">Más de $3M (₡1.5B+)</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-2 h-2 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-1 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                  </div>
               </div>

               {/* FILTRO DE OPERACIÓN */}
               <div className="relative w-full group">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={statusType}
                    onChange={(e) => setStatusType(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.15em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                  >
                     <option className="text-black bg-white" value="Operación">Venta o Alquiler</option>
                     <option className="text-black bg-white" value="Venta">En Venta Exclusiva</option>
                     <option className="text-black bg-white" value="Alquiler">En Alquiler de Lujo</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-2 h-2 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-1 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                  </div>
               </div>

            </div>
         </div>
      </div>

      {/* 3. RESULTADOS (GRID) */}
      <section className="w-full py-[80px] px-6">
         <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 border-b border-black/10 pb-4 gap-4">
               <span className="text-[13px] text-black dark:text-white uppercase tracking-[0.1em]">
                  Mostrando {filteredProperties.length} {filteredProperties.length === 1 ? 'Propiedad' : 'Propiedades'} 
                  {initialCanton ? ` en ${initialCanton}` : ''}
               </span>
               <select 
                 value={sortOrder}
                 onChange={(e) => setSortOrder(e.target.value)}
                 className="bg-transparent text-[12px] uppercase tracking-[0.1em] text-black dark:text-white outline-none cursor-pointer font-medium w-auto"
               >
                  <option className="bg-white dark:bg-neutral-900 text-black dark:text-white" value="Más Recientes">Más Recientes</option>
                  <option className="bg-white dark:bg-neutral-900 text-black dark:text-white" value="Precio: Mayor a Menor">Precio: Mayor a Menor</option>
                  <option className="bg-white dark:bg-neutral-900 text-black dark:text-white" value="Precio: Menor a Mayor">Precio: Menor a Mayor</option>
               </select>
            </div>

            {displayedProperties.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 transition-all duration-500">
                  {displayedProperties.map(prop => (
                     <div key={prop.id} className="w-full transform transition-all duration-500 hover:-translate-y-1">
                        <PropertyCard prop={prop} />
                     </div>
                  ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-32 text-black dark:text-white animate-in fade-in duration-700">
                  <MapPin className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-[18px] font-medium text-black dark:text-white mb-2">No se encontraron propiedades</p>
                  <p className="text-[14px] max-w-[400px] text-center">
                     Prueba ajustando los filtros de precio, tipo o ubicación para ver más resultados de nuestra colección.
                  </p>
                  <button 
                    onClick={() => {
                      setPropertyType("Tipo de Propiedad");
                      setPriceRange("Cualquier Precio");
                    }}
                    className="mt-6 px-6 py-2 border border-black/20 text-[12px] uppercase tracking-wider hover:border-black dark:border-white/20 transition-colors"
                  >
                    Limpiar Filtros
                  </button>
               </div>
            )}

            {/* Paginación simple */}
            {filteredProperties.length > visibleCount && (
              <div className="flex justify-center mt-16">
                 <button 
                   onClick={handleLoadMore}
                   className="px-10 py-4 bg-transparent border border-black dark:border-white/20 text-black dark:text-white text-[12px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300"
                 >
                    Cargar Más Propiedades
                 </button>
              </div>
            )}
         </div>
      </section>
    </>
  );
}
