"use client";

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import PrivacyModal from './PrivacyModal';

interface NewsletterModalProps {
  tenantName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ tenantName, isOpen, onClose }: NewsletterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Por favor, completa todos los campos.");
      setStatus('error');
      return;
    }

    if (!accepted) {
      setErrorMessage("Debes aceptar los términos para continuar.");
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, tenantName })
      });

      if (!res.ok) {
        throw new Error('Error al suscribirse');
      }

      setStatus('success');
      setName("");
      setEmail("");
      setAccepted(false);
    } catch (error) {
      setErrorMessage("Hubo un error de conexión. Inténtalo de nuevo.");
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-500">
      
      {/* Backdrop (Dark overlay) */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Close button top right */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:text-white transition-colors z-[201]"
      >
        <X className="w-8 h-8 stroke-1" />
      </button>

      {/* Modal Content */}
      <div className="relative w-full max-w-[1000px] px-6 text-white text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
        
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center p-12">
            <CheckCircle2 className="w-20 h-20 text-white mb-6" />
            <h3 className="text-[24px] md:text-[32px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.2em] font-light mb-4">
              ¡Gracias por Unirte!
            </h3>
            <p className="text-[16px] text-white font-[family-name:var(--font-quicksand)] max-w-lg">
              Tu suscripción ha sido confirmada. Pronto recibirás nuestras exclusivas actualizaciones del mercado inmobiliario.
            </p>
            <button 
              onClick={onClose}
              className="mt-10 px-12 py-4 border border-white text-[12px] uppercase tracking-widest hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-[11px] md:text-[13px] font-[family-name:var(--font-raleway)] uppercase font-bold tracking-[0.3em] text-[#d4af37] mb-3">
               MERCADO EXCLUSIVO
            </h3>
            <h2 className="text-[28px] md:text-[46px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.15em] mb-6 leading-tight text-white">
               BOLETÍN DE ALTA GAMA
            </h2>
            <p className="text-[14px] md:text-[17px] text-white/90 font-[family-name:var(--font-quicksand)] max-w-2xl mb-14 leading-relaxed font-light">
               Únete a nuestra exclusiva lista VIP y recibe un análisis profundo del mercado inmobiliario de lujo, tendencias arquitectónicas e información privilegiada de propiedades en Costa Rica.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 items-center">
               
               {/* Horizontal Inputs */}
               <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-end">
                 
                 <div className="w-full md:w-1/3 flex flex-col gap-2">
                   <label className="text-left text-[11px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.2em] text-white/90">
                     Nombre Completo
                   </label>
                   <input 
                     type="text" 
                     value={name}
                     onChange={(e) => { setName(e.target.value); if(status==='error') setStatus('idle'); }}
                     disabled={status === 'loading'}
                     className="w-full bg-transparent border-b border-white/40 py-2 text-white text-[16px] font-light focus:outline-none focus:border-white disabled:opacity-50 transition-colors" 
                   />
                 </div>

                 <div className="w-full md:w-1/3 flex flex-col gap-2">
                   <label className="text-left text-[11px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.2em] text-white/90">
                     Correo Electrónico
                   </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if(status==='error') setStatus('idle'); }}
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b border-white/50 py-2 text-white text-[16px] font-light focus:outline-none focus:border-white disabled:opacity-50 transition-colors" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full md:w-1/4 border border-white py-4 text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white flex justify-center items-center h-[50px] mt-4 md:mt-0"
                >
                  {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SUBMIT'}
                </button>

              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-300 text-[12px] bg-red-900/20 px-4 py-2 rounded-sm border border-red-500/20 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Consent Checkbox */}
              <div className="flex items-start gap-4 text-left max-w-4xl mt-4 cursor-pointer" onClick={() => !status.includes('loading') && setAccepted(!accepted)}>
                <input 
                  type="checkbox" 
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  disabled={status === 'loading'}
                  className="mt-1 w-4 h-4 cursor-pointer accent-white" 
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-[10px] md:text-[12px] font-[family-name:var(--font-quicksand)] text-white leading-relaxed cursor-pointer select-none">
                  Acepto que {tenantName} se comunique conmigo por teléfono, correo electrónico y mensaje de texto para ofrecerme servicios inmobiliarios. Para darme de baja, puedo responder "stop" en cualquier momento o "help" para obtener ayuda. También puedo hacer clic en el enlace para cancelar la suscripción que aparece en los correos electrónicos. Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar. <span className="underline hover:text-white" onClick={(e) => e.stopPropagation()}><PrivacyModal tenantName={tenantName} /></span>
                </p>
              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );
}
