'use client';

import { useState, useEffect } from 'react';
import { Star, MapPin, Loader2 } from 'lucide-react';

interface InteractivePoiTableProps {
  cantonName: string;
}

export default function InteractivePoiTable({ cantonName }: InteractivePoiTableProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<Record<string, any[]>>({});

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const tabs = [
    { id: 'All', label: 'Todos' },
    { id: 'Restaurantes', label: 'Restaurantes' },
    { id: 'Compras', label: 'Compras' },
    { id: 'Activo', label: 'Activo' },
    { id: 'Belleza', label: 'Belleza' },
    { id: 'Vida Nocturna', label: 'Vida Nocturna' }
  ];

  const poiData: Record<string, any[]> = {
    'Todos': [
      { name: "La Casona", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80", type: "Restaurante", distance: "0.2 km", rating: 5, reviews: 120 },
      { name: "Plaza Central", img: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=150&q=80", type: "Compras", distance: "0.5 km", rating: 4, reviews: 85 }
    ],
    'Restaurantes': [
      { name: "El Sabor Local", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80", type: "Comida Típica", distance: "0.2 km", rating: 5, reviews: 120 },
      { name: "Café de la Montaña", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=150&q=80", type: "Cafetería • Postres", distance: "0.5 km", rating: 4, reviews: 85 },
      { name: "Bistro 506", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=150&q=80", type: "Fusión • Cena", distance: "1.2 km", rating: 5, reviews: 340 }
    ],
    'Compras': [
      { name: "Boutique Elegance", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=150&q=80", type: "Ropa", distance: "0.3 km", rating: 5, reviews: 45 },
      { name: "Mercado Artesanal", img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=150&q=80", type: "Artesanías", distance: "0.8 km", rating: 4, reviews: 210 }
    ],
    'Activo': [
      { name: "Fitness Center", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80", type: "Gimnasio", distance: "1.0 km", rating: 5, reviews: 90 },
      { name: "Parque Central", img: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=150&q=80", type: "Parque", distance: "0.1 km", rating: 4, reviews: 500 }
    ],
    'Belleza': [
      { name: "Spa Relax", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=150&q=80", type: "Spa • Masajes", distance: "0.4 km", rating: 5, reviews: 150 },
      { name: "Salón Beauty", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=150&q=80", type: "Peluquería", distance: "0.6 km", rating: 4, reviews: 75 }
    ],
    'Vida Nocturna': [
      { name: "La Taberna", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=150&q=80", type: "Bar • Música en Vivo", distance: "0.3 km", rating: 4, reviews: 150 },
      { name: "Rooftop 360", img: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=150&q=80", type: "Bar • Vista", distance: "0.9 km", rating: 5, reviews: 200 }
    ]
  };

  // Efecto para buscar datos reales si la API Key existe
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

    // Solo buscar si no lo tenemos en caché
    if (!liveData[activeTab]) {
      fetchRealPlaces();
    }
  }, [activeTab, cantonName, apiKey]);

  // Si hay datos en vivo los mostramos, sino (o si hay error/no hay api key) mostramos el fallback
  // Lógica estricta de visualización:
  // Si hay API Key, usamos exclusivamente liveData (incluso si está vacío).
  // Solo usamos poiData (genérico) si NO hay API Key (Modo Demo).
  let displayData: any[] = [];
  let isLoadedAndEmpty = false;

  if (apiKey) {
    if (liveData[activeTab] !== undefined) {
      displayData = liveData[activeTab];
      if (displayData.length === 0) {
        isLoadedAndEmpty = true;
      }
    }
  } else {
    displayData = poiData[activeTab] || [];
  }

  return (
    <div className="w-full flex flex-col mt-8">
       {/* Pestañas (Pills) */}
       <div className="flex flex-wrap gap-2 mb-12">
         {tabs.map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`px-6 py-2 rounded-full border border-black/20 text-[13px] transition-all
               ${activeTab === tab.id 
                 ? 'bg-black text-white border-black dark:border-white/20' 
                 : 'bg-transparent text-black dark:text-white hover:bg-black/5'
               }`}
           >
             {tab.label}
           </button>
         ))}
       </div>

       {/* Table Header */}
       <div className="hidden md:grid grid-cols-[2.5fr_1.2fr_1fr_1fr_1.5fr] gap-4 pb-4 border-b border-black/10 text-[11px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.15em] text-black/60 dark:text-white/60 font-semibold">
          <div>NAME</div>
          <div>CATEGORY</div>
          <div>DISTANCE</div>
          <div>REVIEWS</div>
          <div className="flex items-center gap-1">RATINGS BY <span className="text-red-600 font-bold lowercase italic text-[12px] tracking-normal">yelp</span><span className="text-red-600 font-bold">*</span></div>
       </div>

       {/* Lista de Tarjetas POI (Tabla) */}
       <div className="flex flex-col relative min-h-[300px]">
         {loading && apiKey ? (
            <div className="absolute inset-0 bg-[#fafafa]/80 backdrop-blur-sm z-10 flex items-center justify-center">
               <Loader2 className="w-8 h-8 animate-spin text-black dark:text-white" />
            </div>
         ) : isLoadedAndEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 text-black/50 dark:text-white/50 text-[14px]">
               <MapPin className="w-8 h-8 mb-3 opacity-30" />
               <p>No se encontraron lugares en la categoría "{tabs.find(t => t.id === activeTab)?.label}" para {cantonName}.</p>
            </div>
         ) : (
           displayData?.map((poi, index) => (
             <div key={index} className="grid grid-cols-1 md:grid-cols-[2.5fr_1.2fr_1fr_1fr_1.5fr] gap-4 py-6 border-b border-black/10 items-center">
                {/* NAME */}
                <div className="flex items-center gap-4">
                   <div className="w-[45px] h-[45px] rounded-full overflow-hidden border border-black/10 flex-shrink-0">
                      <img src={poi.img} alt={poi.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col">
                      <h4 className="text-[14px] font-medium text-black dark:text-white flex items-center gap-1">
                        {poi.name} <span className="text-[10px]">↗</span>
                      </h4>
                      {poi.address && (
                        <span className="text-[12px] text-black/60 dark:text-white/60 mt-0.5 line-clamp-1">{poi.address}</span>
                      )}
                   </div>
                </div>
                
                {/* CATEGORY */}
                <div className="hidden md:flex items-center">
                   <span className="text-[10px] bg-[#f0f0f0] px-2 py-1 text-black/70 rounded-[2px] uppercase font-semibold tracking-wider">
                      {poi.type}
                   </span>
                </div>

                {/* DISTANCE */}
                <div className="hidden md:flex items-center text-[12px] text-black/70 font-medium">
                   {poi.distance}
                </div>

                {/* REVIEWS */}
                <div className="hidden md:flex items-center text-[12px] text-black/70 font-medium">
                   {poi.reviews} reviews
                </div>

                {/* RATINGS */}
                <div className="flex items-center justify-between md:justify-start gap-3 mt-4 md:mt-0">
                   <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`w-[16px] h-[16px] rounded-[3px] flex items-center justify-center ${i < Math.floor(poi.rating || 5) ? 'bg-[#d32323]' : 'bg-[#e5e5e5]'}`}>
                           <Star className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      ))}
                   </div>
                   <span className="text-[12px] text-black/70 font-medium">{poi.rating || 5}/5</span>
                </div>
             </div>
           ))
         )}
         
         {!apiKey && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 text-[11px] text-yellow-800 rounded-md">
               <strong>Modo Demo:</strong> Mostrando lugares sugeridos genéricos. Activa la API Key para ver datos reales.
            </div>
         )}
       </div>
    </div>
  );
}
