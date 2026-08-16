import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Metadata, ResolvingMetadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingContact from '@/components/ui/FloatingContact';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { allProperties } from '@/data/mockProperties';
import { Bed, Bath, Maximize, MapPin, Calendar, Layers, ShieldCheck, Phone, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

interface PropertyDetailProps {
  params: Promise<{ domain: string; id: string }>;
}

async function getPropertyData(domain: string, id: string) {
  const decodedDomain = decodeURIComponent(domain);
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
    include: { properties: true }
  });

  if (!tenantData) return { tenantData: null, property: null };

  let property = null;
  if (id.startsWith('db-')) {
    const dbId = id.replace('db-', '');
    const dbProp = tenantData.properties.find(p => p.id === dbId);
    if (dbProp) {
      const imgs = (() => { try { return JSON.parse(dbProp.images || '[]'); } catch(e) { return []; } })();
      property = {
        id: `db-${dbProp.id}`,
        title: dbProp.title,
        price: parseInt(dbProp.price.replace(/\D/g,'')) || 0,
        priceStr: dbProp.price,
        type: dbProp.propertyType || 'Venta',
        address: dbProp.location,
        beds: dbProp.beds || 3,
        baths: dbProp.baths || 2,
        constructionArea: dbProp.constructionArea || 250,
        lotArea: dbProp.lotArea || 500,
        yearBuilt: dbProp.yearBuilt || 2024,
        floors: dbProp.floors || 1,
        img: imgs[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        images: imgs.length > 0 ? imgs : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        status: dbProp.status || 'En Venta',
        description: dbProp.description || `Exclusiva residencia de lujo ubicada en ${dbProp.location}. Cuenta con finos acabados arquitectónicos, amplios espacios de entretenimiento y máxima seguridad.`
      };
    }
  } else {
    const mockProp = allProperties.find(p => p.id.toString() === id);
    if (mockProp) {
      property = {
        ...mockProp,
        description: mockProp.description || `Exclusiva propiedad inmobiliaria situada en la prestigiosa zona de ${mockProp.address}, Costa Rica. Ideal para residencia familiar de alto nivel o inversión estratégica.`
      };
    }
  }

  return { tenantData, property };
}

export async function generateMetadata(
  props: PropertyDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { tenantData, property } = await getPropertyData(params.domain, params.id);
  if (!tenantData || !property) {
    return { title: 'Propiedad no encontrada | Andrey Realty' };
  }

  const title = `${property.title} | ${property.priceStr} | ${tenantData.name}`;
  const description = `${property.type} en ${property.address}. Precio: ${property.priceStr}. Cuenta con ${property.beds} habitaciones, ${property.baths} baños y ${property.constructionArea || 250}m² de construcción de lujo en Costa Rica.`;
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const canonicalUrl = `${protocol}://${decodeURIComponent(params.domain)}/propiedad/${params.id}`;
  const ogImage = property.img || property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  return {
    title,
    description,
    keywords: [property.title, property.address, 'Bienes Raíces Costa Rica', 'Casas de Lujo en Venta', tenantData.name, property.priceStr],
    authors: [{ name: tenantData.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'es_CR',
      url: canonicalUrl,
      title,
      description,
      siteName: tenantData.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: `${property.title} - ${property.priceStr}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PropertyPage(props: PropertyDetailProps) {
  const params = await props.params;
  const { tenantData, property } = await getPropertyData(params.domain, params.id);

  if (!tenantData || !property) {
    notFound();
  }

  let settings: any = {};
  try {
    settings = JSON.parse(tenantData.siteSettings || "{}");
  } catch(e) {}

  const contactPhone = settings.contactPhone || "+506 6041 3905";
  const contactEmail = settings.contactEmail || "info@andreyrealty.com";
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const propertyUrl = `${protocol}://${decodeURIComponent(params.domain)}/propiedad/${params.id}`;
  const cleanPhone = contactPhone.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${tenantData.name}, deseo agendar una cita para conocer la propiedad: ${property.title} (Precio: ${property.priceStr}) en ${property.address}.`)}`;

  // Esquema Semántico JSON-LD para SEO (Google Rich Results) y AEO/GEO (ChatGPT, Perplexity, Gemini)
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": ["SingleFamilyResidence", "Product"],
    "name": property.title,
    "description": property.description,
    "url": propertyUrl,
    "image": property.images && property.images.length > 0 ? property.images : [property.img],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": property.address.split(',')[0] || property.address,
      "addressRegion": "Costa Rica",
      "addressCountry": "CR"
    },
    "numberOfRooms": property.beds,
    "numberOfBathroomsTotal": property.baths,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.constructionArea || 250,
      "unitCode": "MTK"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": property.price || 500000,
      "priceValidUntil": new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0],
      "availability": "https://schema.org/InStock",
      "url": propertyUrl,
      "seller": {
        "@type": "RealEstateAgent",
        "name": tenantData.name,
        "telephone": contactPhone,
        "email": contactEmail
      }
    }
  };

  const displayImages = property.images && property.images.length > 0 ? property.images : [property.img];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <Navbar tenantName={tenantData.name} contactPhone={contactPhone} contactEmail={contactEmail} />
      <FloatingContact contactEmail={contactEmail} contactPhone={contactPhone} />
      <WhatsAppButton phone={contactPhone} />

      {/* HERO SECTION DE LA PROPIEDAD */}
      <section className="relative w-full h-[60vh] md:h-[75vh] mt-20 overflow-hidden bg-black">
        <img
          src={displayImages[0]}
          alt={property.title}
          className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
        />
        {/* Stronger gradient at the bottom so text is highly legible, but leaves top clear for the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        
        <div className="absolute top-6 left-6 md:left-12 z-20 flex flex-wrap gap-3">
          <BackButton />
        </div>

        {/* Pushed further down on mobile (bottom-6 instead of bottom-10) */}
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-16 right-6 z-20 max-w-5xl">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="bg-white text-black text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-3 md:px-4 py-1.5 font-bold shadow-lg">
              {property.status}
            </span>
            <span className="bg-black/80 backdrop-blur-md text-white border border-white/20 text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-3 md:px-4 py-1.5 font-bold shadow-lg">
              {property.type}
            </span>
          </div>
          {/* Reduced mobile font size (24px down from 32px) to prevent taking too many lines */}
          <h1 className="text-[24px] md:text-[56px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em] text-white leading-tight mb-2 drop-shadow-2xl">
            {property.title}
          </h1>
          {/* Reduced mobile price size (22px down from 28px) */}
          <p className="text-[22px] md:text-[40px] font-[family-name:var(--font-raleway)] font-semibold text-white tracking-widest drop-shadow-lg text-emerald-400">
            {property.priceStr}
          </p>
          <div className="flex items-center gap-2 text-[12px] md:text-[16px] text-white/90 tracking-widest uppercase mt-2 md:mt-3">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0" />
            <span>{property.address} • Costa Rica</span>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <section className="w-full bg-neutral-100 dark:bg-neutral-900 border-y border-black/10 dark:border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center p-3">
            <Bed className="w-7 h-7 mb-2 opacity-80" />
            <span className="text-[20px] font-bold tracking-wider">{property.beds}</span>
            <span className="text-[11px] text-neutral-500 uppercase tracking-widest">Habitaciones</span>
          </div>
          <div className="flex flex-col items-center p-3 border-l border-neutral-300 dark:border-neutral-800">
            <Bath className="w-7 h-7 mb-2 opacity-80" />
            <span className="text-[20px] font-bold tracking-wider">{property.baths}</span>
            <span className="text-[11px] text-neutral-500 uppercase tracking-widest">Baños Completos</span>
          </div>
          <div className="flex flex-col items-center p-3 border-l border-neutral-300 dark:border-neutral-800">
            <Maximize className="w-7 h-7 mb-2 opacity-80" />
            <span className="text-[20px] font-bold tracking-wider">{property.constructionArea || 250} m²</span>
            <span className="text-[11px] text-neutral-500 uppercase tracking-widest">Área Construida</span>
          </div>
          <div className="flex flex-col items-center p-3 border-l border-neutral-300 dark:border-neutral-800">
            <Layers className="w-7 h-7 mb-2 opacity-80" />
            <span className="text-[20px] font-bold tracking-wider">{property.lotArea || 500} m²</span>
            <span className="text-[11px] text-neutral-500 uppercase tracking-widest">Área Terreno</span>
          </div>
          <div className="flex flex-col items-center p-3 border-l border-neutral-300 dark:border-neutral-800 col-span-2 md:col-span-1">
            <Calendar className="w-7 h-7 mb-2 opacity-80" />
            <span className="text-[20px] font-bold tracking-wider">{property.yearBuilt || 'Moderno'}</span>
            <span className="text-[11px] text-neutral-500 uppercase tracking-widest">Año Construcción</span>
          </div>
        </div>
      </section>

      {/* DETALLE Y ACCIONES DE CONTACTO */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-widest mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              Descripción Arquitectónica
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div>
            <h3 className="text-[20px] font-[family-name:var(--font-raleway)] font-semibold uppercase tracking-widest mb-4">
              Características y Beneficios Exclusivos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px]">
              <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 p-4 border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Acabados premium y materiales importados</span>
              </div>
              <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 p-4 border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Ubicación estratégica de alta plusvalía</span>
              </div>
              <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 p-4 border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Entorno seguro con privacidad absoluta</span>
              </div>
              <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 p-4 border border-black/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Diseño bioclimático y ventilación cruzada</span>
              </div>
            </div>
          </div>

          {/* GALERÍA DE IMÁGENES */}
          {displayImages.length > 1 && (
            <div className="space-y-4">
              <h3 className="text-[20px] font-[family-name:var(--font-raleway)] font-semibold uppercase tracking-widest mb-4">
                Galería Fotográfica del Inmueble
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayImages.slice(1).map((imgUrl: string, i: number) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden bg-black border border-neutral-200 dark:border-neutral-800">
                    <img src={imgUrl} alt={`${property.title} vista ${i+2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* TARJETA DE ASESORÍA Y AGENDADO WHATSAPP */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-900 text-white p-8 border border-white/10 shadow-2xl sticky top-28 space-y-6">
            <div className="text-center pb-6 border-b border-white/10">
              <h3 className="text-[22px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-widest mb-2">
                Asesoría Privada
              </h3>
              <p className="text-[13px] text-white/70 tracking-wider">
                Trato directo, discreción y negociación ejecutiva con {tenantData.name}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                <Send className="w-4 h-4" />
                AGENDAR POR WHATSAPP
              </a>

              <a
                href={`tel:${contactPhone}`}
                className="w-full py-4 border border-white/30 hover:bg-white hover:text-black text-white font-medium text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all"
              >
                <Phone className="w-4 h-4" />
                LLAMAR AL AGENTE
              </a>
            </div>

            <div className="pt-4 text-[12px] text-white/60 space-y-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Información verificada por Andrey Realty</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-80">
                Al contactarnos, recibirá un dossier ejecutivo completo en PDF, planos arquitectónicos y disponibilidad de horarios de visita privados.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer tenantName={tenantData.name} />
    </main>
  );
}
