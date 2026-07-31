'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import TestimonialSubmitModal from './../public/TestimonialSubmitModal';

interface Testimonial {
  clientName: string;
  role: string;
  content: string;
  rating: number;
}

export default function TestimonialSlider({ tenantName }: { tenantName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const backgrounds = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80", // Nevado (Montañas)
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2000&q=80", // Bosque con niebla
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80", // Río / Cascada
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80", // Valle verde
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80"  // Montañas majestuosas
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`/api/testimonials?tenantName=${tenantName}`);
        if (res.ok) {
          const data = await res.json();
          if (data.testimonials && data.testimonials.length > 0) {
            setTestimonials(data.testimonials);
          }
        }
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    if (tenantName) fetchTestimonials();
  }, [tenantName]);

  // Fallback data if DB is empty
  const displayData = testimonials.length > 0 ? testimonials : [
    {
      clientName: "ROBERT Y EMILY",
      role: "Compradores",
      content: "Elena nos fue recomendada por otro agente inmobiliario y superó con creces todas nuestras expectativas. Fue muy organizada, constante al enviarnos propiedades increíbles en Costa Rica que se ajustaban a nuestros deseos.",
      rating: 5
    },
    {
      clientName: "DAVID",
      role: "Comprador e Inversionista",
      content: "Pasamos meses buscando la propiedad ideal en Guanacaste y San José, con excelente alta valorización y seguridad. Estamos encantados con nuestra nueva propiedad y agradecemos infinitamente su experiencia.",
      rating: 5
    },
    {
      clientName: "MARÍA Y CARLOS",
      role: "Vendedores",
      content: "Su profesionalismo y estrategia de mercadeo posicionaron nuestra casa en el mercado de forma excepcional. El proceso fue rápido, transparente y el cierre superó el valor esperado.",
      rating: 5
    }
  ];

  // Carrusel dinámico: Rota automáticamente de testimonio y de fondo cada 5 segundos
  useEffect(() => {
    if (isPaused || displayData.length <= 1) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
      setCurrentIndex((prev) => (prev === displayData.length - 1 ? 0 : prev + 1));
    }, 5000); // Rota cada 5 segundos
    return () => clearInterval(interval);
  }, [backgrounds.length, displayData.length, isPaused]);

  const next = () => {
    setCurrentIndex((prev) => (prev === displayData.length - 1 ? 0 : prev + 1));
    setBgIndex((prev) => (prev + 1) % backgrounds.length);
  };
  
  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayData.length - 1 : prev - 1));
    setBgIndex((prev) => (prev === 0 ? backgrounds.length - 1 : prev - 1));
  };

  const currentTestimonial = displayData[currentIndex] || displayData[0];

  return (
    <section 
      id="testimonios" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center min-h-[750px] py-[100px]"
    >
      {/* Dynamic Backgrounds */}
      {backgrounds.map((bg, idx) => (
        <div 
          key={bg}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === bgIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      
      {/* Dark Overlay for luxury contrast and readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full max-w-[1050px] mx-auto px-4 md:px-16 flex flex-col items-center">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[14px] md:text-[16px] font-[family-name:var(--font-raleway)] font-bold tracking-[0.25em] text-amber-500 uppercase mb-2">
            TESTIMONIOS EN VIVO
          </p>
          <h2 className="text-[24px] md:text-[34px] font-[family-name:var(--font-raleway)] font-light tracking-[0.15em] text-white uppercase text-center drop-shadow-md">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Sleek Side Arrows (Hidden on mobile, absolute positioning) */}
        <button 
          onClick={prev} 
          aria-label="Testimonio anterior"
          className="hidden md:flex absolute left-0 top-[55%] -translate-y-1/2 w-14 h-14 border border-white/20 rounded-full items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300 text-white shadow-lg hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </button>
        
        <button 
          onClick={next} 
          aria-label="Siguiente testimonio"
          className="hidden md:flex absolute right-0 top-[55%] -translate-y-1/2 w-14 h-14 border border-white/20 rounded-full items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300 text-white shadow-lg hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 stroke-[1.5]" />
        </button>

        {/* Main Content */}
        <div className="w-full flex flex-col items-center text-center px-4 transition-all duration-500 ease-in-out">
          
          {/* Luxury Quote Mark */}
          <div className="text-[100px] leading-none font-serif text-amber-500 select-none mb-[-30px] opacity-80">
            “
          </div>

          {/* The Testimonial Text */}
          <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-relaxed font-light font-[family-name:var(--font-raleway)] mb-10 italic max-w-[850px] drop-shadow">
            {currentTestimonial.content}
          </p>
          <div className="text-[50px] leading-none font-serif text-amber-500 select-none mt-[-20px] mb-8 opacity-80">
            ”
          </div>

          {/* Stars */}
          <div className="flex gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < currentTestimonial.rating ? "fill-amber-400 text-amber-400 drop-shadow" : "text-white/30"}`} />
            ))}
          </div>

          {/* Client Info */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-[1px] bg-amber-500/80 mb-4"></div>
            <h3 className="text-[16px] md:text-[18px] font-[family-name:var(--font-raleway)] font-bold uppercase tracking-[0.25em] mb-1 text-white drop-shadow-sm">
              {currentTestimonial.clientName}
            </h3>
            <p className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/80 font-medium">
              {currentTestimonial.role}
            </p>
          </div>

          {/* Indicadores Dinámicos (Puntos interactivos de navegación) */}
          {displayData.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              {displayData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(i);
                    setBgIndex(i % backgrounds.length);
                  }}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={`transition-all duration-500 rounded-full ${
                    i === currentIndex
                      ? 'w-10 h-2.5 bg-amber-500 shadow-md scale-105'
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          )}

        </div>

        {/* Mobile Arrows (Visible only on small screens) */}
        <div className="flex md:hidden gap-6 mt-10 text-white">
          <button onClick={prev} aria-label="Testimonio anterior" className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300">
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button onClick={next} aria-label="Siguiente testimonio" className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300">
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        <div className="mt-14">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 bg-amber-500 text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-amber-400 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            ✨ Compartir Mi Experiencia
          </button>
        </div>

      </div>

      <TestimonialSubmitModal 
        tenantName={tenantName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
