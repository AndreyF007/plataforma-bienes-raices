"use client";

import { useState } from 'react';
import { X, Star, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface TestimonialSubmitModalProps {
  tenantName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function TestimonialSubmitModal({ tenantName, isOpen, onClose }: TestimonialSubmitModalProps) {
  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("Comprador");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName.trim() || !content.trim()) {
      setErrorMessage("Por favor, completa tu nombre y la reseña.");
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, role, content, rating, tenantName })
      });

      if (!res.ok) {
        throw new Error('Error al enviar el testimonio');
      }

      setStatus('success');
      setClientName("");
      setContent("");
      setRating(5);
    } catch (error) {
      setErrorMessage("Hubo un error de conexión. Inténtalo de nuevo.");
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={() => status !== 'loading' && onClose()}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[600px] bg-white dark:bg-neutral-950 text-black dark:text-white overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/10 bg-gray-50">
          <h2 className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] uppercase tracking-widest font-bold">
            Dejar un Testimonio
          </h2>
          <button 
            onClick={() => status !== 'loading' && onClose()}
            className="p-2 hover:bg-black/5 rounded-full transition-colors disabled:opacity-50"
            disabled={status === 'loading'}
          >
            <X className="w-6 h-6 stroke-1" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
            <h3 className="text-[24px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em] font-light mb-4">
              ¡Muchas Gracias!
            </h3>
            <p className="text-[16px] text-black/70 font-[family-name:var(--font-quicksand)] max-w-sm mb-8">
              Tu reseña ha sido enviada a <strong>{tenantName}</strong> y pronto será publicada en la página.
            </p>
            <button 
              onClick={onClose}
              className="px-10 py-3 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
            
            <p className="text-[14px] text-black/60 dark:text-white/60 font-[family-name:var(--font-quicksand)] leading-relaxed mb-2">
              Tu opinión es muy importante para nosotros. Por favor, tómate un momento para calificar tu experiencia.
            </p>

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-md border border-red-200">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-[12px]">{errorMessage}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[12px] uppercase tracking-widest font-bold text-black/70">Calificación</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                    disabled={status === 'loading'}
                  >
                    <Star 
                      className={`w-8 h-8 transition-colors ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[12px] uppercase tracking-widest font-bold text-black/70">Tu Nombre</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full bg-white dark:bg-neutral-950 border border-black/20 px-4 py-3 text-[14px] focus:outline-none focus:border-black dark:border-white/20 disabled:opacity-50"
                  placeholder="Ej. Ana García"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[12px] uppercase tracking-widest font-bold text-black/70">Tipo de Cliente</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full bg-white dark:bg-neutral-950 border border-black/20 px-4 py-3 text-[14px] focus:outline-none focus:border-black dark:border-white/20 disabled:opacity-50"
                >
                  <option value="Comprador">Comprador</option>
                  <option value="Vendedor">Vendedor</option>
                  <option value="Inversor">Inversor</option>
                  <option value="Inquilino">Inquilino</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] uppercase tracking-widest font-bold text-black/70">Tu Reseña</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={status === 'loading'}
                rows={4}
                className="w-full bg-white dark:bg-neutral-950 border border-black/20 px-4 py-3 text-[14px] focus:outline-none focus:border-black dark:border-white/20 disabled:opacity-50 resize-none"
                placeholder="Cuéntanos cómo fue tu experiencia..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full mt-4 bg-black text-white py-4 text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-colors flex justify-center items-center h-[50px] disabled:opacity-50"
            >
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ENVIAR TESTIMONIO'}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
