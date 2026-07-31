'use client';

import { useState, useEffect } from 'react';
import { Star, MapPin, Loader2 } from 'lucide-react';
import { getCantonPois } from '@/data/crPois';

interface InteractivePoiTableProps {
  cantonName: string;
}

export default function InteractivePoiTable({ cantonName }: InteractivePoiTableProps) {
  const [activeTab, setActiveTab] = useState('Todos');
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<Record<string, any[]>>({});

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const tabs = [
    { id: 'Todos', label: 'Todos' },
    { id: 'Restaurantes', label: 'Restaurantes & Gastronomía' },
    { id: 'Compras', label: 'Boutiques & Compras' },
    { id: 'Naturaleza', label: 'Parques & Naturaleza' },
    { id: 'Belleza', label: 'Spa & Bienestar' },
    { id: 'Vida Nocturna', label: 'Bares & Vida Nocturna' }
  ];

  useEffect(() => {
    if (!apiKey) return;
    
    const fetchRealPlaces = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/places?canton=${encodeURIComponent(cantonName)}&type=${encodeURIComponent(activeTab)}`);
        if (res.ok) {
          const data = await res.json();
          setLiveData(prev => ({ ...prev, [activeTab]: data }));
        }
      } catch (err) {
        console.error("Error fetching places", err);
      } finally {
        setLoading(false);
      }
    };

    if (!liveData[activeTab]) {
      fetchRealPlaces();
    }
  }, [activeTab, cantonName, apiKey]);

  let displayData: any[] = [];
  let isLoadedAndEmpty = false;

  if (apiKey && liveData[activeTab] !== undefined) {
    displayData = liveData[activeTab];
    if (displayData.length === 0) {
      isLoadedAndEmpty = true;
    }
  } else {
    // Consulta estricta al motor de datos verificados geográficamente y autenticados con hitos de cada cantón
    displayData = getCantonPois(cantonName, activeTab);
  }

  return (
    <div className="w-full flex flex-col mt-8">
       {/* Pestañas (Pills) */}
       <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
         {tabs.map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-medium tracking-wide transition-all shadow-sm
               ${activeTab === tab.id 
                 ? 'bg-amber-500 text-neutral-950 border-amber-500 font-semibold shadow-md' 
                 : 'bg-transparent text-black dark:text-neutral-300 border-black/20 dark:border-white/20 hover:border-amber-500/60 dark:hover:border-amber-500/60'
               }`}
           >
             {tab.label}
           </button>
         ))}
       </div>

       {/* Lista de Tarjetas POI (Diseño Ejecutivo y Limpio para Móvil y Escritorio) */}
       <div className="flex flex-col relative min-h-[250px] divide-y divide-black/10 dark:divide-white/10 border-t border-b border-black/10 dark:border-white/10">
         {loading && apiKey ? (
            <div className="absolute inset-0 bg-[#fafafa]/80 dark:bg-neutral-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
               <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
         ) : isLoadedAndEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 text-black dark:text-white text-sm">
               <MapPin className="w-8 h-8 mb-3 text-amber-500 opacity-60" />
               <p>No se encontraron lugares específicos en "{tabs.find(t => t.id === activeTab)?.label}" para {cantonName}.</p>
            </div>
         ) : (
           displayData?.map((poi, index) => (
             <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                
                {/* IZQUIERDA: IMAGEN Y DATOS DEL LUGAR */}
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-amber-500/30 shadow-sm flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
                      <img src={poi.img || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=85"} alt={poi.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col">
                      <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5 font-[family-name:var(--font-raleway)]">
                        {poi.name} 
                        <span className="text-[10px] text-amber-500 opacity-80">✦</span>
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] sm:text-[11px] font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-2 py-0.5 rounded uppercase tracking-wider">
                          {poi.type || "Estilo de Vida"}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          {poi.distance || "0.5 km de distancia"}
                        </span>
                      </div>
                      {poi.address && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">{poi.address}</span>
                      )}
                   </div>
                </div>
                
                {/* DERECHA: CALIFICACIÓN ESTRELLA DE ORO (LUXURY GOLD RATING) */}
                <div className="flex items-center sm:justify-end gap-2 pl-16 sm:pl-0">
                   <div className="flex items-center gap-1 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs">
                     <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                     <span className="font-bold text-neutral-900 dark:text-amber-300">{poi.rating || 5.0}</span>
                     <span className="text-neutral-500 dark:text-neutral-400 text-[11px] ml-0.5 font-light">({poi.reviews || 100}+)</span>
                   </div>
                </div>

             </div>
           ))
         )}
       </div>
    </div>
  );
}
