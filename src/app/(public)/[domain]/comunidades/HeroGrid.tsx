'use client';

import { useEffect, useState, useMemo } from 'react';

// Imágenes locales seguras y probadas en el sistema para respaldo por si fallan conexiones externas
const fallbackLocalImages = [
  "/images/zone-escazu.png",
  "/images/zone-guanacaste.png",
  "/images/zone-manuel.png",
  "/images/zone-nosara.png",
  "/images/property-1.png",
  "/images/property-2.png",
  "/images/property-3.png",
  "/images/property-4.png",
  "/images/hero-bg.png"
];

function FlippingCell({ img1, img2, flipInterval, initialDelay, breatheDelay }: { img1: string, img2: string, flipInterval: number, initialDelay: number, breatheDelay: number }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFlipped(f => !f);
      const interval = setInterval(() => {
        setFlipped(f => !f);
      }, flipInterval);
      return () => clearInterval(interval);
    }, initialDelay);
    return () => clearTimeout(timeout);
  }, [flipInterval, initialDelay]);

  return (
    <div className="relative overflow-hidden w-full h-full flip-container bg-neutral-900">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30 z-20 pointer-events-none"></div>
      
      <div className={`flipper w-full h-full ${flipped ? 'flipped' : ''}`}>
        <div className="front w-full h-full bg-neutral-900">
           <img 
             src={img1} 
             alt="" 
             onError={(e) => { 
               const target = e.target as HTMLImageElement;
               if (!target.dataset.failed) {
                 target.dataset.failed = "true";
                 target.src = '/images/zone-guanacaste.png';
               } else {
                 target.style.display = 'none';
               }
             }}
             className="w-full h-full object-cover animate-breathe block bg-neutral-900" 
             style={{ animationDelay: breatheDelay + 's' }} 
           />
        </div>
        <div className="back w-full h-full bg-neutral-900">
           <img 
             src={img2} 
             alt="" 
             onError={(e) => { 
               const target = e.target as HTMLImageElement;
               if (!target.dataset.failed) {
                 target.dataset.failed = "true";
                 target.src = '/images/zone-escazu.png';
               } else {
                 target.style.display = 'none';
               }
             }}
             className="w-full h-full object-cover animate-breathe block bg-neutral-900" 
             style={{ animationDelay: (breatheDelay + 2) + 's' }} 
           />
        </div>
      </div>
    </div>
  );
}

interface ZoneProp {
  image?: string | null;
  coverImage?: string | null;
}

export default function HeroGrid({ zones }: { zones?: ZoneProp[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Seleccionar y mezclar al azar entre las fotos reales que ha subido el usuario para los cantones
  const pairs = useMemo(() => {
    const uploaded = (zones || [])
      .flatMap(z => [z.image, z.coverImage])
      .filter((img): img is string => typeof img === 'string' && img.trim() !== '' && !img.includes('wikimedia'));

    // Combinar las subidas (dándoles máxima prioridad y duplicándolas si se requiere) con las locales garantizadas
    let pool = Array.from(new Set([...uploaded, ...fallbackLocalImages]));
    
    // Mezclar al azar y construir las 24 fotos necesarias
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected: string[] = [];
    for (let i = 0; i < 24; i++) {
      selected.push(shuffled[i % shuffled.length]);
    }

    const newPairs = [];
    for (let i = 0; i < 12; i++) {
      newPairs.push({
        img1: selected[i],
        img2: selected[i + 12]
      });
    }
    return newPairs;
  }, [zones]);

  if (!mounted) return <div className="absolute inset-0 bg-black/5" />;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes breathe {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-breathe {
          animation: breathe 10s ease-in-out infinite alternate;
        }
        .flip-container {
          perspective: 1200px;
        }
        .flipper {
          transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          position: relative;
        }
        .flipped {
          transform: rotateY(180deg);
        }
        .front, .back {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          transform: rotateY(180deg);
        }
      `}} />
      <div className="absolute inset-0 w-full h-full overflow-hidden grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 pointer-events-none">
        {pairs.map((pair, idx) => {
          // Delay aleatorio para la respiración (-10 a 0)
          const breatheDelay = (idx % 5) * -2; 
          // Delay inicial aleatorio para empezar el efecto flip (0s a 15s)
          const initialFlipDelay = (idx * 1500) % 10000;
          // Intervalo de flip aleatorio (10s a 20s) para que nunca se sincronicen
          const flipInterval = 10000 + (idx * 1000);

          return (
            <FlippingCell 
              key={idx}
              img1={pair.img1}
              img2={pair.img2}
              initialDelay={initialFlipDelay}
              flipInterval={flipInterval}
              breatheDelay={breatheDelay}
            />
          );
        })}
      </div>
      {/* Gradiente adicional encima para oscurecer el fondo y resaltar el texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 pointer-events-none opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-20 pointer-events-none"></div>
    </>
  );
}
