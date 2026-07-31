"use client";

import { useState, useMemo } from 'react';
import { Search, MapPin, Home, DollarSign, Tag } from 'lucide-react';
import PropertyCard, { PropertyData } from '@/components/properties/PropertyCard';

interface PortalClientProps {
  initialCanton: string | null;
  allProperties: PropertyData[];
}

interface ProvinceInfo {
  label: string;
  defaultCanton: string;
  keywords: string[];
  cantons: string[];
}

const PROVINCE_DATA: Record<string, ProvinceInfo> = {
  "San José": {
    label: "Provincia de San José",
    defaultCanton: "Cualquier Cantón de San José",
    keywords: ["san josé", "escazú", "santa ana", "curridabat", "rohrmoser", "lindora", "mora", "ciudad colón", "moravia", "tibás", "goicoechea", "montes de oca", "san pedro", "pérez zeledón", "desamparados", "puriscal"],
    cantons: ["Escazú", "Santa Ana", "Curridabat", "Rohrmoser & La Sabana", "Mora / Ciudad Colón", "Moravia & Tibás", "Montes de Oca / San Pedro", "Pérez Zeledón", "Desamparados", "Puriscal"]
  },
  "Alajuela": {
    label: "Provincia de Alajuela",
    defaultCanton: "Cualquier Cantón de Alajuela",
    keywords: ["alajuela", "grecia", "atenas", "san ramón", "naranjo", "san carlos", "ciudad quesada", "palmares", "orotina", "la garita"],
    cantons: ["Alajuela Centro / La Garita", "Grecia & Atenas", "San Carlos / Ciudad Quesada", "San Ramón & Naranjo", "Palmares & Orotina"]
  },
  "Cartago": {
    label: "Provincia de Cartago",
    defaultCanton: "Cualquier Cantón de Cartago",
    keywords: ["cartago", "la unión", "tres ríos", "paraíso", "turrialba", "oreamuno", "el guarco"],
    cantons: ["La Unión / Tres Ríos", "Cartago Centro", "Paraíso & Turrialba", "Oreamuno"]
  },
  "Heredia": {
    label: "Provincia de Heredia",
    defaultCanton: "Cualquier Cantón de Heredia",
    keywords: ["heredia", "belén", "san rafael", "san isidro", "santo domingo", "barva", "cariari", "santa bárbara", "san pablo", "flores"],
    cantons: ["Belén & Cariari", "Heredia Centro & San Pablo", "San Rafael & San Isidro", "Santo Domingo & Barva"]
  },
  "Guanacaste": {
    label: "Provincia de Guanacaste",
    defaultCanton: "Cualquier Cantón de Guanacaste",
    keywords: ["guanacaste", "liberia", "tamarindo", "flamingo", "papagayo", "santa cruz", "nicoya", "nosara", "conchal", "potrero", "las catalinas", "playa grande", "carrillo"],
    cantons: ["Tamarindo & Flamingo", "Papagayo & Hermosa", "Nosara & Las Catalinas", "Conchal & Potrero", "Liberia & Santa Cruz"]
  },
  "Puntarenas": {
    label: "Provincia de Puntarenas",
    defaultCanton: "Cualquier Cantón de Puntarenas",
    keywords: ["puntarenas", "jacó", "jaco", "herradura", "los sueños", "manuel antonio", "quepos", "uvita", "osa", "dominical", "santa teresa", "malpaís", "monteverde", "golfito", "esparza"],
    cantons: ["Jacó & Los Sueños", "Manuel Antonio & Quepos", "Uvita & Dominical", "Santa Teresa & Malpaís", "Monteverde & Esparza", "Osa / Puerto Jiménez"]
  },
  "Limón": {
    label: "Provincia de Limón",
    defaultCanton: "Cualquier Cantón de Limón",
    keywords: ["limón", "puerto viejo", "cahuita", "talamanca", "pococí", "guápiles", "manzanillo", "cocles", "siquirres", "guácimo"],
    cantons: ["Puerto Viejo & Cocles", "Cahuita & Manzanillo", "Limón Centro", "Guápiles & Pococí"]
  }
};

export default function PortalClient({ initialCanton, allProperties }: PortalClientProps) {
  // Determinamos si el cantón inicial pertenece a una provincia en particular
  const defaultProv = useMemo(() => {
    if (!initialCanton) return "Todas las Provincias";
    for (const [provName, data] of Object.entries(PROVINCE_DATA)) {
      if (data.keywords.some(k => initialCanton.toLowerCase().includes(k) || k.includes(initialCanton.toLowerCase()))) {
        return provName;
      }
    }
    return "Todas las Provincias";
  }, [initialCanton]);

  // Estados para los filtros (Ahora en cascada inteligente Provincia -> Cantón)
  const [provinceFilter, setProvinceFilter] = useState(defaultProv);
  const [cantonFilter, setCantonFilter] = useState(initialCanton || "Cualquier Cantón");
  const [propertyType, setPropertyType] = useState("Tipo de Propiedad");
  const [priceRange, setPriceRange] = useState("Cualquier Precio");
  const [statusType, setStatusType] = useState("Operación");
  const [sortOrder, setSortOrder] = useState("Más Recientes");
  
  // Estado para la paginación (Cargar Más)
  const [visibleCount, setVisibleCount] = useState(6);

  // Cambio de Provincia: actualiza y reinicia en cascada el Cantón a los de esa provincia exclusivamente
  const handleProvinceChange = (newProv: string) => {
    setProvinceFilter(newProv);
    if (newProv === "Todas las Provincias") {
      setCantonFilter("Cualquier Cantón");
    } else {
      setCantonFilter(PROVINCE_DATA[newProv]?.defaultCanton || "Cualquier Cantón");
    }
  };

  // Lógica matemática y geográfica de filtrado en tiempo real
  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    // 1 & 2. Filtros de Ubicación (Provincia y Cantón)
    if (initialCanton) {
      // Al entrar a una comunidad ("LA COLECCIÓN EN [CANTÓN]"), la ubicación ya está fijada al cantón
      const terms = initialCanton.toLowerCase().split(/[\/&,]/).map(t => t.trim()).filter(Boolean);
      result = result.filter(p => {
        const text = ((p.address || '') + ' ' + (p.title || '') + ' ' + ((p as any).location || '')).toLowerCase();
        return terms.some(term => text.includes(term));
      });
    } else {
      // En la página principal del catálogo ("Descubre nuestra selección"), aplicamos la cascada geográfica
      if (provinceFilter !== "Todas las Provincias" && PROVINCE_DATA[provinceFilter]) {
        const keywords = PROVINCE_DATA[provinceFilter].keywords;
        result = result.filter(p => {
          const text = ((p.address || '') + ' ' + (p.title || '') + ' ' + ((p as any).location || '')).toLowerCase();
          return keywords.some(kw => text.includes(kw));
        });
      }

      if (cantonFilter && !cantonFilter.startsWith("Cualquier") && cantonFilter !== "Cualquier Cantón") {
        const terms = cantonFilter.toLowerCase().split(/[\/&,]/).map(t => t.trim()).filter(Boolean);
        result = result.filter(p => {
          const text = ((p.address || '') + ' ' + (p.title || '') + ' ' + ((p as any).location || '')).toLowerCase();
          return terms.some(term => text.includes(term));
        });
      }
    }

    // 3. Filtro por Tipo de Propiedad
    if (propertyType !== "Tipo de Propiedad") {
      result = result.filter(p => p.type?.toLowerCase() === propertyType.toLowerCase());
    }

    // 4. Filtro por Operación (Venta / Alquiler)
    if (statusType !== "Operación") {
      result = result.filter(p => p.status?.toLowerCase().includes(statusType.toLowerCase()));
    }

    // 5. Filtro por Rango de Precio
    if (priceRange !== "Cualquier Precio") {
      result = result.filter(p => {
        if (priceRange === "< $500k") return p.price < 500000;
        if (priceRange === "$500k - $1M") return p.price >= 500000 && p.price <= 1000000;
        if (priceRange === "$1M - $3M") return p.price > 1000000 && p.price <= 3000000;
        if (priceRange === "+ $3M") return p.price > 3000000;
        return true;
      });
    }

    // 6. Ordenamiento (Sort)
    if (sortOrder === "Precio: Mayor a Menor") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Precio: Menor a Mayor") {
      result.sort((a, b) => a.price - b.price);
    } else {
      // "Más Recientes" - Simulamos que el ID más alto es más reciente
      result.sort((a, b) => (b.id as number) - (a.id as number));
    }

    return result;
  }, [allProperties, initialCanton, provinceFilter, cantonFilter, propertyType, priceRange, statusType, sortOrder]);

  // Manejador de Cargar Más
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  return (
    <>
      {/* 2. BARRA DE FILTROS (STICKY & RESPONSIVA) */}
      <div className="sticky top-0 z-40 w-full border-b border-black/10 dark:border-white/10 shadow-sm backdrop-blur-lg bg-white/95 dark:bg-neutral-950/95 transition-all duration-500">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
            <div className={`grid grid-cols-1 gap-3 sm:gap-4 w-full ${initialCanton ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-5'}`}>
               
               {/* 1 & 2. FILTROS DE PROVINCIA Y CANTÓN (Exclusivos para el catálogo general "Descubre nuestra selección de propiedades de lujo") */}
               {!initialCanton && (
                 <>
                   {/* 1. FILTRO DE PROVINCIA */}
                   <div className="relative w-full group">
                      <MapPin className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 dark:text-emerald-400 font-bold transition-colors duration-500" />
                      <select 
                        value={provinceFilter}
                        onChange={(e) => handleProvinceChange(e.target.value)}
                        className="w-full pl-11 pr-9 py-3 bg-neutral-100 dark:bg-neutral-900 border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.12em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-bold truncate"
                      >
                         <option className="text-black bg-white" value="Todas las Provincias">📍 Provincia (Todas)</option>
                         <option className="text-black bg-white font-semibold" value="San José">Provincia de San José</option>
                         <option className="text-black bg-white font-semibold" value="Alajuela">Provincia de Alajuela</option>
                         <option className="text-black bg-white font-semibold" value="Cartago">Provincia de Cartago</option>
                         <option className="text-black bg-white font-semibold" value="Heredia">Provincia de Heredia</option>
                         <option className="text-black bg-white font-semibold" value="Guanacaste">Provincia de Guanacaste</option>
                         <option className="text-black bg-white font-semibold" value="Puntarenas">Provincia de Puntarenas</option>
                         <option className="text-black bg-white font-semibold" value="Limón">Provincia de Limón</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                         <div className="w-1.5 h-1.5 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-0.5 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                      </div>
                   </div>

                   {/* 2. FILTRO EN CASCADA DE CANTÓN */}
                   <div className="relative w-full group">
                      <MapPin className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                      <select 
                        value={cantonFilter}
                        onChange={(e) => setCantonFilter(e.target.value)}
                        className="w-full pl-11 pr-9 py-3 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.12em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                      >
                         {provinceFilter !== "Todas las Provincias" ? (
                           <>
                             <option className="text-black font-bold bg-white" value={PROVINCE_DATA[provinceFilter]?.defaultCanton}>
                               🏙️ Todos en {provinceFilter}
                             </option>
                             {PROVINCE_DATA[provinceFilter]?.cantons.map((c, idx) => (
                               <option key={idx} className="text-black bg-white" value={c}>{c}</option>
                             ))}
                           </>
                         ) : (
                           <>
                             <option className="text-black bg-white font-bold" value="Cualquier Cantón">🏙️ Cantón (Todas Prov.)</option>
                             {Object.entries(PROVINCE_DATA).map(([provName, data]) => (
                               <optgroup key={provName} label={`📍 PROV. DE ${provName.toUpperCase()}`} className="text-black font-bold bg-neutral-100">
                                 {data.cantons.map((c, idx) => (
                                   <option key={`${provName}-${idx}`} className="text-black bg-white" value={c}>{c}</option>
                                 ))}
                               </optgroup>
                             ))}
                           </>
                         )}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                         <div className="w-1.5 h-1.5 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-0.5 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                      </div>
                   </div>
                 </>
               )}

               {/* 3. FILTRO TIPO DE PROPIEDAD */}
               <div className="relative w-full group">
                  <Home className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-11 pr-9 py-3 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.12em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                  >
                     <option className="text-black bg-white" value="Tipo de Propiedad">Cualquier Tipo</option>
                     <option className="text-black bg-white" value="Casa">Casas de Lujo</option>
                     <option className="text-black bg-white" value="Apartamento">Apartamentos</option>
                     <option className="text-black bg-white" value="Lote">Lotes & Terrenos</option>
                     <option className="text-black bg-white" value="Edificio">Edificios</option>
                     <option className="text-black bg-white" value="Finca">Fincas & Haciendas</option>
                     <option className="text-black bg-white" value="Local Comercial">Locales Comerciales</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-1.5 h-1.5 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-0.5 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                  </div>
               </div>

               {/* 4. FILTRO DE PRESUPUESTO */}
               <div className="relative w-full group">
                  <DollarSign className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full pl-11 pr-9 py-3 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.12em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                  >
                     <option className="text-black bg-white" value="Cualquier Precio">Presupuesto (₡ / $)</option>
                     <option className="text-black bg-white" value="< $500k">Menos de $500k (₡260M)</option>
                     <option className="text-black bg-white" value="$500k - $1M">$500k - $1M</option>
                     <option className="text-black bg-white" value="$1M - $3M">$1M - $3M</option>
                     <option className="text-black bg-white" value="+ $3M">Más de $3M (₡1.5B+)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-1.5 h-1.5 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-0.5 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
                  </div>
               </div>

               {/* 5. FILTRO DE OPERACIÓN */}
               <div className={`relative w-full group ${!initialCanton ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                  <Tag className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-hover:text-black dark:text-white transition-colors duration-500" />
                  <select 
                    value={statusType}
                    onChange={(e) => setStatusType(e.target.value)}
                    className="w-full pl-11 pr-9 py-3 bg-transparent border border-black/15 dark:border-white/20 rounded-full text-[11px] uppercase tracking-[0.12em] outline-none appearance-none cursor-pointer hover:border-black dark:hover:border-white transition-all duration-500 text-black dark:text-white font-semibold truncate"
                  >
                     <option className="text-black bg-white" value="Operación">Venta o Alquiler</option>
                     <option className="text-black bg-white" value="Venta">En Venta Exclusiva</option>
                     <option className="text-black bg-white" value="Alquiler">En Alquiler de Lujo</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <div className="w-1.5 h-1.5 border-b border-r border-black/40 dark:border-white/40 rotate-45 transform -translate-y-0.5 group-hover:border-black dark:group-hover:border-white transition-colors duration-500"></div>
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
