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
    <section className="relative w-full flex flex-col md:flex-row bg-[#050505] min-h-[500px] overflow-hidden">
      
      {/* LEFT SIDE: TEXT (Editorial Layout) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 py-16 md:py-24 z-20">
        <div className="animate-fade-in w-full">
          <span className="inline-block text-[10px] sm:text-[12px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.4em] text-amber-500/90 font-semibold mb-4 drop-shadow">
            Comunidad & Estilo de Vida
          </span>
          <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] font-[family-name:var(--font-raleway)] font-extralight text-white tracking-[0.1em] uppercase leading-[1.1] mb-6">
            {cantonName}
          </h1>
          <div className="w-20 h-[2px] bg-amber-500/80 mb-6"></div>
          <p className="text-neutral-400 font-[family-name:var(--font-quicksand)] text-sm md:text-base max-w-md leading-relaxed">
            Descubra las propiedades más exclusivas y el estilo de vida premium que ofrece esta zona.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: IMAGE */}
      <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full flex-grow">
        {/* The image itself */}
        {!hasError && (
          <Image
            src={optimizedSrc}
            alt={`Vista panorámica de ${cantonName}`}
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              if (optimizedSrc !== '/images/hero-bg.png') {
                setOptimizedSrc('/images/hero-bg.png');
              } else {
                setHasError(true);
              }
            }}
            className={`object-cover object-center z-0 transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'contrast(1.05) saturate(1.1)',
              transform: 'translateZ(0)'
            }}
          />
        )}
        
        {/* Desktop Edge Gradient Blending */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
        
        {/* Mobile Top Edge Gradient Blending */}
        <div className="md:hidden absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10" />
        
        {/* General Vignette for luxury feel */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
      </div>

    </section>
  );
}
