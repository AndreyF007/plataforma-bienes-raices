"use client";

import { useState } from 'react';
import { X, Lock, Loader2, AlertCircle } from 'lucide-react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMessage("Credenciales inválidas. Por favor, intenta de nuevo.");
      setStatus('error');
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
        className="hover:text-white transition-colors opacity-50 hover:opacity-100"
      >
        Portal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={() => status !== 'loading' && setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-[450px] bg-white dark:bg-neutral-950 text-black dark:text-white overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10 bg-gray-50">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-black dark:text-white" />
                <h2 className="text-[14px] font-[family-name:var(--font-raleway)] uppercase tracking-widest font-bold">
                  Acceso Privado
                </h2>
              </div>
              <button 
                onClick={() => status !== 'loading' && setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors disabled:opacity-50"
                disabled={status === 'loading'}
              >
                <X className="w-5 h-5 stroke-1" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6 text-left">
              
              <div className="text-center mb-4">
                <h1 className="text-[24px] font-light uppercase tracking-widest text-black dark:text-white mb-2 font-[family-name:var(--font-raleway)]">Portal Admin</h1>
                <p className="text-[12px] text-gray-500 font-[family-name:var(--font-quicksand)]">Accede a tu panel para gestionar propiedades y testimonios.</p>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-[12px]">{errorMessage}</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/70">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if(status==='error') setStatus('idle'); }}
                  disabled={status === 'loading'}
                  className="w-full bg-white dark:bg-neutral-950 border border-black/20 px-4 py-3 text-[14px] focus:outline-none focus:border-black dark:border-white/20 transition-colors disabled:opacity-50"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/70">Contraseña</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if(status==='error') setStatus('idle'); }}
                  disabled={status === 'loading'}
                  className="w-full bg-white dark:bg-neutral-950 border border-black/20 px-4 py-3 text-[14px] focus:outline-none focus:border-black dark:border-white/20 transition-colors disabled:opacity-50"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full mt-4 bg-black text-white py-4 text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-colors flex justify-center items-center h-[50px] disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'INICIAR SESIÓN'}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}
