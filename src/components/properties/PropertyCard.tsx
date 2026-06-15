"use client";

import { useState } from 'react';
import { Bed, Bath, Maximize, MapPin, ChevronLeft, ChevronRight, X, Calendar, Layers, ChevronDown } from 'lucide-react';

export interface PropertyData {
  id: string | number;
  title: string;
  price: number; 
  priceStr: string; 
  type: string;
  address: string;
  beds: number;
  baths: number;
  constructionArea: number;
  lotArea: number;
  yearBuilt: number | null;
  floors: number;
  img: string; 
  images?: string[]; 
  status: string;
  description?: string;
}

interface PropertyCardProps {
  prop: PropertyData;
}

export default function PropertyCard({ prop }: PropertyCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = prop.images && prop.images.length > 0 ? prop.images : [prop.img];

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group flex flex-col bg-white dark:bg-neutral-950 hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-pointer h-full border border-black/5"
      >
        {/* CARRUSEL DE IMÁGENES (Premium Aspect) */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-black">
          <img 
              src={images[currentImg] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"} 
              alt={prop.title} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />
          
          <div className="absolute top-6 left-6 z-10 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm text-black dark:text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 font-bold">
                {prop.status}
            </span>
            <span className="bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 font-medium border border-white/20">
                {prop.type}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10">
            <h3 className="text-[28px] font-[family-name:var(--font-raleway)] font-light text-white mb-1 leading-tight drop-shadow-lg">
                {prop.priceStr}
            </h3>
            <p className="text-[14px] uppercase tracking-[0.1em] text-white/90 font-medium line-clamp-1 mb-2 drop-shadow-md">
                {prop.title}
            </p>
            <div className="flex items-center gap-2 text-[12px] text-white/70 tracking-widest font-[family-name:var(--font-quicksand)] uppercase">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">{prop.address}</span>
            </div>
          </div>

          {/* Controles del Carrusel */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button 
                onClick={prevImg}
                className="bg-black/40 backdrop-blur-md hover:bg-white dark:bg-neutral-950 text-white hover:text-black dark:text-white p-2 rounded-full border border-white/20 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImg}
                className="bg-black/40 backdrop-blur-md hover:bg-white dark:bg-neutral-950 text-white hover:text-black dark:text-white p-2 rounded-full border border-white/20 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
        {/* Detalles Rápidos Premium */}
        <div className="flex flex-col p-6 bg-white dark:bg-neutral-950 flex-grow">
          <div className="flex justify-between items-center w-full pb-4 border-b border-black/10">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[16px] font-light font-[family-name:var(--font-raleway)] text-black dark:text-white">{prop.beds}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">Camas</span>
              </div>
              <div className="w-[1px] h-6 bg-black/10"></div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[16px] font-light font-[family-name:var(--font-raleway)] text-black dark:text-white">{prop.baths}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">Baños</span>
              </div>
              <div className="w-[1px] h-6 bg-black/10"></div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[16px] font-light font-[family-name:var(--font-raleway)] text-black dark:text-white">{prop.constructionArea}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">m² Const</span>
              </div>
          </div>
          
          <p className="text-[13px] text-black/50 dark:text-white/50 line-clamp-3 mt-4 mb-6 font-[family-name:var(--font-quicksand)] leading-loose break-words whitespace-pre-wrap">
             {prop.description || "Descubre los detalles de esta exclusiva propiedad."}
          </p>

          <div className="mt-auto flex items-center justify-between group/btn">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-black dark:text-white border-b border-transparent group-hover/btn:border-black dark:border-white/20 transition-colors pb-1">
              Ver Detalles
            </span>
            <span className="w-8 h-px bg-black group-hover/btn:w-16 transition-all duration-500"></span>
          </div>
        </div>
      </div>

      {/* MODAL LUXURY QUICK VIEW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 animate-in fade-in zoom-in-[0.98] duration-500">
          {/* Backdrop con Blur Extremo */}
          <div 
            className="absolute inset-0 bg-white/90 backdrop-blur-xl z-0 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Contenedor del Modal */}
          <div className="relative z-10 w-full h-full md:h-auto md:max-h-[90vh] max-w-6xl bg-white dark:bg-neutral-950 shadow-2xl border border-black/5 flex flex-col md:flex-row overflow-hidden">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-50 bg-black text-white hover:bg-black/70 p-3 rounded-full transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lado Izquierdo: Galería Premium */}
            <div className="w-full md:w-[55%] h-[50vh] md:h-full relative bg-[#0a0a0a] group/modal flex flex-col">
              <div className="flex-1 relative overflow-hidden">
                <img 
                  src={images[currentImg] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"} 
                  alt={prop.title} 
                  className="w-full h-full object-contain transition-opacity duration-700 p-4" 
                />
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <button onClick={prevImg} className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white dark:bg-neutral-950 text-white hover:text-black dark:text-white p-4 rounded-full border border-white/20 transition-colors">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextImg} className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white dark:bg-neutral-950 text-white hover:text-black dark:text-white p-4 rounded-full border border-white/20 transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Miniaturas Premium */}
              {images.length > 1 && (
                <div className="h-24 bg-black/50 backdrop-blur-lg flex gap-3 items-center px-6 overflow-x-auto border-t border-white/10 no-scrollbar">
                  {images.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentImg(idx)}
                      className={`h-16 w-24 flex-shrink-0 transition-all duration-300 overflow-hidden ${idx === currentImg ? 'border-b-2 border-white opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
                    >
                      <img src={img || undefined} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lado Derecho: Detalles Completos */}
            <div className="w-full md:w-[45%] bg-white dark:bg-neutral-950 p-8 md:p-12 overflow-y-auto flex flex-col custom-scrollbar">
              <div className="text-[10px] uppercase tracking-[0.3em] font-semibold text-black/40 dark:text-white/40 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
                {prop.status} <span className="text-black/20 dark:text-white/20">|</span> {prop.type}
              </div>
              
              <h2 className="text-[36px] md:text-[42px] font-[family-name:var(--font-raleway)] font-light text-black dark:text-white mb-2 leading-[1.1] uppercase tracking-wide">
                {prop.title}
              </h2>
              <p className="text-[20px] font-[family-name:var(--font-quicksand)] text-black/60 dark:text-white/60 mb-10 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {prop.address}
              </p>
              
              <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-8 mb-10 text-center">
                <p className="text-[32px] font-medium font-[family-name:var(--font-raleway)] text-black dark:text-white">{prop.priceStr}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Precio de Venta</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-4 mb-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <Bed className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{prop.beds}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Camas</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Bath className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{prop.baths}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Baños</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Layers className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{prop.floors}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Pisos</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Maximize className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{prop.constructionArea}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Const. (m²)</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Maximize className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{prop.lotArea}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Lote (m²)</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Calendar className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{prop.yearBuilt || '-'}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Año</span>
                </div>
              </div>

              <div className="w-8 h-px bg-black/20 dark:bg-white/20 mb-8"></div>
              
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-6 text-black dark:text-white">Acerca de la Propiedad</h4>
              <div className="text-[14px] text-black/70 dark:text-white/70 font-[family-name:var(--font-quicksand)] leading-loose mb-12 whitespace-pre-wrap break-words">
                {prop.description || "Póngase en contacto con nosotros para obtener más información exclusiva sobre esta propiedad de lujo."}
              </div>

              <div className="mt-auto pt-8 border-t border-black/5">
                <a 
                  href={`https://wa.me/50660413905?text=Hola,%20estoy%20interesado%20en%20la%20propiedad:%20${encodeURIComponent(prop.title)}%20(${prop.priceStr})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-5 bg-black text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black/80 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Contactar Asesor Exclusive
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
