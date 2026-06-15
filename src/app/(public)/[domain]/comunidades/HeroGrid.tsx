'use client';

import { useEffect, useState } from 'react';

const premiumImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518182170546-076616fdacaf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520116468816-921d7b6935cc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
];

export default function HeroGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-black/5" />;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes breathe {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-breathe {
          animation: breathe 20s ease-in-out infinite alternate;
        }
      `}} />
      <div className="absolute inset-0 w-full h-full overflow-hidden grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 pointer-events-none">
        {premiumImages.map((img, idx) => {
          // Delay aleatorio para que no respiren todas al mismo tiempo
          const delay = (idx % 5) * -4; 
          return (
            <div key={idx} className="relative overflow-hidden w-full h-full">
              {/* Overlay oscuro sobre cada imagen para que el texto resalte mucho */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-10"></div>
              <img 
                src={img} 
                alt="Costa Rica Property" 
                className="w-full h-full object-cover animate-breathe opacity-80"
                style={{ animationDelay: `${delay}s` }}
              />
            </div>
          );
        })}
      </div>
      {/* Gradiente adicional encima para difuminar los bordes con el resto de la página */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] dark:from-neutral-950 via-transparent to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-20 pointer-events-none"></div>
    </>
  );
}
