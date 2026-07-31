'use client';

import { useState, useEffect } from 'react';

interface CantonHeroProps {
  bannerImage: string;
  cantonName: string;
}

export default function CantonHero({ bannerImage, cantonName }: CantonHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(bannerImage);

  useEffect(() => {
    let url = bannerImage;
    // Optimización dramática de velocidad para enlaces de Unsplash (convierte a WebP ligero de alta calidad)
    if (url && url.includes('images.unsplash.com')) {
      // Remover parámetros pesados si existen y reconfigurar a compresión eficiente
      url = url.replace(/w=\d+/, 'w=1200').replace(/q=\d+/, 'q=75') + '&fm=webp';
    }
    setOptimizedSrc(url || '/images/hero-bg.png');
  }, [bannerImage]);

  return (
    <section className="group relative w-full h-[55vh] min-h-[420px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950">
      
      {/* 1. FONDO INMEDIATO DE LUJO (Aparece en 0 milisegundos para que nunca se vea una pantalla negra mientras descarga la foto) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-800/80 via-neutral-900 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-none z-10" />

      {/* 2. IMAGEN CON CARGA PROGRESIVA Y EFECTO FADE-IN */}
      {!hasError && (
        <img
          src={optimizedSrc}
          alt={`Vista panorámica de ${cantonName}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            if (optimizedSrc !== '/images/hero-bg.png') {
              setOptimizedSrc('/images/hero-bg.png');
            } else {
              setHasError(true);
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-1000 transform ${
            isLoaded 
              ? 'opacity-100 scale-100 animate-slow-zoom' 
              : 'opacity-0 scale-105 filter blur-md'
          }`}
        />
      )}

      {/* 3. CAPA DE GRADIENTE EXECUTIVE PARA LEGIBILIDAD IMPERIAL DEL TEXTO */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-10 pointer-events-none" />

      {/* 4. TÍTULO DEL CANTÓN CON ANIMACIÓN ENTRADA */}
      <div className="relative z-20 flex flex-col items-center px-6 mt-12 text-center animate-fade-in">
        <span className="text-[11px] sm:text-[13px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.3em] text-amber-500/90 font-medium mb-3 drop-shadow">
          COMUNIDAD & ESTILO DE VIDA
        </span>
        <h1 className="text-[38px] sm:text-[52px] md:text-[64px] font-[family-name:var(--font-raleway)] font-extralight text-white tracking-[0.15em] uppercase mb-4 leading-tight drop-shadow-lg">
          {cantonName}
        </h1>
        <div className="w-16 h-[1px] bg-amber-500/70 mt-2"></div>
      </div>
    </section>
  );
}
