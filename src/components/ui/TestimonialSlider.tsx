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
    <div className="relative w-full max-w-[800px] mx-auto flex flex-col items-center">
      
      {/* Top Arrows */}
      <div className="flex gap-4 mb-8">
        <button onClick={prev} className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6 stroke-1" />
        </button>
        <button onClick={next} className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
          <ChevronRight className="w-6 h-6 stroke-1" />
        </button>
      </div>

      {/* Content Container */}
      <div className={`w-full p-8 md:p-16 flex flex-col items-center text-center ${currentIndex % 2 !== 0 ? 'bg-[url("https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80")] bg-cover' : 'bg-[#f4f4f4]'}`}>
        
        {/* Avatar Placeholder */}
        <div className="w-[120px] h-[120px] rounded-full bg-black mb-6 flex items-center justify-center border border-white">
          <span className="text-white text-3xl font-[family-name:var(--font-raleway)] font-light">
            {displayData[currentIndex].clientName.substring(0, 2).toUpperCase()}
          </span>
        </div>

        <h3 className="text-[18px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] mb-2 text-black">
          {displayData[currentIndex].clientName}
        </h3>
        <p className="text-[12px] uppercase tracking-widest text-black/50 mb-4">{displayData[currentIndex].role}</p>

        <div className="flex gap-1 text-black mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < displayData[currentIndex].rating ? "fill-current" : "text-black/20"}`} />
          ))}
        </div>

        <p className="text-[16px] text-black leading-[1.8] font-[family-name:var(--font-quicksand)] mb-10 max-w-[500px]">
          "{displayData[currentIndex].content}"
        </p>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-[300px] py-4 border border-black text-[11px] uppercase tracking-[0.2em] font-bold text-black hover:bg-black hover:text-white transition-colors"
        >
          DEJAR UN TESTIMONIO
        </button>

      </div>

      {/* Bottom Arrows */}
      <div className="flex gap-4 mt-8">
        <button onClick={prev} className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6 stroke-1" />
        </button>
        <button onClick={next} className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
          <ChevronRight className="w-6 h-6 stroke-1" />
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
