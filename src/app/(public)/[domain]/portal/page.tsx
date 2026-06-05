import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { db } from '@/lib/db';
import PortalClient from '@/components/public/PortalClient';
import { allProperties } from '@/data/mockProperties';

export async function generateMetadata(props: { params: Promise<{ domain: string }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  const tenant = await db.tenant.findUnique({ where: { domain: decodedDomain } });
  
  return {
    title: `Propiedades Exclusivas | ${tenant?.name || 'Inmobiliaria'}`,
    description: 'Explore nuestra colección de propiedades de ultra-lujo en Costa Rica.',
  };
}

export default async function PortalPage(props: { 
  params: Promise<{ domain: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const cantonParam = typeof searchParams.canton === 'string' ? searchParams.canton : null;

  const decodedDomain = decodeURIComponent(params.domain);
  const tenant = await db.tenant.findUnique({ 
    where: { domain: decodedDomain },
    include: { properties: true } 
  });

  if (!tenant) return <div>Tenant not found</div>;

  // Combinar propiedades de la BD con el mock data para no perder el diseño
  const dbProps = tenant.properties.map((p, idx) => {
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

  const combinedProperties = [...dbProps, ...allProperties];

  let settings: any = {};
  try {
    settings = JSON.parse(tenant.siteSettings || "{}");
  } catch(e) {}

  const portalHeroSubtitle = settings.portalHeroSubtitle || "PROPIEDADES EXCLUSIVAS";
  const portalHeroTitle = settings.portalHeroTitle || "Descubre nuestra selección de propiedades de lujo";

  return (
    <main className="w-full flex flex-col min-h-screen bg-[#fafafa] text-black font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      <Navbar tenantName={tenant.name} />

      {/* 1. HERO PORTAL (COVER) */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[10s]"
          style={{ backgroundImage: `url('${tenant.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center px-6 mt-12">
          <p className="text-white/80 tracking-[0.2em] uppercase text-[12px] md:text-[14px] text-center max-w-[600px] font-bold mb-4">
            {portalHeroSubtitle}
          </p>
          <h1 className="text-[32px] md:text-[50px] font-[family-name:var(--font-raleway)] font-light text-white tracking-[0.1em] uppercase mb-4 text-center drop-shadow-md">
            {cantonParam ? `LA COLECCIÓN EN ${cantonParam.toUpperCase()}` : portalHeroTitle}
          </h1>
        </div>
      </section>

      {/* COMPONENTE INTERACTIVO DE FILTROS Y GRID */}
      <PortalClient initialCanton={cantonParam} allProperties={combinedProperties} />

      <Footer tenantName={tenant.name} domain={tenant.domain} />
    </main>
  );
}
