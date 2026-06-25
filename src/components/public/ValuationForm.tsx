'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ValuationFormProps {
  tenantId: string;
  bgImage?: string;
}

export default function ValuationForm({ tenantId, bgImage }: ValuationFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    email: '',
    phone: '',
    timeframe: '',
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (step === 1 && formData.address) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.consent) {
      alert("Por favor completa los campos requeridos y acepta los términos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/valuations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: formData.address,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          timeframe: formData.timeframe,
          tenantId
        })
      });

      if (res.ok) {
        setStep(3); // Success step
      } else {
        alert("Error al enviar la solicitud. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="valoracion" className="relative w-full min-h-[600px] flex items-center justify-center py-20 px-4 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url('${bgImage || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80"}')` }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 w-full max-w-[800px] mx-auto flex flex-col items-center">
        
        {/* Progress Indicator */}
        <div className="flex gap-12 items-center mb-16 relative">
          {[1, 2, 3].map((num) => (
             <div key={num} className="flex flex-col items-center relative z-10">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-[family-name:var(--font-raleway)] transition-colors duration-500 ${step === num ? 'bg-[#e5d4c3] text-black dark:text-white font-bold' : step > num ? 'text-white' : 'text-white'}`}>
                 {num}
               </div>
             </div>
          ))}
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 -translate-y-1/2 z-0 pointer-events-none"></div>
        </div>

        {/* Content Box */}
        <div className="w-full text-center">
          
          {/* STEP 1: Address */}
          {step === 1 && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <h2 className="text-[24px] md:text-[32px] font-[family-name:var(--font-raleway)] font-light text-white uppercase tracking-[0.2em] mb-4">
                ¿CUÁNTO VALE SU CASA?
              </h2>
              <p className="text-[14px] text-white font-[family-name:var(--font-quicksand)] mb-12">
                Ingrese su dirección para recibir una valoración detallada.
              </p>
              
              <div className="max-w-[600px] mx-auto w-full relative">
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="DIRECCIÓN DE LA PROPIEDAD" 
                  className="w-full bg-transparent border-0 border-b border-white/50 text-white placeholder-white/50 py-4 px-2 focus:ring-0 focus:outline-none focus:border-white text-[14px] md:text-[18px] text-center font-[family-name:var(--font-raleway)] uppercase tracking-widest transition-colors"
                />
                <button 
                  onClick={handleNext}
                  disabled={!formData.address.trim()}
                  className="mt-12 px-12 py-4 border border-white text-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.2em] text-[12px] font-bold disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  SIGUIENTE
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Contact Info */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="animate-in slide-in-from-right-8 fade-in duration-500 max-w-[600px] mx-auto w-full text-left">
              <h2 className="text-[20px] md:text-[24px] font-[family-name:var(--font-raleway)] font-light text-white uppercase tracking-[0.2em] mb-2 text-center">
                INFORMACIÓN DE CONTACTO
              </h2>
              <p className="text-[14px] text-white font-[family-name:var(--font-quicksand)] uppercase tracking-widest mb-10 text-center">
                ¡YA CASI ESTAMOS! ESTÁS A 1 PASO DE DISTANCIA
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] text-white uppercase tracking-widest mb-2 font-bold">Nombre Completo:</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/50 text-white py-2 focus:ring-0 focus:outline-none focus:border-white text-[16px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-white uppercase tracking-widest mb-2 font-bold">Dirección de correo electrónico:</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/50 text-white py-2 focus:ring-0 focus:outline-none focus:border-white text-[16px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-white uppercase tracking-widest mb-2 font-bold">Número de Teléfono:</label>
                  <input 
                    type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/50 text-white py-2 focus:ring-0 focus:outline-none focus:border-white text-[16px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-white uppercase tracking-widest mb-2 font-bold">Marco Temporal: (Opcional)</label>
                  <select 
                    name="timeframe" value={formData.timeframe} onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/50 text-white py-2 focus:ring-0 focus:outline-none focus:border-white text-[16px] [&>option]:text-black dark:text-white"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Lo antes posible">Lo antes posible</option>
                    <option value="1-3 Meses">1-3 Meses</option>
                    <option value="3-6 Meses">3-6 Meses</option>
                    <option value="Solo explorando">Solo explorando</option>
                  </select>
                </div>

                <div className="pt-4 flex items-start gap-3">
                  <input 
                    type="checkbox" name="consent" required checked={formData.consent} onChange={handleChange}
                    className="mt-1 bg-transparent border-white/50"
                  />
                  <p className="text-[10px] text-white leading-relaxed font-[family-name:var(--font-quicksand)] text-justify">
                    Acepto ser contactado vía llamada, correo electrónico y mensaje de texto para servicios inmobiliarios. Para optar por no participar, puede responder 'detener' en cualquier momento o responder 'ayuda' para obtener ayuda. También puede hacer clic en el enlace para cancelar la suscripción en los correos electrónicos. Es posible que se apliquen tarifas por mensajes y datos. La frecuencia de los mensajes puede variar. <a href="#" className="underline hover:text-white">Política de privacidad</a>.
                  </p>
                </div>

                <div className="pt-8 text-center">
                  <button 
                    type="submit"
                    disabled={loading || !formData.consent}
                    className="px-12 py-4 border border-white text-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors uppercase tracking-[0.2em] text-[12px] font-bold disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white flex items-center justify-center mx-auto gap-2 min-w-[250px]"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    OBTENGA MI VALORACIÓN
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
            <div className="animate-in zoom-in-95 fade-in duration-700">
              <h2 className="text-[20px] font-[family-name:var(--font-raleway)] font-bold text-white uppercase tracking-[0.3em] mb-8">
                GRACIAS
              </h2>
              <p className="text-[24px] md:text-[36px] font-[family-name:var(--font-raleway)] font-light leading-[1.6] text-white uppercase tracking-[0.1em] mb-12 max-w-[800px] mx-auto">
                ESTOY RECOPILANDO INFORMACIÓN SOBRE SU PROPIEDAD. SU INFORME DE VALORACIÓN DE VIVIENDA LLEGARÁ A SU BUZÓN.
              </p>
              

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
