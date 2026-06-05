import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import TestimonialSlider from '@/components/ui/TestimonialSlider';
import Footer from '@/components/ui/Footer';
import NewsletterForm from '@/components/public/NewsletterForm';
import ValuationForm from '@/components/public/ValuationForm';
import HeroCarousel from '@/components/public/HeroCarousel';
import { Play, Mail, Phone } from 'lucide-react';

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

  const heroSubtitle = settings.heroSubtitle || "LUXURY REAL ESTATE AGENT";
  const heroText = settings.heroText || "Silicon Valley's luxury market moves fast. You need a guide who knows every neighborhood, wins negotiations, and makes the process effortless.";
  const heroButton1Text = settings.heroButton1Text || "SEARCH ALL HOMES";
  const heroButton1Link = settings.heroButton1Link || "/portal";
  const heroButton2Text = settings.heroButton2Text || "LET'S CONNECT";
  const heroButton2Link = settings.heroButton2Link || `mailto:${settings.contactEmail || 'info@example.com'}`;

  const aboutTitle = settings.aboutTitle || "TU GUÍA";
  const aboutSubtitle = settings.aboutSubtitle || tenantData.name;
  const aboutImage = settings.aboutImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1920&q=80";
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
    <main className="w-full flex flex-col min-h-screen bg-white text-black font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      
      {/* 1. Navbar de Pantalla Completa */}
      <Navbar tenantName={tenantData.name} />

      {/* 2. Botones Flotantes Permanentes */}
      <FloatingContact />

      {/* 3. HERO CAROUSEL */}
      <HeroCarousel 
        images={[
          tenantData.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1920&q=80"
        ]}
        subtitle={heroSubtitle}
        title={tenantData.heroTitle || tenantData.name}
        text={heroText}
        button1Text={heroButton1Text}
        button1Link={heroButton1Link}
        button2Text={heroButton2Text}
        button2Link={heroButton2Link}
      />

      {/* 4. CONFIANZA / STATS SECTION */}
      {tenantData.stats && tenantData.stats.length > 0 && (
        <section className="bg-white py-[80px] md:py-[120px] px-6">
          <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
             <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] font-light tracking-[0.25em] text-black uppercase mb-[60px]">
               {statsSectionSubtitle}
             </p>

             <h2 className="text-[36px] md:text-[48px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black leading-tight mb-[40px]">
               {statsSectionTitle}
             </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-[60px]">
               {tenantData.stats.map(stat => (
                 <div key={stat.id} className="flex flex-col items-center">
                   <span className="text-[40px] md:text-[50px] font-[family-name:var(--font-raleway)] font-light text-black tracking-widest mb-2">
                     {stat.value}
                   </span>
                   <span className="text-[12px] md:text-[14px] text-black/60 font-[family-name:var(--font-quicksand)] uppercase tracking-wider font-bold">
                     {stat.label}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* 5. TU GUÍA (ABOUT) SECTION */}
      <section id="about" className="bg-white py-[40px] px-0 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div 
             className="w-full aspect-[4/3] md:aspect-[21/9] mb-[40px] bg-fixed bg-cover bg-center"
             style={{ backgroundImage: `url(${aboutImage})` }}
          />
          
          <div className="px-6 md:px-0 text-center max-w-[800px] mx-auto">
             <h3 className="text-[18px] md:text-[22px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] mb-[30px] text-left md:text-center">
               {aboutTitle}
             </h3>
             <h2 className="text-[40px] md:text-[60px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] mb-[40px] text-left md:text-center">
               {aboutSubtitle.toUpperCase()}<sup className="text-xl">®</sup>
             </h2>
             
             {aboutText1 && (
               <p className="text-[16px] text-black/80 leading-[1.8] text-left md:text-center mb-[40px]">
                 {aboutText1}
               </p>
             )}
             {aboutText2 && (
               <p className="text-[16px] text-black/80 leading-[1.8] text-left md:text-center mb-[40px]">
                 {aboutText2}
               </p>
             )}
             {aboutText3 && (
               <p className="text-[16px] text-black/80 leading-[1.8] text-left md:text-center mb-[60px]">
                 {aboutText3}
               </p>
             )}

             <div className="flex flex-col gap-4 w-full">
               <a href="/portal" className="w-full py-5 border border-black text-[12px] text-black uppercase tracking-[0.2em] font-medium hover:bg-black hover:text-white transition-colors block text-center">
                 {aboutButton1Text}
               </a>
               <a href={`mailto:${settings.contactEmail || 'info@example.com'}`} className="w-full py-5 border border-black bg-black text-[12px] text-white uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-black transition-colors block text-center">
                 {aboutButton2Text}
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIOS */}
      <section id="testimonios" className="bg-[#f4f4f4] py-[80px] md:py-[100px]">
        <div className="max-w-[1200px] mx-auto text-center px-6">
          <p className="text-[14px] md:text-[18px] font-[family-name:var(--font-raleway)] font-light tracking-[0.25em] text-black uppercase mb-10">
            LO QUE DICEN NUESTROS CLIENTES
          </p>
          <TestimonialSlider tenantName={tenantData.name} />
        </div>
      </section>

      {/* 7. VALORACIÓN DE VIVIENDA */}
      <ValuationForm tenantId={tenantData.id} />

      {/* 8. SUSCRIPCIÓN (NEWSLETTER) */}
      <section className="bg-black py-[100px] px-6 text-center">
        <div className="max-w-[800px] mx-auto text-white">
          <Mail className="w-12 h-12 mx-auto mb-8 opacity-80" />
          <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] mb-6">
            {newsletterTitle}
          </h2>
          <p className="text-[16px] font-[family-name:var(--font-quicksand)] text-white/80 mb-10 leading-[1.8]">
            {newsletterText}
          </p>
          <NewsletterForm tenantId={tenantData.id} />
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer 
         tenantName={tenantData.name} 
         facebookUrl={settings.socialFacebook}
         instagramUrl={settings.socialInstagram}
         linkedinUrl={settings.socialLinkedIn}
         youtubeUrl={settings.socialYoutube}
         footerText={settings.footerText}
      />

    </main>
  );
}
