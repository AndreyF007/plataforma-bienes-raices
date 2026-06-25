"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import PropertyCard, { PropertyData } from "@/components/properties/PropertyCard";
import Link from "next/link";

export default function FeaturedProperties({ properties }: { properties: PropertyData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [properties]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      // Calculate exactly one card width + gap to align perfectly with CSS snap points
      const itemWidth = (scrollRef.current.children[0] as HTMLElement).offsetWidth;
      const gap = 24; // gap-6 is 24px
      const scrollAmount = itemWidth + gap;
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  if (!properties || properties.length === 0) return null;

  return (
    <section className="w-full bg-[#fcfcfc] dark:bg-neutral-900 py-[80px] md:py-[120px] overflow-hidden transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black dark:text-white mb-4">
            Propiedades Destacadas
          </h2>
          <div className="w-12 h-px bg-black dark:bg-white"></div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 group">
        
        {/* Navigation Arrows (Absolute over the image part of the card) */}
        <button 
          onClick={() => scroll('left')} 
          disabled={!canScrollLeft}
          className="absolute left-2 md:-left-4 top-[35%] -translate-y-1/2 z-10 w-14 h-14 hidden md:flex items-center justify-center bg-white dark:bg-neutral-900 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full shadow-2xl hover:scale-110 transition-all disabled:opacity-0 disabled:scale-95"
        >
          <ChevronLeft className="w-6 h-6 ml-[-2px]" />
        </button>

        <button 
          onClick={() => scroll('right')} 
          disabled={!canScrollRight}
          className="absolute right-2 md:-right-4 top-[35%] -translate-y-1/2 z-10 w-14 h-14 hidden md:flex items-center justify-center bg-white dark:bg-neutral-900 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full shadow-2xl hover:scale-110 transition-all disabled:opacity-0 disabled:scale-95"
        >
          <ChevronRight className="w-6 h-6 mr-[-2px]" />
        </button>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:snap-none scroll-smooth hide-scrollbar pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {properties.map((prop) => (
            <div key={prop.id} className="w-[85vw] md:w-[calc((100%-48px)/3)] snap-center shrink-0">
              <PropertyCard prop={prop} />
            </div>
          ))}

          {/* Tarjeta de "Ver Todas" al final del carrusel */}
          <div className="w-[85vw] md:w-[calc((100%-48px)/3)] snap-center shrink-0 flex items-center justify-center p-6">
            <Link 
              href="/portal"
              className="group w-full h-full min-h-[350px] flex flex-col items-center justify-center border-2 border-dashed border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-8 h-8 text-black dark:text-white" />
              </div>
              <h3 className="text-[20px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black dark:text-white mb-2">
                Ver Todo El Portafolio
              </h3>
              <p className="text-[14px] text-black dark:text-white">
                Explora nuestra colección completa de propiedades exclusivas
              </p>
            </Link>
          </div>
        </div>

        {/* Botón explícito inferior para ver todas las propiedades */}
        <div className="flex justify-center mt-12 pr-6 md:pr-0">
          <Link 
            href="/portal"
            className="flex items-center gap-4 bg-transparent border border-black dark:border-white text-black dark:text-white px-8 py-4 text-[12px] font-[family-name:var(--font-raleway)] font-semibold tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-105 transition-all duration-300"
          >
            VER TODAS LAS PROPIEDADES <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
