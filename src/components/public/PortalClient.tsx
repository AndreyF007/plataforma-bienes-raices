"use client";

import { useState, useMemo } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import PropertyCard, { PropertyData } from '@/components/properties/PropertyCard';

interface PortalClientProps {
  initialCanton: string | null;
  allProperties: PropertyData[];
}

export default function PortalClient({ initialCanton, allProperties }: PortalClientProps) {
  // Estados para los filtros (Eliminados Búsqueda y Ubicación por ser portal dedicado)
  const [propertyType, setPropertyType] = useState("Tipo de Propiedad");
  const [priceRange, setPriceRange] = useState("Cualquier Precio");
  const [sortOrder, setSortOrder] = useState("Más Recientes");
  
  // Estado para la paginación (Cargar Más)
  const [visibleCount, setVisibleCount] = useState(6);

  // Lógica matemática de filtrado en tiempo real
  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    // 1. Filtro Estricto Dedicado (Cantón actual)
    if (initialCanton) {
      result = result.filter(p => p.address.toLowerCase().includes(initialCanton.toLowerCase()));
    }

    // 2. Filtro por Tipo de Propiedad
    if (propertyType !== "Tipo de Propiedad") {
      result = result.filter(p => p.type?.toLowerCase() === propertyType.toLowerCase());
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
  }, [allProperties, initialCanton, propertyType, priceRange, sortOrder]);

  // Manejador de Cargar Más
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  return (
    <>
      {/* 2. BARRA DE FILTROS (STICKY) */}
      <div className="sticky top-0 z-40 w-full border-b border-black/10 shadow-sm backdrop-blur-lg bg-white/90 transition-all duration-500">
         <div className="max-w-[1000px] mx-auto px-6 py-6 flex flex-col md:flex-row gap-6 items-center justify-center">
            {/* Selects de Propiedad y Precio Exclusivamente */}
            <div className="flex flex-wrap md:flex-nowrap gap-6 w-full md:w-auto justify-center">
               <div className="relative w-full md:w-[280px] group">
                  <Home className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-14 pr-10 py-4 bg-transparent border border-black/10 rounded-full text-[11px] uppercase tracking-[0.2em] outline-none appearance-none cursor-pointer hover:border-black dark:border-white/20 transition-all duration-500 text-black dark:text-white font-medium"
                  >
                     <option value="Tipo de Propiedad">Cualquier Tipo</option>
                     <option value="Casas">Casas</option>
                     <option value="Apartamentos">Apartamentos</option>
                     <option value="Lotes">Lotes</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-2 h-2 border-b border-r border-black/40 rotate-45 transform -translate-y-1 group-hover:border-black dark:border-white/20 transition-colors duration-500"></div>
                  </div>
               </div>

               <div className="relative w-full md:w-[280px] group">
                  <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full pl-14 pr-10 py-4 bg-transparent border border-black/10 rounded-full text-[11px] uppercase tracking-[0.2em] outline-none appearance-none cursor-pointer hover:border-black dark:border-white/20 transition-all duration-500 text-black dark:text-white font-medium"
                  >
                     <option value="Cualquier Precio">Cualquier Presupuesto</option>
                     <option value="< $500k">Menos de $500k</option>
                     <option value="$500k - $1M">$500k - $1M</option>
                     <option value="$1M - $3M">$1M - $3M</option>
                     <option value="+ $3M">Más de $3M</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-2 h-2 border-b border-r border-black/40 rotate-45 transform -translate-y-1 group-hover:border-black dark:border-white/20 transition-colors duration-500"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. RESULTADOS (GRID) */}
      <section className="w-full py-[80px] px-6">
         <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 border-b border-black/10 pb-4 gap-4">
               <span className="text-[13px] text-black/60 dark:text-white/60 uppercase tracking-[0.1em]">
                  Mostrando {filteredProperties.length} {filteredProperties.length === 1 ? 'Propiedad' : 'Propiedades'} 
                  {initialCanton ? ` en ${initialCanton}` : ''}
               </span>
               <select 
                 value={sortOrder}
                 onChange={(e) => setSortOrder(e.target.value)}
                 className="bg-transparent text-[12px] uppercase tracking-[0.1em] text-black dark:text-white outline-none cursor-pointer font-medium w-auto"
               >
                  <option value="Más Recientes">Más Recientes</option>
                  <option value="Precio: Mayor a Menor">Precio: Mayor a Menor</option>
                  <option value="Precio: Menor a Mayor">Precio: Menor a Mayor</option>
               </select>
            </div>

            {displayedProperties.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
                  {displayedProperties.map(prop => (
                     <PropertyCard key={prop.id} prop={prop} />
                  ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-32 text-black/50 dark:text-white/50 animate-in fade-in duration-700">
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
