'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    // Optimización para alta definición. Si es Unsplash, pedimos la máxima resolución.
    if (url && url.includes('images.unsplash.com')) {
      url = url.replace(/w=\d+/, 'w=2400').replace(/q=\d+/, 'q=95');
    }
    setOptimizedSrc(url || '/images/hero-bg.png');
  }, [bannerImage]);

  return (
    <section className="group relative w-full h-[55vh] min-h-[420px] flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
      
      {/* 1. AMBIENT BLURRED BACKGROUND (Fills the screen, blurred so low-res doesn't matter) */}
      <div className="absolute inset-0 z-0 bg-neutral-950 pointer-events-none">
        <Image
          src={optimizedSrc}
          alt="Ambient Background"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 blur-[40px] opacity-40 mix-blend-lighten"
        />
      </div>

      {/* 2. SHARP FOREGROUND IMAGE (Contained so it never aggressively stretches/blurs) */}
      {!hasError && (
        <div className="absolute inset-0 z-10 flex justify-center items-center">
          <Image
            src={optimizedSrc}
            alt={`Vista panorámica de ${cantonName}`}
            fill
            priority
            quality={100}
            sizes="100vw"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              if (optimizedSrc !== '/images/hero-bg.png') {
                setOptimizedSrc('/images/hero-bg.png');
              } else {
                setHasError(true);
              }
            }}
            // object-contain evita que la imagen se estire más allá de sus límites, manteniéndola ultra nítida.
            className={`object-contain z-10 transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6)) contrast(1.02) saturate(1.05)',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          />
        </div>
      )}

      {/* 3. CAPA DE GRADIENTE EXECUTIVE PARA LEGIBILIDAD IMPERIAL DEL TEXTO */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 z-20 pointer-events-none" />

      {/* 4. TÍTULO DEL CANTÓN CON ANIMACIÓN ENTRADA */}
      <div className="relative z-30 flex flex-col items-center px-6 mt-12 text-center animate-fade-in">
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
