'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import NewsletterModal from '../public/NewsletterModal';

export default function Navbar({ tenantName }: { tenantName: string }) {
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

  return (
    <>
      <nav className={`fixed top-0 w-full z-[90] transition-colors duration-300 ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
        <div className="w-full px-6 md:px-12 h-24 flex justify-between items-center">
          
          {/* LOGO MÓVIL (Oculto en escritorio) */}
          <div className="flex flex-1 lg:hidden">
            <div className="flex flex-col items-center w-fit">
               <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${scrolled ? 'border-black' : 'border-white'}`}>
                 <span className={`text-[10px] font-light ${scrolled ? 'text-black' : 'text-white'}`}>EL</span>
               </div>
               <span className={`text-[8px] tracking-[0.2em] uppercase mt-1 ${scrolled ? 'text-black' : 'text-white'}`}>{tenantName}</span>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-[5] justify-center items-center gap-2 xl:gap-4 flex-wrap px-2">
             {[
               { label: 'BOLETÍN', href: '/#newsletter' },
               { label: 'GUÍA DEL VENDEDOR', href: '/vendedor' },
               { label: 'GUÍA DEL COMPRADOR', href: '/comprador' },
               { label: 'CARTERA', href: '/#testimonios' },
               { label: 'BARRIOS', href: '/comunidades' },
               { label: 'VÍDEOS DE ESTILO DE VIDA', href: '/videos' },
               { label: 'TESTIMONIOS', href: '/#testimonios' },
               { label: 'EN LA PRENSA', href: '/prensa' },
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
                className={`whitespace-nowrap text-[8.5px] xl:text-[9.5px] font-[family-name:var(--font-raleway)] font-medium tracking-[0.1em] hover:opacity-50 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-1 justify-end items-center gap-6">
            <a href="https://wa.me/50660413905" target="_blank" rel="noopener noreferrer" className={`hidden lg:block text-[11px] font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] hover:opacity-50 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}>
              +506 6041 3905
            </a>
            <button 
              onClick={() => setIsOpen(true)} 
              className={`p-2 hover:opacity-50 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}
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
      <div className={`fixed inset-0 bg-white z-[100] transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-full px-6 h-20 flex justify-between items-center border-b border-black/10">
           <div className="flex flex-col items-center w-fit">
               <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                 <span className="text-[10px] font-light text-black">EL</span>
               </div>
               <span className="text-[8px] tracking-[0.2em] uppercase mt-1 text-black">{tenantName}</span>
            </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-black">
            <X className="w-8 h-8 stroke-1" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center text-center">
           {[
             { label: 'HOGAR', href: '/#hero' },
             { label: `SOBRE ${tenantName.split(' ')[0]}`, href: '/#about' },
             { label: `CHARLA SINCERA CON ${tenantName.split(' ')[0]}`, href: '/charla' },
             { label: 'CARTERA', href: '/#testimonios' },
             { label: 'VALORACIÓN DE LA VIVIENDA', href: '/valoracion' },
             { label: 'EN LA PRENSA', href: '/prensa' },
             { label: 'BARRIOS', href: '/comunidades' },
             { label: 'TESTIMONIOS', href: '/#testimonios' },
             { label: 'RECURSOS', href: '/recursos' },
             { label: 'REPARAR Y VENDER', href: '/reparar' },
             { label: 'VÍDEOS DE ESTILO DE VIDA', href: '/videos' },
             { label: 'BLOG', href: '/blog' },
             { label: 'BOLETÍN', href: '/#newsletter' },
             { label: 'CONECTEMOS', href: 'mailto:info@example.com' },
             { label: 'MI PORTAL DE BÚSQUEDA', href: '/portal' }
           ].map((item, idx) => (
             <Link 
                key={idx} 
                href={item.href} 
                onClick={(e) => {
                  if (item.label === 'BOLETÍN' || item.label === 'HOGAR') {
                    if (item.label === 'BOLETÍN') {
                      e.preventDefault();
                      setIsNewsletterOpen(true);
                    }
                    setIsOpen(false);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="text-[18px] md:text-[24px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] mb-6 text-black hover:opacity-50 transition-opacity"
             >
               {item.label}
             </Link>
           ))}
        </div>
      </div>
    </>
  );
}
