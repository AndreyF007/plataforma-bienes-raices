import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import TestimonialSlider from '@/components/ui/TestimonialSlider';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';

export default async function BuyersGuidePage(props: { params: Promise<{ domain: string }> }) {
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

  const DEFAULT_STEPS = [
    {
      num: "1",
      title: "INVESTIGUE",
      desc: "¿Ya sabe dónde quiere comprar? ¿Si quiere un condominio, una casa adosada o una casa unifamiliar? ¿Qué características le gustan y cuáles no? ¿Qué hay disponible en el mercado ahora? Si respondió que no a alguna de estas preguntas, ahora es el momento de comenzar a investigar. Además de buscar casas que le interesen, tome nota de cualquier cambio en los precios de venta. Esto podría brindarle información valiosa sobre las tendencias de vivienda en vecindarios específicos y ayudarlo cuando llegue el momento de hacer una oferta.",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "2",
      title: "DECIDA SU PRESUPUESTO",
      desc: "Observe que dije que decida su presupuesto, no determine cuánto le dará la compañía hipotecaria. En muchos casos, una compañía hipotecaria lo preaprobará por más de lo que se siente cómodo gastando, por lo que debe determinar el pago mensual con el que se siente cómodo antes de hablar con un prestamista. Esto probablemente incluye hacer un presupuesto completo del hogar y tener en cuenta qué cambios además del pago de una hipoteca ocurrirán una vez que se mude a su nuevo hogar. Si ha vivido en un apartamento o con compañeros de cuarto, es posible que pase por alto nuevos gastos como basura, agua o tarifas de HOA que podrían arruinar fácilmente su presupuesto.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "3",
      title: "OBTENGA UNA PRECALIFICACIÓN",
      desc: "El hecho de que crea que puede pagar un cierto pago cada mes no significa que la compañía hipotecaria esté de acuerdo. Así como pueden aprobarlo por una cantidad demasiado grande, también pueden aprobarlo por una cantidad menor o negarle una hipoteca por completo. La falta de tiempo en un trabajo, crédito insuficiente, quiebras pasadas u otros problemas financieros pueden causar problemas importantes al tratar de asegurar una hipoteca. Antes de fijarse en una casa, hable con un profesional hipotecario para averiguar para qué cantidad puede calificar. Esto también será una ventaja cuando haga una oferta por una casa, ya que algunos vendedores no considerarán las ofertas de aquellos que no están precalificados para un préstamo.",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "4",
      title: "ELIJA UN AGENTE INMOBILIARIO",
      desc: "¿Puede buscar, ver y, en última instancia, hacer una oferta por una casa sin un agente inmobiliario? Técnicamente sí, pero ¿por qué lo haría cuando no le cuesta nada a un agente como yo quitarle gran parte del estrés de los hombros? No solo lo ayudaré a identificar propiedades en las que podría estar interesado, organizar visitas y, en última instancia, manejar el proceso de oferta, sino que también tengo un conocimiento del mercado que usted no posee. Es posible que pueda alejarlo de ciertas casas o vecindarios, sugerir gemas ocultas o darle consejos que lo ayudarán a encontrar la casa de sus sueños por el precio correcto. Mi objetivo es brindarle el servicio más personalizado diseñado para ayudarlo a comprar la casa de sus sueños.",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "5",
      title: "ENCUENTRE LA CASA ADECUADA",
      desc: "Este debería ser el paso más agradable de todo el proceso (¡además de mudarse!). Organizaré exhibiciones de las casas que le interesan y que se ajusten a su presupuesto. Tome notas sobre lo que le gusta y lo que no, y asegúrese de prestar atención a los detalles. Encienda y apague los interruptores de luz, abra y cierre las puertas y deje correr los grifos en varias habitaciones. No limite su inspección a la casa en sí. Asegúrese de tomarse el tiempo para explorar el vecindario y estar atento al tráfico en ciertos momentos del día, la situación del estacionamiento y lo cerca que está de las necesidades como escuelas y supermercados.",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "6",
      title: "HAGA UNA OFERTA",
      desc: "Una vez que haya seleccionado la casa perfecta, trabaje con su agente para elaborar una oferta justa basada en el valor de viviendas comparables en el mercado. Dependiendo del precio de venta de la casa y de si el entorno actual es un mercado de compradores o vendedores, su oferta puede estar por debajo, al mismo nivel o incluso por encima del precio de venta. Podré ayudarlo a negociar si recibe una contraoferta y llega a un acuerdo. En este punto, la casa entrará en plica (escrow).",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "7",
      title: "HAGA INSPECCIONAR LA CASA",
      desc: "En la mayoría de los casos, su oferta estará condicionada a la inspección de la casa para asegurarse de que no haya daños estructurales importantes ni grandes reparaciones necesarias. Puedo ayudarlo a organizarlo y puede programarlo a los pocos días de hacer una oferta. Si no hay problemas importantes, el proceso pasa al paso ocho. Si los hay, puede renegociar su oferta en función de lo que deba arreglarse, o puede retirarla.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "8",
      title: "SELECCIONE SU PRÉSTAMO",
      desc: "Ahora es el momento de volver al prestamista hipotecario que lo preaprobó o precalificó y elegir su hipoteca. Se le presentarán varias opciones en función de su situación financiera única, incluidas tasas fijas, tasas variables, a 15 años, a 30 años o programas especiales. Trabaje con su prestamista hipotecario para seleccionar la opción con la que se sienta más cómodo.",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "9",
      title: "OBTENGA UNA TASACIÓN",
      desc: "Su prestamista hará que tasen su nueva casa para tener su valor independiente de ella. La tasación es para asegurar que todas las partes involucradas están pagando un precio justo por la casa.",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "10",
      title: "TERMINE EL PAPELEO",
      desc: "Nadie espera con ansias todo el papeleo involucrado en la compra de una casa, pero es una parte necesaria del proceso. Afortunadamente, todo será organizado por su prestamista y la compañía de títulos y, cuando haya terminado, sabrá que es el propietario legal de su nuevo hogar.",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const steps = settings.buyerGuide && settings.buyerGuide.length > 0 ? settings.buyerGuide : DEFAULT_STEPS;

  const actionButtons = [
    { title: "ZONAS DE COBERTURA", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", link: "/comunidades" },
    { title: "TESTIMONIOS", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", link: "/#testimonios" },
    { title: "PORTAL DE PROPIEDADES", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80", link: "/portal" },
    { title: `CONTACTAR A ${tenantData.name.split(' ')[0].toUpperCase()}`, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", link: `mailto:${settings.contactEmail || 'info@example.com'}` }
  ];

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      
      <Navbar tenantName={tenantData.name} contactPhone={settings?.contactPhone} contactEmail={settings?.contactEmail} />
      <FloatingContact contactEmail={settings.contactEmail} contactPhone={settings.contactPhone} />

      {/* 1. HERO SECTION */}
      <section className="group relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed opacity-60 animate-slow-zoom"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1920&q=80')` }}
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10 max-w-[900px]">
          <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] text-white uppercase tracking-[0.2em] mb-4">
            COMPRADORES | {tenantData.name.toUpperCase()}
          </p>
          <h1 className="text-[36px] md:text-[60px] font-[family-name:var(--font-raleway)] font-light text-white tracking-[0.2em] uppercase mb-8 leading-tight">
            TRABAJANDO CON COMPRADORES
          </h1>
          <p className="text-[18px] md:text-[24px] text-white font-[family-name:var(--font-quicksand)] leading-[1.6]">
            Permítanos encontrar la casa de sus sueños. ¡Estoy emocionada de ayudarle!
          </p>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section className="bg-white dark:bg-neutral-950 py-[80px] md:py-[120px] px-6 text-center flex flex-col items-center">
         <h2 className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] font-medium uppercase tracking-[0.2em] text-black dark:text-white mb-4">
           PASO A PASO
         </h2>
         <h3 className="text-[32px] md:text-[48px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black dark:text-white leading-tight mb-[40px]">
           GUÍA DEL COMPRADOR
         </h3>
         <p className="text-[16px] md:text-[18px] text-black dark:text-white font-[family-name:var(--font-quicksand)] leading-[1.8] max-w-[800px] mb-[60px]">
           Comprar una casa es uno de los hitos más emocionantes de su vida. Para prepararse para este momento, debe saber qué esperar durante el proceso. Esta guía paso a paso para compradores primerizos creada por su agente lo ayudará a reducir el estrés de comprar una casa y lo ayudará a disfrutar el viaje tanto como sea posible.
         </p>
      </section>

      {/* 3. LOS 10 PASOS (Alternando Izquierda/Derecha) */}
      <section className="bg-white dark:bg-neutral-950 w-full">
         {steps.map((step: any, idx: number) => (
            <div key={idx} className={`group w-full max-w-[1400px] mx-auto flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-[50vh]`}>
               
               {/* Imagen */}
               <div className="w-full md:w-1/2 p-6 md:p-12 flex items-stretch">
                 <div className="w-full h-[400px] md:h-full min-h-[300px] bg-black relative overflow-hidden shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
                   <img src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                 </div>
               </div>

               {/* Texto */}
               <div className="w-full md:w-1/2 p-6 md:p-12 flex items-stretch">
                 <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#fafafa] dark:bg-neutral-900 shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-500">
                    <h3 className="text-[24px] md:text-[32px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.15em] text-black dark:text-white mb-6 leading-tight">
                      PASO {step.num}: {step.title}
                    </h3>
                    <p className="text-[16px] text-black dark:text-white font-[family-name:var(--font-quicksand)] leading-[1.8]">
                      {step.desc}
                    </p>
                 </div>
               </div>

            </div>
         ))}
         
         <div className="py-24 px-6 text-center max-w-[800px] mx-auto">
            <h3 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.15em] text-black dark:text-white mb-8 leading-tight">
               ¡FELICIDADES!
            </h3>
            <p className="text-[16px] md:text-[18px] text-black dark:text-white font-[family-name:var(--font-quicksand)] leading-[1.8] mb-12">
               Después de firmar el papeleo final para completar la compra, ahora es el propietario de una casa nueva. Puede tomar unos días para que se financie su préstamo una vez que el papeleo haya sido devuelto al prestamista, pero una vez que ese cheque se entregue al vendedor, estará todo listo para mudarse a la casa de sus sueños.
            </p>
         </div>
      </section>


      {/* 5. BOTONES DE ACCIÓN (4 BLOQUES IMÁGENES) */}
      <section className="w-full flex flex-col md:flex-row h-auto md:h-[400px]">
         {actionButtons.map((btn, i) => (
           <Link href={btn.link} key={i} className="group relative w-full md:w-1/4 h-[250px] md:h-full overflow-hidden block hover:-translate-y-2 hover:scale-[1.02] hover:z-10 transition-transform duration-500 shadow-xl">
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

      {/* 6. CIERRE / CTA FILOSOFÍA */}
      <section className="bg-white dark:bg-neutral-950 py-[100px] px-6 text-center flex flex-col items-center">
         <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] text-black dark:text-white mb-8 max-w-[800px] leading-tight">
           "La filosofía de {tenantData.name} es simple: los clientes son lo primero."
         </h2>
         <p className="text-[16px] md:text-[18px] text-black dark:text-white font-[family-name:var(--font-quicksand)] leading-[1.8] max-w-[800px] mb-[40px]">
           Se compromete a estar en constante comunicación con sus clientes, manteniéndolos completamente informados durante todo el proceso de compra o venta.
         </p>

      </section>

      {/* 7. FOOTER */}
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
