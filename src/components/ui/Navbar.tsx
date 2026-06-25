'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import NewsletterModal from '../public/NewsletterModal';
import { ThemeToggle } from '../ThemeToggle';

export default function Navbar({ 
  tenantName, 
  contactPhone = "+506 6041 3905", 
  contactEmail = "info@andresrealty.com"
}: { 
  tenantName: string; 
  contactPhone?: string; 
  contactEmail?: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initials = tenantName.split(' ').length >= 2 
    ? (tenantName.split(' ')[0][0] + tenantName.split(' ')[1][0]).toUpperCase() 
    : tenantName.substring(0, 2).toUpperCase();

  return (
    <>
      <nav className={`fixed top-0 w-full z-[90] transition-all duration-300 ${scrolled ? 'bg-white/50 dark:bg-black/50 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="w-full px-6 md:px-12 h-12 flex justify-between items-center">
          
          {/* LOGO MÓVIL (Oculto en escritorio) */}
          <div className="flex flex-1 lg:hidden">
            <div className="flex flex-col items-center w-fit">
               <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${scrolled ? 'border-black dark:border-white' : 'border-white'}`}>
                 <span className={`text-[10px] font-light ${scrolled ? 'text-black dark:text-white' : 'text-white'}`}>{initials}</span>
               </div>
               <span className={`text-[8px] tracking-[0.2em] uppercase mt-1 ${scrolled ? 'text-black dark:text-white' : 'text-white'}`}>{tenantName}</span>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-[5] justify-center items-center gap-2 xl:gap-4 flex-wrap px-2">
             {[
               { label: 'INICIO', href: '/' },
               { label: 'BOLETÍN', href: '/#newsletter' },
               { label: 'GUÍA DEL VENDEDOR', href: '/vendedor' },
               { label: 'GUÍA DEL COMPRADOR', href: '/comprador' },
               { label: 'ZONAS DE COBERTURA', href: '/comunidades' },
               { label: 'TESTIMONIOS', href: '/#testimonios' },
               { label: `SOBRE ${tenantName.split(' ')[0]}`, href: '/#about' },
               { label: 'BLOG', href: '/blog' }
             ].map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                onClick={(e) => {
                  if (item.label === 'BOLETÍN') {
                    e.preventDefault();
                    setIsNewsletterOpen(true);
                  }
                }}
                className={`whitespace-nowrap text-[10.5px] xl:text-[12px] font-[family-name:var(--font-raleway)] font-semibold tracking-[0.1em] hover:opacity-50 transition-opacity drop-shadow-md ${scrolled ? 'text-black dark:text-white drop-shadow-none' : 'text-white'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-1 justify-end items-center gap-4 lg:gap-6">
            {contactPhone && (
              <a href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className={`whitespace-nowrap text-[11px] font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] hover:opacity-50 transition-opacity ${scrolled ? 'text-black dark:text-white' : 'text-white'}`}>
                {contactPhone}
              </a>
            )}
            <ThemeToggle className={scrolled ? 'text-black dark:text-white' : 'text-white'} />
            <button 
              onClick={() => setIsOpen(true)} 
              aria-label="Abrir menú de navegación"
              className={`p-2 hover:opacity-50 transition-opacity ${scrolled ? 'text-black dark:text-white' : 'text-white'}`}
            >
              <Menu className="w-8 h-8 stroke-1" />
            </button>
          </div>
          
        </div>
      </nav>

      <NewsletterModal 
        tenantName={tenantName} 
        isOpen={isNewsletterOpen} 
        onClose={() => setIsNewsletterOpen(false)} 
      />

      {/* Fullscreen Menu */}
      <div className={`fixed inset-0 z-[100] transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-hidden`}>
        
        {/* Static Costa Rica Flag Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(to bottom, 
              #001489 0%, #001489 16.66%, 
              #FFFFFF 16.66%, #FFFFFF 33.33%, 
              #DA291C 33.33%, #DA291C 66.66%, 
              #FFFFFF 66.66%, #FFFFFF 83.33%, 
              #001489 83.33%, #001489 100%)`
          }} />
        </div>
        
        {/* Dark Glass Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-none" style={{ zIndex: 1 }}></div>

        <div className="relative z-10 w-full px-6 h-20 flex justify-between items-center border-b border-white/20">
           <div className="flex flex-col items-center w-fit">
               <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center shadow-lg">
                 <span className="text-[10px] font-light text-white drop-shadow-md">{initials}</span>
               </div>
               <span className="text-[8px] tracking-[0.2em] uppercase mt-1 text-white drop-shadow-md">{tenantName}</span>
            </div>
          <button onClick={() => setIsOpen(false)} aria-label="Cerrar menú de navegación" className="p-2 text-white drop-shadow-md">
            <X className="w-8 h-8 stroke-1" />
          </button>
        </div>
        
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center text-center">
           {[
             { label: 'INICIO', href: '/' },
             { label: `SOBRE ${tenantName.split(' ')[0]}`, href: '/#about' },
             { label: 'VALORACIÓN DE LA VIVIENDA', href: '/#valoracion' },
             { label: 'ZONAS DE COBERTURA', href: '/comunidades' },
             { label: 'TESTIMONIOS', href: '/#testimonios' },
             { label: 'BLOG', href: '/blog' },
             { label: 'BOLETÍN', href: '/#newsletter' },
             { label: 'HABLEMOS', href: `mailto:${contactEmail || 'info@example.com'}` },
             { label: 'MI PORTAL DE BÚSQUEDA', href: '/portal' }
           ].map((item, idx) => (
             <Link 
                key={idx} 
                href={item.href} 
                onClick={(e) => {
                  if (item.label === 'BOLETÍN' || item.label === 'INICIO') {
                    if (item.label === 'BOLETÍN') {
                      e.preventDefault();
                      setIsNewsletterOpen(true);
                    }
                    setIsOpen(false);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="text-[18px] md:text-[24px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] mb-6 text-white drop-shadow-xl shadow-black hover:opacity-50 hover:scale-105 transition-all duration-300"
             >
               {item.label}
             </Link>
           ))}
        </div>
      </div>
    </>
  );
}
