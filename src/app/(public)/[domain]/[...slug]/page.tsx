import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';

export default async function DummyPage(props: { params: Promise<{ domain: string, slug: string[] }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
  });
  let settings: any = {};
  try {
    settings = JSON.parse(tenantData?.siteSettings || "{}");
  } catch(e) {}

  
  if (!tenantData) return notFound();

  // Create a readable title from the URL slug
  const title = params.slug.join(' ').toUpperCase().replace(/-/g, ' ');

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      <Navbar tenantName={tenantData.name} contactPhone={settings?.contactPhone} contactEmail={settings?.contactEmail} />
      <FloatingContact contactEmail={settings.contactEmail} contactPhone={settings.contactPhone} />

      <section className="flex-1 flex flex-col justify-center items-center px-6 text-center mt-24 min-h-[60vh]">
         <h1 className="text-[30px] md:text-[50px] font-[family-name:var(--font-raleway)] font-light tracking-[0.2em] mb-8 uppercase leading-tight">
           {title}
         </h1>
         <p className="text-[16px] md:text-[20px] max-w-[600px] text-black dark:text-white leading-relaxed">
           Esta página se encuentra en construcción. Muy pronto publicaremos contenido exclusivo para ti.
         </p>
         
         <a href="/" className="mt-12 py-4 px-10 border border-black dark:border-white/20 text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-black hover:text-white transition-colors">
           VOLVER AL INICIO
         </a>
      </section>
      
      <footer className="w-full py-10 border-t border-black/10 text-center text-[10px] uppercase tracking-widest mt-20">
         Copyright © 2026 | {tenantData.name}
      </footer>
    </main>
  );
}
