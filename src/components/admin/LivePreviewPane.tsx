"use client";

import { useRef, useState } from "react";
import { RefreshCw, ExternalLink, ChevronRight, ChevronLeft, Eye, EyeOff } from "lucide-react";

export default function LivePreviewPane({ previewUrl }: { previewUrl: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  if (!isExpanded) {
    return (
      <aside className="hidden lg:flex flex-col w-12 h-full bg-gray-100 border-l border-gray-300 items-center py-4 cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => setIsExpanded(true)}>
        <button className="p-2 bg-black text-white rounded-md shadow-md mb-4" title="Expandir Vista Previa">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 flex flex-col items-center pt-8">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap rotate-90 origin-center mt-20">
            Vista Previa
          </span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed inset-0 z-[100] flex flex-col w-full h-full bg-gray-100 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="flex-shrink-0 p-3 bg-white dark:bg-neutral-950 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-gray-700 font-bold text-xs uppercase tracking-widest transition-colors"
            title="Volver a Edición"
          >
            <ChevronRight className="w-4 h-4" /> Volver a Editar
          </button>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] uppercase tracking-widest font-bold transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Actualizar
          </button>
          <a 
            href={previewUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-black text-white hover:bg-gray-800 text-[10px] uppercase tracking-widest font-bold transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> Pantalla Completa
          </a>
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-neutral-950 relative w-full h-full overflow-hidden">
        <iframe 
          ref={iframeRef}
          src={previewUrl} 
          className="absolute inset-0 w-full h-full border-0" 
          title="Live Preview"
        />
      </div>
    </aside>
  );
}
