import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import { Mail, Phone, MapPin } from 'lucide-react';
import ClientNeighborhoods from './ClientNeighborhoods';
import Footer from '@/components/ui/Footer';

export default async function NeighborhoodsPage(props: { params: Promise<{ domain: string }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
  });
  
  if (!tenantData) return notFound();

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      
      <Navbar tenantName={tenantData.name} />
      <FloatingContact />

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex flex-col justify-center items-center overflow-hidden bg-[#fafafa] dark:bg-neutral-900 pt-20 border-b border-black/10 dark:border-white/10">
        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10 max-w-[900px]">
          <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] text-black/50 dark:text-white/50 uppercase tracking-[0.2em] mb-4">
            CANTONES DE COSTA RICA
          </p>
          <h1 className="text-[36px] md:text-[60px] font-[family-name:var(--font-raleway)] font-light text-black dark:text-white tracking-[0.2em] uppercase mb-8 leading-tight">
            ÁREAS DE EXPERIENCIA
          </h1>
          <p className="text-[16px] md:text-[20px] text-black/80 dark:text-white/80 font-[family-name:var(--font-quicksand)] leading-[1.6]">
            Explore nuestras propiedades en los 84 cantones del país.
          </p>
        </div>
      </section>

      {/* 2. APLICACIÓN DE CLIENTE: BUSCADOR Y 84 CANTONES */}
      <ClientNeighborhoods />

      {/* 3. CTA DE BÚSQUEDA */}
      <section className="bg-[#eeeeee] dark:bg-neutral-900 py-[100px] px-6 text-center flex flex-col items-center border-t border-black/10 dark:border-white/10">
         <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] text-black dark:text-white mb-4 max-w-[800px] leading-tight">
           COMIENCE SU BÚSQUEDA DE PROPIEDADES
         </h2>
         <a href="/portal" className="mt-8 inline-block px-12 py-5 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-black dark:hover:text-white border border-black dark:border-white/20 transition-colors">
           EXPLORAR CASAS
         </a>
      </section>

      {/* 4. CIERRE / CTA FILOSOFÍA */}
      <section className="bg-white dark:bg-neutral-950 py-[100px] px-6 text-center flex flex-col items-center">
         <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] text-black dark:text-white mb-8 max-w-[800px] leading-tight">
           "La filosofía de {tenantData.name} es simple: los clientes son lo primero."
         </h2>
         <p className="text-[16px] md:text-[18px] text-black/80 dark:text-white/80 font-[family-name:var(--font-quicksand)] leading-[1.8] max-w-[800px] mb-[40px]">
           Se compromete a estar en constante comunicación con sus clientes, manteniéndolos completamente informados durante todo el proceso de compra o venta.
         </p>
         <a 
           href="https://wa.me/50660413905?text=Hola,%20me%20gustar%C3%ADa%20comprar%20o%20vender%20una%20propiedad"
           target="_blank"
           rel="noopener noreferrer"
           className="inline-block px-12 py-5 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-black dark:hover:text-white border border-black dark:border-white/20 transition-colors"
         >
           CONECTÉMONOS
         </a>
      </section>

      {/* 5. FOOTER */}
      <Footer tenantName={tenantData.name} domain={tenantData.domain} />
    </main>
  );
}
