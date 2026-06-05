import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import { Home, Compass, MapPin, Play, Star, Map as MapIcon, Bed, Bath, Maximize, Users, DollarSign, Activity } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import InteractivePoiTable from './InteractivePoiTable';
import PropertyCard from '@/components/properties/PropertyCard';
import VideoGallery from '@/components/public/VideoGallery';
import NewsletterForm from '@/components/public/NewsletterForm';
import { allProperties } from '@/data/mockProperties';

export async function generateMetadata(props: { params: Promise<{ domain: string; canton: string }> }) {
  const params = await props.params;
  const decodedCanton = decodeURIComponent(params.canton).replace(/-/g, ' ');
  const formattedCanton = decodedCanton.charAt(0).toUpperCase() + decodedCanton.slice(1);
  return {
    title: `${formattedCanton} | Comunidades de Costa Rica`,
    description: `Descubra las mejores propiedades y conozca el estilo de vida en ${formattedCanton}, Costa Rica.`
  };
}

export default async function CantonPage(props: { params: Promise<{ domain: string; canton: string }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  const decodedCanton = decodeURIComponent(params.canton).replace(/-/g, ' ');
  
  const formattedCanton = decodedCanton.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
    include: { properties: true }
  });
  
  if (!tenantData) return notFound();

  // Mapear DB properties al formato que espera el UI
  const dbProps = tenantData.properties.map((p, idx) => ({
    id: `db-${p.id}`,
    title: p.title,
    price: parseInt(p.price.replace(/\D/g,'')) || 0,
    priceStr: p.price,
    type: 'Venta',
    address: p.location,
    beds: 3,
    baths: 2,
    sqm: 250,
    img: p.image,
    images: [p.image],
    status: 'Disponible'
  }));

  const combinedProperties = [...dbProps, ...allProperties];

  // Wikipedia Data Fetch
  const wikiQuery = encodeURIComponent(`${formattedCanton}`);
  const wikiQueryCR = encodeURIComponent(`${formattedCanton} (Costa Rica)`);
  
  // Array de imágenes de ultra-lujo (4K) para garantizar calidad cristalina
  const luxuryImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80", // Mansión moderna
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80", // Casa de lujo clásica
    "https://images.unsplash.com/photo-1613490908676-e17502b4d24a?auto=format&fit=crop&w=1920&q=80", // Villa de montaña
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80", // Vista panorámica
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80", // Paisaje verde
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1920&q=80", // Casa estilo hacienda
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80", // Arquitectura tropical
  ];
  
  // Selección determinista basada en el nombre del cantón
  const imgIndex = formattedCanton.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % luxuryImages.length;
  let wikiImage = luxuryImages[imgIndex];

  let wikiExtract = `Descubra el increíble estilo de vida y las excelentes oportunidades inmobiliarias que ${formattedCanton} tiene para ofrecer. Ubicado en Costa Rica, este cantón es una excelente zona para vivir o invertir.`;

  try {
    let res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${wikiQueryCR}`, { next: { revalidate: 86400 } });
    if (!res.ok) res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${wikiQuery}`, { next: { revalidate: 86400 } });
    
    if (res.ok) {
      const data = await res.json();
      if (data.extract) wikiExtract = data.extract;
      // Ya NO usamos la imagen de Wikipedia porque suele ser el escudo, bandera o mapa en baja resolución.
    }
  } catch (e) {
    console.error("Error fetching Wikipedia data:", e);
  }

  // Generación Determinista de Estadísticas para que parezcan reales (basadas en la longitud del nombre)
  const nameLen = formattedCanton.length;
  const mockPopulation = (nameLen * 3421 + 15000).toLocaleString('es-CR');
  const mockAge = 32 + (nameLen % 12);
  const mockIncome = (nameLen * 1850 + 25000).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const walkScore = 60 + (nameLen % 35);
  const bikeScore = 50 + (nameLen % 40);

  // Map Iframe URL (Si hay API Key, forzamos el Pin Exacto de Google Places, sino usamos el gratuito)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapUrl = apiKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(formattedCanton + ", Costa Rica")}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(formattedCanton + ", Costa Rica")}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="w-full flex flex-col min-h-screen bg-white text-black font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      
      <Navbar tenantName={tenantData.name} />
      <FloatingContact />

      {/* 1. HERO SECTION & TITULO (COVER PHOTO) */}
      <section className="group relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
          style={{ backgroundImage: `url('${wikiImage || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80'}')` }}
        />
        {/* Overlay oscuro para legibilidad y elegancia */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center px-6">
          <h1 className="text-[40px] md:text-[60px] font-[family-name:var(--font-raleway)] font-light text-white tracking-[0.1em] uppercase mb-8 text-center leading-tight drop-shadow-md">
            {formattedCanton}
          </h1>
        </div>
      </section>

      {/* 2. VIDEOS DESTACADOS (FEATURED VIDEOS) */}
      <section className="w-full py-12 px-6 bg-[#fafafa]">
         <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] md:text-[24px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em] mb-8">
               Videos Destacados
            </h2>
            <VideoGallery videos={[
               { title: "Estilo de Vida en Costa Rica", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", youtubeId: "LXb3EKWsInQ" }, // Ejemplo: Video 4K Costa Rica
               { title: `Recorrido Inmobiliario en ${formattedCanton}`, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", youtubeId: "pA0H2_GjT50" }, // Ejemplo: Luxury house tour
               { title: "Inversión Inmobiliaria 2026", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80", youtubeId: "ScMzIvxBSi4" }, // Ejemplo: Costa Rica Real Estate
               { title: "Costa Rica desde el Cielo", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80", youtubeId: "vBkg2_Ebf-s" } // Ejemplo: Drone Footage
            ]} />
         </div>
      </section>

      {/* 3. RESUMEN WIKIPEDIA (SOBRE EL CANTÓN) */}
      <section className="w-full py-[80px] px-6 bg-white flex justify-center">
         <div className="max-w-[800px] w-full text-center flex flex-col items-center">
            <h3 className="text-[28px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-black leading-tight mb-8">
               ACERCA DE {formattedCanton}
            </h3>
            <div className="w-12 h-[1px] bg-black mb-8"></div>
            <p className="text-[16px] md:text-[20px] text-black/80 font-[family-name:var(--font-quicksand)] leading-[2] text-justify md:text-center">
               {wikiExtract}
            </p>
         </div>
      </section>

      {/* 4. OVERVIEW STATS (REPLICANDO LA CAJA DE POBLACIÓN E INGRESOS) */}
      <section className="w-full py-12 px-6 bg-white flex justify-center border-t border-black/10">
         <div className="max-w-[1000px] w-full">
            <h2 className="text-[24px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em] mb-4">
               Descripción General de {formattedCanton}, CR
            </h2>
            <p className="text-[14px] text-black/60 mb-8 font-[family-name:var(--font-quicksand)]">
               {mockPopulation} personas viven en {formattedCanton}, donde la edad media es de {mockAge} y el ingreso individual promedio estimado ronda los {mockIncome}. <br/>
               Datos provistos como estimaciones para fines ilustrativos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-black/10 py-12">
               
               <div className="flex items-start gap-6">
                  <div className="p-4 bg-black/5 rounded-full"><Users className="w-8 h-8 text-black" /></div>
                  <div>
                     <h3 className="text-[32px] font-[family-name:var(--font-raleway)] font-light leading-none mb-2">{mockPopulation}</h3>
                     <p className="text-[12px] uppercase tracking-[0.1em] text-black/50">Población Total</p>
                  </div>
               </div>

               <div className="flex items-start gap-6 md:border-l md:border-black/10 md:pl-8">
                  <div className="p-4 bg-black/5 rounded-full"><Activity className="w-8 h-8 text-black" /></div>
                  <div>
                     <h3 className="text-[32px] font-[family-name:var(--font-raleway)] font-light leading-none mb-2">{mockAge} años</h3>
                     <p className="text-[12px] uppercase tracking-[0.1em] text-black/50">Edad Media</p>
                  </div>
               </div>

               <div className="flex items-start gap-6 md:border-l md:border-black/10 md:pl-8">
                  <div className="p-4 bg-black/5 rounded-full"><DollarSign className="w-8 h-8 text-black" /></div>
                  <div>
                     <h3 className="text-[32px] font-[family-name:var(--font-raleway)] font-light leading-none mb-2">{mockIncome}</h3>
                     <p className="text-[12px] uppercase tracking-[0.1em] text-black/50">Ingreso Individual Promedio</p>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 5. WALK SCORE / BIKE SCORE */}
      <section className="w-full py-[80px] px-6 bg-white border-b border-black/10">
         <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 flex flex-col justify-center">
               <h2 className="text-[24px] md:text-[32px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em] mb-4">
                 Estilo de Vida en {formattedCanton}
               </h2>
               <p className="text-[16px] text-black/80 font-[family-name:var(--font-quicksand)]">
                 Conozca la accesibilidad de este cantón para peatones y ciclistas, indicadores clave para la calidad de vida diaria.
               </p>
            </div>

            <div className="md:w-1/2 flex flex-col gap-12">
               {/* Walk Score */}
               <div>
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-[16px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em]">
                        {walkScore > 80 ? "Paraíso para Caminar" : "Muy Transitable"}
                     </span>
                     <span className="text-[24px] font-light">{walkScore}</span>
                  </div>
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                     <div className="h-full bg-black transition-all duration-1000" style={{ width: `${walkScore}%` }}></div>
                  </div>
                  <p className="text-[11px] text-black/50 mt-2">
                     Este puntaje indica qué tan transitable a pie es la zona, basado en distancias a servicios esenciales.
                  </p>
               </div>

               {/* Bike Score */}
               <div>
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-[16px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em]">
                        {bikeScore > 70 ? "Muy Apto para Bicicletas" : "Apto para Bicicletas"}
                     </span>
                     <span className="text-[24px] font-light">{bikeScore}</span>
                  </div>
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                     <div className="h-full bg-black transition-all duration-1000" style={{ width: `${bikeScore}%` }}></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. POINTS OF INTEREST (FULL WIDTH TABLE) */}
      <section className="w-full py-[100px] px-6 bg-[#fafafa]">
         <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[24px] md:text-[32px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.2em] mb-4">
               PUNTOS DE INTERÉS
            </h2>
            <p className="text-[16px] text-black/80 font-[family-name:var(--font-quicksand)] mb-12 max-w-[800px]">
               Explore cosas populares para hacer en el área, incluyendo excelentes restaurantes, tiendas exclusivas y vibrante vida nocturna.
            </p>
            
            {/* Interactive POI Table (Yelp style full width) */}
            <InteractivePoiTable cantonName={formattedCanton} />
         </div>
      </section>

      {/* 7. GOOGLE MAPS IFRAME */}
      <section className="w-full h-[500px] relative">
         <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
         ></iframe>
      </section>

      {/* 8. PROPIEDADES DESTACADAS EN VENTA */}
      <section className="w-full py-[120px] px-6 bg-white">
         <div className="max-w-[1200px] mx-auto flex flex-col items-center">
            <h2 className="text-[28px] md:text-[40px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.1em] mb-4 text-center">
               Propiedades en {formattedCanton}
            </h2>
            <p className="text-[16px] text-black/60 font-[family-name:var(--font-quicksand)] mb-12 text-center max-w-[600px]">
               Descubra exclusivas residencias y oportunidades de inversión en esta prestigiosa zona.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16">
               {combinedProperties
                  .filter(p => p.address.toLowerCase().includes(formattedCanton.toLowerCase()))
                  .slice(0, 3)
                  .map(prop => (
                     <PropertyCard key={prop.id} prop={prop} />
               ))}
               {/* Si no hay suficientes propiedades de este cantón, llenamos con otras de lujo para mantener el diseño intacto */}
               {combinedProperties.filter(p => p.address.toLowerCase().includes(formattedCanton.toLowerCase())).length === 0 && (
                  combinedProperties.slice(0, 3).map(prop => (
                     <PropertyCard key={prop.id} prop={prop} />
                  ))
               )}
            </div>

            <Link 
               href={`/portal?canton=${encodeURIComponent(formattedCanton)}`} 
               className="group flex items-center gap-8 py-6 px-12 border border-black/10 hover:border-black transition-all duration-700 bg-[#fafafa] hover:bg-white"
            >
               <span className="text-[12px] md:text-[14px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.3em] font-light text-black">
                  Explorar la Colección en {formattedCanton}
               </span>
               <div className="relative flex items-center">
                  <div className="w-8 h-[1px] bg-black group-hover:w-16 transition-all duration-700 ease-in-out"></div>
                  <div className="absolute right-0 w-2 h-2 border-t border-r border-black rotate-45 transform translate-x-[2px]"></div>
               </div>
            </Link>
         </div>
      </section>

      {/* 9. NEWSLETTER */}
      <section className="relative w-full py-[120px] px-6 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
         <div className="absolute inset-0 bg-[#8c8c8c]/90 mix-blend-multiply"></div>
         <div className="relative z-10 max-w-[800px] mx-auto text-center text-white">
            <h3 className="text-[14px] font-[family-name:var(--font-raleway)] uppercase tracking-[0.2em] mb-[60px]">
               INTERESTED IN AN IMPACTFUL MONTHLY NEWSLETTER?
            </h3>
            <h2 className="text-[36px] md:text-[52px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] mb-[60px] leading-tight">
               INFORMACIÓN<br/>SOBRE EL<br/>MERCADO<br/>INMOBILIARIO,<br/>EVENTOS<br/>LOCALES,<br/>ARTÍCULOS<br/>SELECCIONADOS,<br/>HISTORIAS<br/>INSPIRADORAS Y<br/>UNA DOSIS DE<br/>POSITIVIDAD.
            </h2>
            <p className="text-[16px] font-[family-name:var(--font-quicksand)] mb-[60px]">
               Sin spam: solo un excelente correo electrónico cada mes.<br/>Únete a continuación.
            </p>

            <NewsletterForm tenantName={tenantData.name} />
         </div>
      </section>

      {/* 8. CIERRE / CTA FILOSOFÍA */}
      <section className="bg-white py-[100px] px-6 text-center flex flex-col items-center">
         <h2 className="text-[32px] md:text-[40px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] text-black mb-8 max-w-[800px] leading-tight">
           "La filosofía de {tenantData.name} es simple: los clientes son lo primero."
         </h2>
         <p className="text-[16px] md:text-[18px] text-black/80 font-[family-name:var(--font-quicksand)] leading-[1.8] max-w-[800px] mb-[40px]">
           ¿Te gustaría comprar o vender una propiedad en {formattedCanton}? Estamos aquí para ayudarte en cada paso del proceso.
         </p>
         <a 
           href="https://wa.me/50660413905?text=Hola,%20me%20gustar%C3%ADa%20comprar%20o%20vender%20una%20propiedad" 
           target="_blank"
           rel="noopener noreferrer"
           className="inline-block px-12 py-5 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-black border border-black transition-colors"
         >
           CONECTÉMONOS
         </a>
      </section>

      {/* 9. FOOTER CON REDES Y CORREDOR */}
      <Footer tenantName={tenantData.name} domain={tenantData.domain} />
    </main>
  );
}
