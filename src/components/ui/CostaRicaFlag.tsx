'use client';

export default function CostaRicaFlag() {
  const slices = 40; // Higher number of slices = smoother cloth curves

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex bg-black">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cloth-wave {
          0% {
            transform: translateY(5%);
            filter: brightness(0.6) contrast(1.2);
          }
          50% {
            transform: translateY(-5%);
            filter: brightness(1.3) contrast(1.1);
          }
          100% {
            transform: translateY(5%);
            filter: brightness(0.6) contrast(1.2);
          }
        }
        .cr-stripes {
          background: linear-gradient(to bottom, 
            #001489 0%, #001489 16.66%, 
            #FFFFFF 16.66%, #FFFFFF 33.33%, 
            #DA291C 33.33%, #DA291C 66.66%, 
            #FFFFFF 66.66%, #FFFFFF 83.33%, 
            #001489 83.33%, #001489 100%);
        }
      `}} />
      
      {Array.from({ length: slices }).map((_, i) => {
        // Calculate animation delay to create a smooth traveling wave left to right
        const delay = (i / slices) * -3; 
        
        return (
          <div
            key={i}
            className="cr-stripes flex-1 h-[120%] -mt-[10%] relative"
            style={{
              animation: `cloth-wave 3s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              // Add a subtle width overlap to prevent rendering gaps between slices
              minWidth: `calc(100% / ${slices} + 1px)`
            }}
          />
        );
      })}
    </div>
  );
}
