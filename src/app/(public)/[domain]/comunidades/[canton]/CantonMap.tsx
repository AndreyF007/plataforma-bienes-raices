'use client';

import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface CantonMapProps {
  mapUrl: string;
  cantonName: string;
}

export default function CantonMap({ mapUrl, cantonName }: CantonMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="w-full h-[450px] sm:h-[500px] relative overflow-hidden bg-neutral-950 border-t border-b border-black/10 dark:border-white/10">
      
      {/* 1. SKELETON EJECUTIVO INMEDIATO (Elimina al instante el recuadro gris en iPhones y celulares mientras Google Maps descarga) */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950 text-white z-10 transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-amber-500/20 animate-ping"></div>
          <div className="relative p-4 bg-black/80 rounded-full border border-amber-500/40 shadow-xl">
            <MapPin className="w-8 h-8 text-amber-500 animate-bounce" />
          </div>
        </div>
        <h3 className="text-xs sm:text-sm uppercase tracking-[0.25em] font-[family-name:var(--font-raleway)] text-amber-400 font-medium mb-2">
          Geolocalización Satélite & Vial
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 font-[family-name:var(--font-quicksand)] font-light max-w-xs text-center px-4">
          Conectando con servidores cartográficos para <strong className="text-white font-medium">{cantonName}</strong>...
        </p>
      </div>

      {/* 2. GOOGLE MAPS IFRAME SIN BLOqueo DE TARJETA GRÁFICA (Sin filtros pesados en móvil) */}
      <iframe 
        src={mapUrl}
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        onLoad={() => setIsLoaded(true)}
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa de ${cantonName}, Costa Rica`}
        className={`w-full h-full border-none transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      ></iframe>

      {/* 3. ETIQUETA FLOTANTE DE UBICACIÓN COMERCIAL PREMIUM */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/85 backdrop-blur-md text-white rounded shadow-lg border border-white/15 text-xs">
        <Navigation className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-semibold tracking-wide">{cantonName}, Costa Rica</span>
        <span className="text-[10px] text-neutral-400 font-light">| Cartografía Interactiva</span>
      </div>
    </section>
  );
}
