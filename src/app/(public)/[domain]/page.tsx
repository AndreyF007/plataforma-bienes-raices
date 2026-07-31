export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import TestimonialSlider from '@/components/ui/TestimonialSlider';
import Footer from '@/components/ui/Footer';
import NewsletterForm from '@/components/public/NewsletterForm';
import ValuationForm from '@/components/public/ValuationForm';
import HeroCarousel from '@/components/public/HeroCarousel';
import FeaturedProperties from '@/components/public/FeaturedProperties';
import { allProperties } from '@/data/mockProperties';
import { Play, Mail, Phone } from 'lucide-react';
import SchemaMarkup from '@/components/ui/SchemaMarkup';

export default async function TenantHomePage(props: { params: Promise<{ domain: string }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
    include: {
      stats: true,
      properties: true,
      zones: true,
    }
  });
  
  if (!tenantData) return notFound();

  // Parsing site settings
  let settings: any = {};
  try {
    settings = JSON.parse(tenantData.siteSettings || "{}");
  } catch(e) {}

  const dbProps = tenantData.properties.map((p) => {
    let imgs = [];
    try {
      try {
        imgs = JSON.parse(p.images);
      } catch (e) {}
    } catch(e) {}
    
    return {
      id: `db-${p.id}`,
      title: p.title,
      price: parseInt(p.price.replace(/\D/g,'')) || 0,
      priceStr: p.price,
      type: p.propertyType,
      address: p.location,
      beds: p.beds,
      baths: p.baths,
      constructionArea: p.constructionArea,
      lotArea: p.lotArea,
      yearBuilt: p.yearBuilt,
      floors: p.floors,
      img: imgs[0] || "",
      images: imgs.length > 0 ? imgs : [""],
      status: p.status,
      description: p.description || ""
    };
  });

  const combinedProperties = dbProps; // Exclusivo del inquilino

  const heroSubtitle = settings.heroSubtitle || "AGENTE INMOBILIARIO DE LUJO";
  const heroText = settings.heroText || "El mercado inmobiliario de lujo se mueve rápido. Necesitas un guía que conozca cada barrio, gane las negociaciones y haga el proceso sin esfuerzo.";
  const heroButton1Text = settings.heroButton1Text || "BUSCAR PROPIEDADES";
  const heroButton1Link = settings.heroButton1Link || "/portal";
  const heroButton2Text = settings.heroButton2Text || "HABLEMOS";
  const heroButton2Link = settings.heroButton2Link || `mailto:${settings.contactEmail || 'info@example.com'}`;

  const aboutTitle = settings.aboutTitle || "TU GUÍA";
  const aboutSubtitle = settings.aboutSubtitle || tenantData.name;
  const aboutImage = settings.agentPhoto || settings.aboutImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1920&q=80";
  const aboutText1 = settings.aboutText1 || "Comprar o vender una casa de lujo en Silicon Valley es una de las decisiones más importantes que tomarás, y un agente inmobiliario inadecuado puede costarte cientos de miles de dólares.";
  const aboutText2 = settings.aboutText2 || "Cuenta con más de 15 años de experiencia en el sector inmobiliario, una trayectoria y un historial de ventas excepcional. Se especializa en las comunidades más codiciadas.";
  const aboutText3 = settings.aboutText3 || "Su método es sencillo: escuchar lo que realmente quieres, brindarte información honesta del mercado y negociar sin descanso en tu nombre. Sin presiones, sin rodeos, solo resultados.";
  const aboutButton1Text = settings.aboutButton1Text || "VER PROPIEDADES";
  const aboutButton2Text = settings.aboutButton2Text || "CONSULTA AHORA";

  const statsSectionSubtitle = settings.statsSectionSubtitle || "LOGROS Y RECONOCIMIENTOS";
  const statsSectionTitle = settings.statsSectionTitle || `¿POR QUÉ LOS CLIENTES CONFÍAN EN ${tenantData.name.split(' ')[0].toUpperCase()}?`;

  const newsletterTitle = settings.newsletterTitle || "MERCADO EXCLUSIVO";
  const newsletterText = settings.newsletterText || "Únase a nuestra lista VIP y reciba acceso anticipado a propiedades fuera del mercado y análisis profundo del sector de lujo.";

  return (
    <>
      <SchemaMarkup tenantName={tenantData.name} domain={decodedDomain} settings={settings} />
      <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      
      {/* 1. Navbar de Pantalla Completa */}
      <Navbar tenantName={tenantData.name} contactPhone={settings.contactPhone} contactEmail={settings.contactEmail} />

      {/* 2. Botones Flotantes Permanentes */}
      <FloatingContact contactEmail={settings.contactEmail} contactPhone={settings.contactPhone} />

      {/* 3. HERO CAROUSEL */}
      <HeroCarousel 
        images={[
          settings.agentPhoto || tenantData.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
          tenantData.heroImage || "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1920&q=80"
        ]}
        subtitle={heroSubtitle}
        title={tenantData.heroTitle || tenantData.name}
        text={heroText}
        button1Text={heroButton1Text}
        button1Link={heroButton1Link}
        button2Text={heroButton2Text}
        button2Link={heroButton2Link}
      />

      {/* 3.5 CARRUSEL DE PROPIEDADES DESTACADAS */}
      <FeaturedProperties properties={combinedProperties} />

      {/* 4. CONFIANZA / STATS SECTION */}
      {(() => {
        let statsList = settings.statsList || tenantData.stats || [];
        if (!statsList || statsList.length === 0) {
          statsList = [
            { id: '1', value: '15+', label: 'Años de Experiencia' },
            { id: '2', value: '500+', label: 'Propiedades Vendidas' },
            { id: '3', value: '$100M+', label: 'Volumen de Ventas' },
            { id: '4', value: '100%', label: 'Clientes Satisfechos' }
          ];
        }
        
        return (
          <section className="bg-white dark:bg-black transition-colors duration-300 py-[80px] md:py-[120px] px-6">
            <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
               <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] font-light tracking-[0.25em] text-black dark:text-white uppercase mb-[60px]">
                 {statsSectionSubtitle}
               </p>

               <h2 className="text-[36px] md:text-[48px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black dark:text-white leading-tight mb-[40px]">
                 {statsSectionTitle}
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-[60px]">
                 {statsList.map((stat: any, idx: number) => (
                   <div key={stat.id || idx} className="flex flex-col items-center">
                     <span className="text-[40px] md:text-[50px] font-[family-name:var(--font-raleway)] font-light text-black dark:text-white tracking-widest mb-2">
                       {stat.value}
                     </span>
                     <span className="text-[12px] md:text-[14px] text-black dark:text-white font-[family-name:var(--font-quicksand)] uppercase tracking-wider font-bold">
                       {stat.label}
                     </span>
                   </div>
                 ))}
               </div>
            </div>
          </section>
        );
      })()}

      {/* 5. TU GUÍA (ABOUT) SECTION */}
      <section id="about" className="bg-white dark:bg-black transition-colors duration-300 py-[80px] md:py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Image Column */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end lg:justify-center">
             <div className="w-full max-w-[450px] aspect-[4/5] max-h-[550px] relative bg-gray-100 dark:bg-neutral-900 hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-500 cursor-pointer overflow-hidden shadow-xl">
               <img src={aboutImage} alt="Sobre Nosotros" className="absolute inset-0 w-full h-full object-cover" />
             </div>
          </div>
          
          {/* Text Column */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
             <h3 className="text-[14px] md:text-[16px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] mb-[20px] text-black dark:text-white">
               {aboutTitle}
             </h3>
             <h2 className="text-[36px] md:text-[48px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] mb-[40px] leading-tight dark:text-white">
               {aboutSubtitle.toUpperCase()}<sup className="text-xl">®</sup>
             </h2>
             
             {aboutText1 && (
               <p className="text-[15px] md:text-[17px] text-black dark:text-white font-[family-name:var(--font-quicksand)] leading-[1.8] mb-[20px]">
                 {aboutText1}
               </p>
             )}
             {aboutText2 && (
               <p className="text-[15px] md:text-[17px] text-black dark:text-white font-[family-name:var(--font-quicksand)] leading-[1.8] mb-[20px]">
                 {aboutText2}
               </p>
             )}
             {aboutText3 && (
               <p className="text-[15px] md:text-[17px] text-black dark:text-white font-[family-name:var(--font-quicksand)] leading-[1.8] mb-[50px]">
                 {aboutText3}
               </p>
             )}


          </div>
        </div>
      </section>

      {/* 5.5 ZONAS DE COBERTURA */}
      {(() => {
        const PROVINCE_LIST = [
          { id: 'prov-sj', name: 'San José', defaultImg: '/images/zone-escazu.png', keywords: ['San José', 'Escazú', 'Santa Ana', 'Curridabat', 'Desamparados', 'Pérez Zeledón'] },
          { id: 'prov-gua', name: 'Guanacaste', defaultImg: '/images/zone-guanacaste.png', keywords: ['Guanacaste', 'Tamarindo', 'Liberia', 'Nicoya', 'Santa Cruz', 'Papagayo', 'Carrillo', 'Nosara'] },
          { id: 'prov-pnt', name: 'Puntarenas', defaultImg: '/images/zone-manuel.png', keywords: ['Puntarenas', 'Manuel Antonio', 'Jacó', 'Garabito', 'Monteverde', 'Quepos', 'Osa', 'Golfito'] },
          { id: 'prov-lim', name: 'Limón', defaultImg: '/images/zone-nosara.png', keywords: ['Limón', 'Puerto Viejo', 'Cahuita', 'Talamanca', 'Tortuguero', 'Siquirres', 'Pococí', 'Guácimo', 'Matina'] },
          { id: 'prov-ala', name: 'Alajuela', defaultImg: '/images/property-1.png', keywords: ['Alajuela', 'San Carlos', 'La Fortuna', 'Grecia', 'San Ramón', 'Atenas', 'Poás'] },
          { id: 'prov-her', name: 'Heredia', defaultImg: '/images/property-2.png', keywords: ['Heredia', 'Belén', 'Santo Domingo', 'Barva', 'San Rafael', 'Sarapiquí', 'Santa Bárbara'] },
          { id: 'prov-car', name: 'Cartago', defaultImg: '/images/property-3.png', keywords: ['Cartago', 'Tres Ríos', 'La Unión', 'Paraíso', 'Turrialba', 'Irazú', 'Oreamuno'] }
        ];

        const allZones = (tenantData.zones || []) as { name?: string, image?: string | null, coverImage?: string | null }[];

        const provinceCards = PROVINCE_LIST.map(prov => {
          const matchingZone = allZones.find(z => 
            z.name && prov.keywords.some(kw => z.name?.toLowerCase() === kw.toLowerCase()) &&
            (z.image || z.coverImage) && !((z.image || z.coverImage)?.includes('unsplash')) && !((z.image || z.coverImage)?.includes('wikimedia'))
          );
          const displayImg = matchingZone ? (matchingZone.image || matchingZone.coverImage) : prov.defaultImg;
          
          return {
            id: prov.id,
            name: prov.name,
            image: displayImg || prov.defaultImg
          };
        });

        return (
          <section className="bg-[#fcfcfc] dark:bg-neutral-900 py-[80px] md:py-[120px] px-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black dark:text-white">
                  Zonas de Cobertura
                </h2>
                <div className="w-12 h-px bg-black dark:bg-white mx-auto mt-6"></div>
              </div>
              
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {provinceCards.map((zone) => (
                  <a 
                    key={zone.id} 
                    href={`/comunidades?zona=${encodeURIComponent(zone.name)}`}
                    className="min-w-[85vw] md:min-w-0 shrink-0 snap-center group relative w-full aspect-[4/3] overflow-hidden bg-black cursor-pointer block hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-500"
                  >
                    <img 
                      src={zone.image} 
                      alt={zone.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h3 className="text-white text-[16px] md:text-[20px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] drop-shadow-md">
                        {zone.name}
                      </h3>
                    </div>
                  </a>
                ))}
                <style dangerouslySetInnerHTML={{__html: `
                  .hide-scrollbar::-webkit-scrollbar { display: none; }
                `}} />
              </div>
            </div>
          </section>
        );
      })()}

      {/* 6. TESTIMONIOS */}
      <TestimonialSlider tenantName={tenantData.name} />

      {/* 7. VALORACIÓN DE VIVIENDA */}
      <ValuationForm tenantId={tenantData.id} bgImage={settings.agentPhoto || tenantData.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"} />

      {/* 8. SUSCRIPCIÓN (NEWSLETTER) */}
      <section className="bg-black py-[100px] px-6 text-center">
        <div className="max-w-[800px] mx-auto text-white">
          <Mail className="w-12 h-12 mx-auto mb-8 opacity-80" />
          <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] mb-6">
            {newsletterTitle}
          </h2>
          <p className="text-[16px] font-[family-name:var(--font-quicksand)] text-white mb-10 leading-[1.8]">
            {newsletterText}
          </p>
          <NewsletterForm tenantName={tenantData.name} />
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer 
         tenantName={tenantData.name} 
         facebookUrl={settings.facebookUrl}
         instagramUrl={settings.instagramUrl}
         tiktokUrl={settings.tiktokUrl}
         youtubeUrl={settings.youtubeUrl}
         footerText={settings.footerText}
         agentPhoto={settings.agentPhoto}
         agentTitle={settings.agentTitle}
         contactEmail={settings.contactEmail}
         contactPhone={settings.contactPhone}
         officeAddress={settings.officeAddress}
         disclaimerText={settings.disclaimerText}
      />

    </main>
    </>
  );
}
