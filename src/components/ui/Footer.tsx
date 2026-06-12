import { Mail, Phone, MapPin } from 'lucide-react';
import PrivacyModal from '@/components/public/PrivacyModal';
import AdminLoginModal from '@/components/public/AdminLoginModal';

interface FooterProps {
  tenantName: string;
  domain?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  footerText?: string;
  agentPhoto?: string;
  agentTitle?: string;
  contactEmail?: string;
  contactPhone?: string;
  officeAddress?: string;
  disclaimerText?: string;
}

export default function Footer({ 
  tenantName, 
  domain = "localhost:3000",
  facebookUrl = "#",
  instagramUrl = "#",
  youtubeUrl = "#",
  tiktokUrl = "#",
  footerText = "Todos los derechos reservados. Luxury Real Estate.",
  agentPhoto = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
  agentTitle = "Experto Inmobiliario de Costa Rica",
  contactEmail = `realtor@${domain}`,
  contactPhone = "+506 6041 3905",
  officeAddress = "SAN JOSÉ, COSTA RICA\nCÓDIGO POSTAL 10101",
  disclaimerText = "La información de la propiedad aquí contenida se deriva de diversas fuentes que pueden incluir, pero no limitarse a, registros del cantón y el Servicio de Listado Múltiple, y puede incluir aproximaciones. Aunque se cree que la información es precisa, no está garantizada y no debe confiar en ella sin verificación personal. Los agentes de bienes raíces afiliados son asociados de ventas contratistas independientes, no empleados."
}: FooterProps) {
  return (
    <>
      {/* Información Detallada del Corredor */}
      <section className="bg-[#111111] text-white py-16 px-6">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start justify-between">
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
               <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-white/20">
                  <img src={agentPhoto} alt="Agente" className="w-full h-full object-cover" />
               </div>
               <h3 className="text-[24px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em] mb-2">{tenantName}</h3>
               <p className="text-[12px] uppercase tracking-[0.1em] text-white/50 mb-6">{agentTitle}</p>
               <div className="flex gap-4">
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-colors">
                     <span className="text-[12px] uppercase font-bold">ig</span>
                  </a>
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-colors">
                     <span className="text-[12px] uppercase font-bold">f</span>
                  </a>
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-colors">
                     <span className="text-[12px] uppercase font-bold">yt</span>
                  </a>
                  <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white dark:bg-neutral-950 hover:text-black dark:text-white transition-colors">
                     <span className="text-[12px] uppercase font-bold">tt</span>
                  </a>
               </div>
            </div>

            <div className="md:w-2/3 flex flex-col gap-6 text-[14px] font-[family-name:var(--font-quicksand)] items-center md:items-start text-center md:text-left">
               <div className="flex items-center gap-4">
                 <Mail className="w-6 h-6 stroke-1 text-white/50" />
                  <div>
                   <div className="uppercase tracking-widest text-[11px] mb-1 text-white/50">CORREO ELECTRÓNICO</div>
                   <a href={`mailto:${contactEmail}`} className="underline underline-offset-4 hover:text-white/70 transition-colors">{contactEmail.toLowerCase()}</a>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <Phone className="w-6 h-6 stroke-1 text-white/50" />
                  <div>
                   <div className="uppercase tracking-widest text-[11px] mb-1 text-white/50">NÚMERO DE TELÉFONO</div>
                   <a href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white/70 transition-colors">{contactPhone}</a>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <MapPin className="w-6 h-6 stroke-1 text-white/50" />
                  <div>
                   <div className="uppercase tracking-widest text-[11px] mb-1 text-white/50">DIRECCIÓN DE LA OFICINA</div>
                   <div className="whitespace-pre-wrap">{officeAddress}</div>
                 </div>
               </div>
               <div className="mt-4 pt-4 border-t border-white/10 w-full">
                  <p className="text-[10px] text-white/40 leading-relaxed text-justify whitespace-pre-wrap">
                    {disclaimerText}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-black text-white py-8 px-6 text-center border-t border-white/10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[12px] text-white/50">
             Copyright © {new Date().getFullYear()} {tenantName} | {footerText} | <PrivacyModal tenantName={tenantName} /> | <AdminLoginModal />
          </div>
          <div className="flex gap-4">
             <span className="text-[12px] uppercase tracking-[0.2em] text-white/30">SÍGUENOS:</span>
             <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[12px] font-bold transition-colors">IG</a>
             <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[12px] font-bold transition-colors">FB</a>
             <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[12px] font-bold transition-colors">YT</a>
             <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[12px] font-bold transition-colors">TT</a>
          </div>
        </div>
      </footer>
    </>
  );
}
