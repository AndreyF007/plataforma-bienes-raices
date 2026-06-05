"use client";

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface Video {
  title: string;
  img: string;
  youtubeId: string;
}

interface VideoGalleryProps {
  videos: Video[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((vid, idx) => (
          <div 
            key={idx} 
            className="group relative w-full aspect-[4/3] bg-black cursor-pointer overflow-hidden"
            onClick={() => setActiveVideo(vid.youtubeId)}
          >
            <img src={vid.img} alt={vid.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <Play className="w-10 h-10 text-white mb-2 stroke-1 group-hover:scale-110 transition-transform duration-500" />
              <span className="text-white text-[11px] text-center uppercase tracking-[0.1em] drop-shadow-md">{vid.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          
          {/* Fondo oscuro clickeable para cerrar */}
          <div 
            className="absolute inset-0 bg-black/95 z-0 cursor-pointer" 
            onClick={() => setActiveVideo(null)} 
          />

          {/* Botón de cerrar (X) */}
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-white/70 transition-colors z-[110] p-4 bg-black/50 rounded-full cursor-pointer border border-white/20 hover:bg-black/80"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Contenedor del Iframe */}
          <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl relative z-10 rounded-lg overflow-hidden border border-white/10">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`} 
              title="Video Player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
