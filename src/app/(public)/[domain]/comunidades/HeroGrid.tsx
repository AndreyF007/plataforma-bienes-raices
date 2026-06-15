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
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566752229-250de6891eb2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
];

function FlippingCell({ img1, img2, flipInterval, initialDelay, breatheDelay }: { img1: string, img2: string, flipInterval: number, initialDelay: number, breatheDelay: number }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // Start the flip animation after a staggered initial delay
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
    <div className="relative overflow-hidden w-full h-full flip-container">
      {/* Overlay global para cada celda, mucho más claro ahora */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30 z-20 pointer-events-none"></div>
      
      <div className={`flipper w-full h-full ${flipped ? 'flipped' : ''}`}>
        <div className="front w-full h-full">
           <img 
             src={img1} 
             alt="Costa Rica Property Front" 
             className="w-full h-full object-cover animate-breathe" 
             style={{ animationDelay: breatheDelay + 's' }} 
           />
        </div>
        <div className="back w-full h-full">
           <img 
             src={img2} 
             alt="Costa Rica Property Back" 
             className="w-full h-full object-cover animate-breathe" 
             style={{ animationDelay: (breatheDelay + 2) + 's' }} 
           />
        </div>
      </div>
    </div>
  );
}

export default function HeroGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-black/5" />;

  // Generar pares de imágenes
  const pairs = [];
  for (let i = 0; i < 12; i++) {
    pairs.push({
      img1: premiumImages[i],
      img2: premiumImages[i + 12]
    });
  }

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
      {/* Gradiente adicional encima para difuminar los bordes con el resto de la página */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] dark:from-neutral-950 via-transparent to-transparent z-20 pointer-events-none opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-20 pointer-events-none"></div>
    </>
  );
}
