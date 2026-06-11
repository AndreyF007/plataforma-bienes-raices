"use client";

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterFormProps {
  tenantName: string;
  isMainPage?: boolean;
}

export default function NewsletterForm({ tenantName, isMainPage = false }: NewsletterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

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

    // Email validation regex
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

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-white/20 bg-white/5 backdrop-blur-md animate-in fade-in zoom-in duration-500 rounded-sm">
        <CheckCircle2 className="w-16 h-16 text-white mb-4" />
        <h3 className="text-[20px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.2em] mb-2">¡Gracias por Unirte!</h3>
        <p className="text-[14px] text-white/80 font-[family-name:var(--font-quicksand)] text-center">
          Tu suscripción ha sido confirmada. Pronto recibirás nuestras exclusivas actualizaciones del mercado inmobiliario.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 border-b border-white/50 text-[11px] uppercase tracking-widest hover:border-white transition-colors"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[500px] mx-auto transition-all">
      <input 
        type="text" 
        placeholder="Nombre" 
        value={name}
        onChange={(e) => { setName(e.target.value); if(status==='error') setStatus('idle'); }}
        disabled={status === 'loading'}
        className="w-full bg-transparent border border-white py-4 px-6 text-white placeholder:text-white/70 font-light focus:outline-none focus:border-white/50 focus:bg-white/5 disabled:opacity-50 transition-all" 
      />
      
      <input 
        type="email" 
        placeholder="Correo electrónico" 
        value={email}
        onChange={(e) => { setEmail(e.target.value); if(status==='error') setStatus('idle'); }}
        disabled={status === 'loading'}
        className="w-full bg-transparent border border-white py-4 px-6 text-white placeholder:text-white/70 font-light focus:outline-none focus:border-white/50 focus:bg-white/5 disabled:opacity-50 transition-all" 
      />
      
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full border border-white py-4 text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white flex justify-center items-center h-[54px]"
      >
        {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ENTREGAR'}
      </button>
      
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-300 text-[12px] bg-red-900/20 p-3 rounded-sm border border-red-500/20 animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex items-start gap-4 text-left mt-4 cursor-pointer" onClick={() => !status.includes('loading') && setAccepted(!accepted)}>
        <input 
          type="checkbox" 
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          disabled={status === 'loading'}
          className="mt-1 w-4 h-4 cursor-pointer" 
          onClick={(e) => e.stopPropagation()}
        />
        <p className="text-[10px] md:text-[12px] font-[family-name:var(--font-quicksand)] text-white/80 leading-relaxed cursor-pointer select-none">
          {isMainPage ? (
            <>Acepto que {tenantName} se comunique conmigo por teléfono, correo electrónico y mensaje de texto para ofrecerme servicios inmobiliarios. Para darme de baja, puedo responder "stop" en cualquier momento o "help" para obtener ayuda. También puedo hacer clic en el enlace para cancelar la suscripción que aparece en los correos electrónicos. Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar. <span className="underline hover:text-white">Política de privacidad</span>.</>
          ) : (
            <>Acepto que {tenantName} se comunique conmigo por teléfono, correo electrónico y mensaje de texto para ofrecerme servicios inmobiliarios. Para darme de baja, puedo responder "stop" en cualquier momento o "help" para obtener ayuda. También puedo hacer clic en el enlace para cancelar la suscripción que aparece en los correos electrónicos.</>
          )}
        </p>
      </div>
    </form>
  );
}
