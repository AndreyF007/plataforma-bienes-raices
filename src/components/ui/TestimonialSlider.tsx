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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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
    <div className="relative w-full max-w-[1000px] mx-auto px-4 md:px-16 flex flex-col items-center">
      
      {/* Sleek Side Arrows (Hidden on mobile, absolute positioning) */}
      <button 
        onClick={prev} 
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 border border-black/20 rounded-full items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
      </button>
      
      <button 
        onClick={next} 
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 border border-black/20 rounded-full items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5 stroke-[1.5]" />
      </button>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center text-center min-h-[400px] justify-center px-4">
        
        {/* Luxury Quote Mark */}
        <div className="text-[120px] leading-none font-serif text-black/10 select-none mb-[-40px]">
          "
        </div>

        {/* The Testimonial Text */}
        <p className="text-[20px] md:text-[28px] lg:text-[32px] text-black leading-relaxed font-light font-[family-name:var(--font-raleway)] mb-12 italic max-w-[800px]">
          {displayData[currentIndex].content}
        </p>

        {/* Stars */}
        <div className="flex gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < displayData[currentIndex].rating ? "fill-black text-black" : "text-black/10"}`} />
          ))}
        </div>

        {/* Client Info */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-[1px] bg-black/20 mb-6"></div>
          <h3 className="text-[14px] md:text-[16px] font-[family-name:var(--font-raleway)] font-semibold uppercase tracking-[0.25em] mb-2 text-black">
            {displayData[currentIndex].clientName}
          </h3>
          <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-black/40">
            {displayData[currentIndex].role}
          </p>
        </div>

      </div>

      {/* Mobile Arrows (Visible only on small screens) */}
      <div className="flex md:hidden gap-4 mt-8">
        <button onClick={prev} className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
        <button onClick={next} className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      <div className="mt-16">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-4 border border-black text-[11px] uppercase tracking-[0.2em] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
        >
          COMPARTIR EXPERIENCIA
        </button>
      </div>

      <TestimonialSubmitModal 
        tenantName={tenantName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
