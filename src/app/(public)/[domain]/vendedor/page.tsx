import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import TestimonialSlider from '@/components/ui/TestimonialSlider';
import Footer from '@/components/ui/Footer';
import ValuationForm from '@/components/public/ValuationForm';
import Link from 'next/link';

export default async function SellersGuidePage(props: { params: Promise<{ domain: string }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
  });
  
  if (!tenantData) return notFound();

  let settings: any = {};
  try {
    settings = JSON.parse(tenantData.siteSettings || "{}");
  } catch(e) {}

  const steps = [
    {
      num: "1",
      title: "ENTIENDA POR QUÉ ESTÁ VENDIENDO",
      desc: "¿Qué desea lograr con la venta de su casa? ¿Desea ganar una cierta cantidad de dinero que pueda destinar a una casa más grande o mejor? ¿Necesita venderla lo antes posible para facilitar una mudanza a una nueva ciudad o área? Una vez que entienda sus necesidades, podrá elaborar mejor su oferta. Por ejemplo, si necesita vender rápidamente, es posible que desee ponerle un precio a su casa más bajo que si su objetivo es obtener un cierto margen de beneficio. Asegúrese de comunicar estas necesidades a su Agente Inmobiliario® una vez que elija uno para que él o ella pueda ajustar su precio de venta en consecuencia.",
      img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "2",
      title: "DETERMINE EL PRECIO DE VENTA",
      desc: "Saber cómo fijar el precio de su casa es una de las partes más importantes del proceso de venta. Cuando establece un precio justo al principio, obtendrá el mayor interés de otros agentes inmobiliarios y posibles compradores. Ponerle un precio excesivo a su casa podría provocar una reducción del interés, y fijarle un precio inferior al valor real hará que reciba menos de lo que vale su casa. Trabajar con un agente inmobiliario es la mejor manera de determinar el precio de venta correcto para su casa. Un agente con experiencia puede determinar a cuánto se están vendiendo otras casas comparables, evaluar el mercado actual e incluso puede sugerir una tasación de la casa.",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "3",
      title: "COMIENCE LAS PREPARACIONES",
      desc: "Si ha mantenido su casa en condiciones de exhibición desde que vive en ella, se encuentra en la minoría de los propietarios. Una vez que fije el precio de su casa, es hora de comenzar a prepararla para mostrarla a los posibles compradores. Esto incluye deshacerse del desorden, despersonalizar el espacio para que los compradores puedan imaginarse a sí mismos en él, hacer pequeñas reparaciones y hacer una limpieza profunda para asegurarse de que su casa esté en perfectas condiciones.",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "4",
      title: "DESARROLLE UNA ESTRATEGIA DE MARKETING",
      desc: "Desarrollaré una estrategia de marketing perfecta para anunciar su casa. Esto implica listar la casa y luego dirigir a las personas adecuadas a ese listado a través de campañas en las redes sociales, referencias de agente a agente, medios tradicionales o publicidad SEO. Mi equipo crea una campaña de marketing que tiene como objetivo obtener la mayor cantidad de tráfico posible a su listado en las primeras tres semanas después de convertirse en cliente.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "5",
      title: "EVALÚE LAS OFERTAS",
      desc: "Recibir una oferta es una parte emocionante del proceso, pero no significa que el viaje haya terminado. Evaluaremos cada oferta y nos aseguraremos de que la parte que hace la oferta esté precalificada o preaprobada por un prestamista hipotecario y que su oferta sea aceptable para usted. Si la oferta es demasiado baja, puede hacer una contraoferta u ofrecer otras formas de cerrar la brecha, como cubrir algunos o todos los costos de cierre, hacer reparaciones, ajustar la fecha de mudanza o dejar algunos electrodomésticos o accesorios para el nuevo comprador.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "6",
      title: "ACEPTE UNA OFERTA",
      desc: "Una vez que consideremos que la oferta es aceptable, revisaremos el contrato propuesto para asegurarnos de que todo esté en orden e incluya los componentes necesarios, como el monto del depósito, el pago inicial, el financiamiento, los derechos de inspección y las asignaciones de reparación, las contingencias, la fecha de liquidación y una lista de tarifas y quién las pagará. Cuando ambas partes hayan acordado el término, su agente preparará un contrato final.",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "7",
      title: "PREPÁRESE PARA EL CIERRE",
      desc: "Ha aceptado una oferta y ahora está muy cerca del final de su viaje de venta. Pero primero, usted y el comprador deben hacer una lista de lo que debe hacerse antes del cierre. En algunos casos, su casa puede necesitar ser inspeccionada formalmente, encuestada y tasada. En otros casos, será necesario realizar reparaciones importantes o menores antes de que se pueda cerrar la casa. Encabezaré los esfuerzos para desarrollar y ejecutar esta lista, hacer que la parte correcta pague por cada elemento de acción y asegurarme de que todo esté en orden para la fecha de cierre. Unos días antes de la fecha de cierre, llamaremos a la empresa que cierra la transacción para asegurarnos de que todo esté listo para comenzar.",
      img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "8",
      title: "CIERRE",
      desc: "Ha llegado al último paso en el proceso del vendedor. Cuando cierra en una casa que está vendiendo, transfiere legalmente la propiedad al nuevo comprador. Nos reuniremos con la empresa que cierra la transacción para firmar el papeleo final y revisar cualquier problema que aún no se haya resuelto. Durante este tiempo, también puede hacer planes con su Agente Inmobiliario® para manejar detalles finales, como cancelar los servicios, cambiar el nombre en las cuentas que el nuevo propietario retendrá y asegurarse de que el nuevo propietario tenga instrucciones para los electrodomésticos.",
      img: "https://images.unsplash.com/photo-1571216656722-1d6ebfa77da1?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const actionButtons = [
    { title: "ZONAS DE COBERTURA", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80", link: "/comunidades" },
    { title: "TESTIMONIOS", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80", link: "#testimonios" },
    { title: "PORTAL DE PROPIEDADES", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", link: "/portal" },
    { title: `CONTACTAR A ${tenantData.name.split(' ')[0].toUpperCase()}`, img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80", link: `mailto:${settings.contactEmail || 'info@example.com'}` }
  ];

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      
      <Navbar tenantName={tenantData.name} />
      <FloatingContact />

      <section className="group relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed opacity-60 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')` }}
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10 max-w-[900px]">
          <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] text-white/80 uppercase tracking-[0.2em] mb-4">
            VENDEDORES | {tenantData.name.toUpperCase()}
          </p>
          <h1 className="text-[36px] md:text-[60px] font-[family-name:var(--font-raleway)] font-light text-white tracking-[0.2em] uppercase mb-8 leading-tight">
            TRABAJANDO CON VENDEDORES
          </h1>
          <p className="text-[18px] md:text-[24px] text-white font-[family-name:var(--font-quicksand)] leading-[1.6]">
            ¡Consiguiéndole el precio más alto mientras encontramos a la próxima familia encantadora que construirá más recuerdos en su hogar!
          </p>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section className="bg-white dark:bg-neutral-950 py-[80px] md:py-[120px] px-6 text-center flex flex-col items-center">
         <h2 className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] font-medium uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-4">
           PASO A PASO
         </h2>
         <h3 className="text-[32px] md:text-[48px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black dark:text-white leading-tight mb-[40px]">
           GUÍA PARA VENDEDORES PRIMERIZOS
         </h3>
         <p className="text-[16px] md:text-[18px] text-black/80 dark:text-white/80 font-[family-name:var(--font-quicksand)] leading-[1.8] max-w-[800px] mb-[60px]">
           Poner su casa en el mercado puede ser un proceso estresante, especialmente cuando no sabe qué esperar. Afortunadamente, con la ayuda de un agente experimentado y esta guía fácil de seguir, puede completar el proceso sin problemas. Seguir estos pasos le ayudará a prepararse para organizarse y vender su casa al mejor precio posible.
         </p>
      </section>

      {/* 3. LOS 8 PASOS (Alternando Izquierda/Derecha) */}
      <section className="bg-white dark:bg-neutral-950 w-full">
         {steps.map((step, idx) => (
            <div key={idx} className={`group w-full flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-[50vh] overflow-hidden`}>
               
               {/* Imagen */}
               <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
                  <img src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" />
               </div>

               {/* Texto */}
               <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 bg-[#fafafa] dark:bg-neutral-900">
                  <h3 className="text-[24px] md:text-[32px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.15em] text-black dark:text-white mb-6 leading-tight">
                    PASO {step.num}: {step.title}
                  </h3>
                  <p className="text-[16px] text-black/80 dark:text-white/80 font-[family-name:var(--font-quicksand)] leading-[1.8]">
                    {step.desc}
                  </p>
               </div>

            </div>
         ))}
         
         <div className="py-24 px-6 text-center max-w-[800px] mx-auto">
            <h3 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.15em] text-black dark:text-white mb-8 leading-tight">
               ¡FELICIDADES!
            </h3>
            <p className="text-[16px] md:text-[18px] text-black/80 dark:text-white/80 font-[family-name:var(--font-quicksand)] leading-[1.8]">
               Una vez que haya vendido su casa, es libre de dar el siguiente paso en su viaje. Ya sea mudarse a una nueva ciudad, mudarse a una casa más grande o reducir el tamaño y disfrutar de su vida como nidos vacíos, saber que todas sus responsabilidades de venta han sido atendidas le ayudará a lograr paz mental para su nuevo camino.
            </p>
         </div>
      </section>


      {/* 5. FORMULARIO DE VALORACIÓN (WHAT'S YOUR PROPERTY WORTH) */}
      <ValuationForm tenantId={tenantData.id} />

      {/* 6. BOTONES DE ACCIÓN (4 BLOQUES IMÁGENES) */}
      <section className="w-full flex flex-col md:flex-row h-auto md:h-[400px]">
         {actionButtons.map((btn, i) => (
           <Link href={btn.link} key={i} className="group relative w-full md:w-1/4 h-[250px] md:h-full overflow-hidden block">
             <div className="absolute inset-0 bg-black z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
             <img src={btn.img} alt={btn.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 z-20 flex items-center justify-center p-6 text-center">
               <h3 className="text-white text-[16px] md:text-[20px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.2em] group-hover:-translate-y-2 transition-transform duration-300">
                 {btn.title}
               </h3>
             </div>
           </Link>
         ))}
      </section>

      {/* 7. CIERRE / CTA FILOSOFÍA */}
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
           className="inline-block px-12 py-5 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-black dark:text-white border border-black dark:border-white/20 transition-colors"
         >
           CONECTÉMONOS
         </a>
      </section>

      {/* 8. FOOTER */}
      <Footer 
         tenantName={tenantData.name} 
         domain={tenantData.domain}
         facebookUrl={settings.socialFacebook}
         instagramUrl={settings.socialInstagram}
         tiktokUrl={settings.socialTiktok}
         youtubeUrl={settings.socialYoutube}
         footerText={settings.footerText}
         agentPhoto={settings.agentPhoto}
         agentTitle={settings.agentTitle}
         contactEmail={settings.contactEmail}
         contactPhone={settings.contactPhone}
         officeAddress={settings.officeAddress}
         disclaimerText={settings.disclaimerText}
      />
    </main>
  );
}
