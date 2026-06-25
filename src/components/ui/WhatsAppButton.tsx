"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function WhatsAppButton({ phone, message = "Hola, me gustaría obtener más información." }: { phone?: string, message?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  if (!phone) return null;

  // Limpiar caracteres no numéricos
  const cleanPhone = phone.replace(/\D/g, '');

  const handleSend = () => {
    const finalMessage = customMessage.trim() || message;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(waUrl, "_blank");
    setIsOpen(false);
    setCustomMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-[family-name:var(--font-quicksand)]">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-[#075E54] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-[15px] leading-tight">Asesor Inmobiliario</p>
                <p className="text-[11px] text-white">Normalmente responde al instante</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Body */}
          <div className="p-5 bg-[#E5DDD5] dark:bg-neutral-800 h-[200px] overflow-y-auto flex flex-col justify-end">
             <div className="bg-white dark:bg-neutral-900 text-black dark:text-white p-3.5 rounded-xl rounded-tl-none text-[13px] max-w-[85%] shadow-sm w-fit relative">
               ¡Hola! 👋 ¿En qué podemos ayudarte hoy?
               <span className="text-[9px] text-black dark:text-white absolute bottom-1 right-2">ahora</span>
             </div>
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-neutral-900 flex gap-2 items-center">
            <input 
              type="text" 
              placeholder="Escribe tu mensaje..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              autoFocus
              className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2.5 text-[13px] outline-none text-black dark:text-white"
            />
            <button 
              onClick={handleSend}
              disabled={!customMessage.trim()}
              className="w-10 h-10 bg-[#128C7E] disabled:bg-gray-300 dark:disabled:bg-neutral-700 hover:bg-[#075E54] text-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white w-12 h-12 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group relative"
        aria-label="Abrir Chat de WhatsApp"
      >
        {isOpen ? <X className="w-6 h-6 stroke-[2]" /> : <MessageCircle className="w-6 h-6 stroke-[2]" />}
        
        {/* Tooltip Hover (solo si está cerrado) */}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-white dark:bg-neutral-800 text-black dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none border border-black/5 dark:border-white/10">
            ¿Te ayudo?
          </span>
        )}
      </button>
    </div>
  );
}
