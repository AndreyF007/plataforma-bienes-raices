"use client";

import { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  tenantName: string;
}

export default function PrivacyModal({ tenantName }: PrivacyModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
        className="underline font-bold hover:text-white transition-colors"
      >
        Política de privacidad
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-[800px] max-h-[90vh] bg-white dark:bg-neutral-950 text-black dark:text-white overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10 bg-gray-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-black dark:text-white" />
                <h2 className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] uppercase tracking-widest font-bold">
                  Política de Privacidad
                </h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 stroke-1" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 md:p-10 text-[14px] leading-[1.8] font-[family-name:var(--font-quicksand)] text-black/80 dark:text-white/80 flex flex-col gap-6 text-left">
              
              <p>Última actualización: <strong>Octubre 2026</strong></p>
              
              <p>
                En <strong>{tenantName}</strong>, valoramos su confianza y respetamos su privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos, protegemos y compartimos su información personal cuando visita nuestro sitio web o utiliza nuestros servicios inmobiliarios.
              </p>

              <div>
                <h3 className="text-[16px] font-bold text-black dark:text-white uppercase tracking-widest mb-2 font-[family-name:var(--font-raleway)]">1. Información que Recopilamos</h3>
                <p>
                  Recopilamos información que usted nos proporciona directamente al llenar formularios (como el boletín o formularios de contacto), lo que puede incluir su nombre, dirección de correo electrónico, número de teléfono y preferencias de búsqueda de propiedades.
                </p>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-black dark:text-white uppercase tracking-widest mb-2 font-[family-name:var(--font-raleway)]">2. Uso de la Información</h3>
                <p>
                  Utilizamos su información para:
                </p>
                <ul className="list-disc pl-6 mt-2 flex flex-col gap-1">
                  <li>Responder a sus consultas inmobiliarias.</li>
                  <li>Enviarle actualizaciones relevantes sobre propiedades o el mercado.</li>
                  <li>Mejorar la experiencia de navegación en nuestro sitio web.</li>
                  <li>Cumplir con requisitos legales aplicables.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-black dark:text-white uppercase tracking-widest mb-2 font-[family-name:var(--font-raleway)]">3. Protección de Datos</h3>
                <p>
                  Implementamos rigurosas medidas de seguridad técnicas y organizativas para proteger su información personal contra accesos no autorizados, alteración, divulgación o destrucción. 
                </p>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-black dark:text-white uppercase tracking-widest mb-2 font-[family-name:var(--font-raleway)]">4. Sus Derechos</h3>
                <p>
                  Usted tiene derecho a acceder, rectificar o solicitar la eliminación de sus datos personales en nuestra base de datos. Para ejercer estos derechos o darse de baja de nuestras comunicaciones, puede contactarnos a través de los canales provistos en este sitio.
                </p>
              </div>

              <p className="text-[12px] opacity-70 mt-4">
                Al utilizar nuestro sitio web, usted acepta los términos de esta Política de Privacidad. Nos reservamos el derecho de modificar esta política en cualquier momento para reflejar cambios en nuestras prácticas operativas o normativas.
              </p>
            </div>
            
            {/* Footer Action */}
            <div className="p-6 border-t border-black/10 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-colors"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
