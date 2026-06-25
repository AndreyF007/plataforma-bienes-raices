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

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000); // Change background every 6 seconds
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Fallback data if DB is empty
  const displayData = testimonials.length > 0 ? testimonials : [
    {
      clientName: "ROBERT Y EMILY",
      role: "Comprador",
      content: "Elena nos fue recomendada por otro agente inmobiliario y superó con creces todas nuestras expectativas. Fue muy organizada, constante al enviarnos casas que se ajustaban a nuestros deseos, cuenta con un excelente equipo y nos ayudó a tomar una decisión convincente.",
      rating: 5
    },
    {
      clientName: "DAVID",
      role: "Comprador",
      content: "Elena pasó un año con nosotros mientras buscábamos la casa ideal en el barrio perfecto, con las escuelas adecuadas. Estamos encantados con nuestra nueva casa en Los Altos y le agradecemos a Elena su experiencia (y su paciencia).",
      rating: 5
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev === displayData.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? displayData.length - 1 : prev - 1));

  return (
    <section id="testimonios" className="relative w-full overflow-hidden flex flex-col items-center justify-center min-h-[800px] py-[100px]">
      
      {/* Dynamic Backgrounds */}
      {backgrounds.map((bg, idx) => (
        <div 
          key={bg}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === bgIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-4 md:px-16 flex flex-col items-center">
        
        {/* Section Title */}
        <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] font-light tracking-[0.25em] text-white uppercase mb-16 text-center">
          LO QUE DICEN NUESTROS CLIENTES
        </p>

        {/* Sleek Side Arrows (Hidden on mobile, absolute positioning) */}
        <button 
          onClick={prev} 
          aria-label="Testimonio anterior"
          className="hidden md:flex absolute left-0 top-[60%] -translate-y-1/2 w-12 h-12 border border-white/30 rounded-full items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300 text-white"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
        
        <button 
          onClick={next} 
          aria-label="Siguiente testimonio"
          className="hidden md:flex absolute right-0 top-[60%] -translate-y-1/2 w-12 h-12 border border-white/30 rounded-full items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300 text-white"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Main Content */}
        <div className="w-full flex flex-col items-center text-center px-4 transition-all duration-500 ease-in-out">
          
          {/* Luxury Quote Mark */}
          <div className="text-[120px] leading-none font-serif text-white select-none mb-[-40px]">
            "
          </div>

          {/* The Testimonial Text */}
          <p className="text-[20px] md:text-[28px] lg:text-[32px] text-white leading-relaxed font-light font-[family-name:var(--font-raleway)] mb-12 italic max-w-[800px]">
            {displayData[currentIndex].content}
          </p>

          {/* Stars */}
          <div className="flex gap-1.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < displayData[currentIndex].rating ? "fill-white text-white" : "text-white"}`} />
            ))}
          </div>

          {/* Client Info */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-[1px] bg-white/30 mb-6"></div>
            <h3 className="text-[14px] md:text-[16px] font-[family-name:var(--font-raleway)] font-semibold uppercase tracking-[0.25em] mb-2 text-white">
              {displayData[currentIndex].clientName}
            </h3>
            <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-white">
              {displayData[currentIndex].role}
            </p>
          </div>

        </div>

        {/* Mobile Arrows (Visible only on small screens) */}
        <div className="flex md:hidden gap-4 mt-12 text-white">
          <button onClick={prev} aria-label="Testimonio anterior" className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300">
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button onClick={next} aria-label="Siguiente testimonio" className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-all duration-300">
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        <div className="mt-16">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 border border-white text-[11px] uppercase tracking-[0.2em] font-medium text-white hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-colors duration-300"
          >
            COMPARTIR EXPERIENCIA
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
