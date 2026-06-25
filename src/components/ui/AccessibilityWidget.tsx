"use client";

import { useState, useEffect } from 'react';
import { Accessibility, Type, Contrast, Link as LinkIcon, PlaySquare, X, RefreshCw } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // States for different accessibility modes
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);

  // Apply classes to <html> tag when states change
  useEffect(() => {
    const html = document.documentElement;
    
    if (largeText) html.classList.add('a11y-large-text');
    else html.classList.remove('a11y-large-text');

    if (highContrast) html.classList.add('a11y-high-contrast');
    else html.classList.remove('a11y-high-contrast');

    if (highlightLinks) html.classList.add('a11y-highlight-links');
    else html.classList.remove('a11y-highlight-links');

    if (stopAnimations) html.classList.add('a11y-stop-animations');
    else html.classList.remove('a11y-stop-animations');
    
  }, [largeText, highContrast, highlightLinks, stopAnimations]);

  const resetAll = () => {
    setLargeText(false);
    setHighContrast(false);
    setHighlightLinks(false);
    setStopAnimations(false);
  };

  return (
    <div className="relative mb-4 self-end flex flex-col items-end">
      
      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute bottom-[60px] right-0 w-[300px] bg-white dark:bg-neutral-950 border border-black/10 shadow-2xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 z-[100]">
          
          {/* Header */}
          <div className="bg-[#0044ff] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              <h3 className="font-[family-name:var(--font-raleway)] text-[14px] font-bold tracking-widest uppercase">Accesibilidad</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options */}
          <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
            
            <button 
              onClick={() => setLargeText(!largeText)}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${largeText ? 'border-[#0044ff] bg-[#0044ff]/10 text-[#0044ff]' : 'border-black/10 hover:border-black/30 text-black dark:text-white'}`}
            >
              <Type className="w-6 h-6" />
              <div className="text-left">
                <p className="text-[14px] font-bold">Texto Más Grande</p>
                <p className="text-[11px] opacity-70">Aumenta el tamaño de la fuente</p>
              </div>
            </button>

            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${highContrast ? 'border-[#0044ff] bg-[#0044ff]/10 text-[#0044ff]' : 'border-black/10 hover:border-black/30 text-black dark:text-white'}`}
            >
              <Contrast className="w-6 h-6" />
              <div className="text-left">
                <p className="text-[14px] font-bold">Alto Contraste</p>
                <p className="text-[11px] opacity-70">Colores invertidos para mayor claridad</p>
              </div>
            </button>

            <button 
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${highlightLinks ? 'border-[#0044ff] bg-[#0044ff]/10 text-[#0044ff]' : 'border-black/10 hover:border-black/30 text-black dark:text-white'}`}
            >
              <LinkIcon className="w-6 h-6" />
              <div className="text-left">
                <p className="text-[14px] font-bold">Resaltar Enlaces</p>
                <p className="text-[11px] opacity-70">Destaca áreas clickeables</p>
              </div>
            </button>

            <button 
              onClick={() => setStopAnimations(!stopAnimations)}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${stopAnimations ? 'border-[#0044ff] bg-[#0044ff]/10 text-[#0044ff]' : 'border-black/10 hover:border-black/30 text-black dark:text-white'}`}
            >
              <PlaySquare className="w-6 h-6" />
              <div className="text-left">
                <p className="text-[14px] font-bold">Pausar Animaciones</p>
                <p className="text-[11px] opacity-70">Detiene el movimiento en pantalla</p>
              </div>
            </button>

          </div>

          {/* Footer Reset */}
          <div className="p-4 bg-gray-50 border-t border-black/5">
            <button 
              onClick={resetAll}
              className="flex items-center justify-center gap-2 w-full py-2 text-[12px] font-bold uppercase tracking-widest text-black dark:text-white hover:text-red-500 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Restablecer Ajustes
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#0066ff] border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white dark:bg-neutral-950 hover:text-[#0066ff] hover:border-[#0066ff] transition-all duration-300"
        aria-label="Abrir menú de accesibilidad"
      >
        <Accessibility className="w-5 h-5 stroke-[1.5]" />
      </button>

    </div>
  );
}
