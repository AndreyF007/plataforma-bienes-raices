import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import Footer from '@/components/ui/Footer';
import { Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import BlogClient from '@/components/public/BlogClient';
export default async function BlogPage(props: { params: Promise<{ domain: string }> }) {
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

  // Fetch real blog posts from the database
  const blogPosts = await db.blogPost.findMany({
    where: { 
      tenantId: tenantData.id,
      published: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      <Navbar tenantName={tenantData.name} contactPhone={settings?.contactPhone} contactEmail={settings?.contactEmail} />
      <FloatingContact contactEmail={settings.contactEmail} contactPhone={settings.contactPhone} />

      {/* 1. HERO SECTION */}
      <section className="group relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0 bg-black overflow-hidden" style={{ clipPath: 'inset(0)' }}>
          <div className="fixed top-0 left-0 w-full h-[100vh]">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 animate-slow-zoom origin-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80)' }}
            />
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1 className="text-[40px] md:text-[70px] font-[family-name:var(--font-raleway)] font-light text-white uppercase tracking-[0.2em] mb-6 leading-tight drop-shadow-lg">
            Blog
          </h1>
          <p className="text-[18px] md:text-[21px] text-white font-[family-name:var(--font-quicksand)] leading-[1.6] drop-shadow-md max-w-[800px]">
            Novedades, noticias y estilo de vida inmobiliario
          </p>
        </div>
      </section>

      {/* 2. BLOG CONTENT AREA */}
      <section className="w-full max-w-[1300px] mx-auto px-6 py-[100px] md:py-[120px]">
        
        {/* Blog Interactive Client */}
        <BlogClient initialPosts={blogPosts} tenantName={tenantData.name} />

      </section>

      {/* 3. CLOSING SECTION */}
      <section className="bg-neutral-100 dark:bg-neutral-900 py-[80px] px-6 text-center flex flex-col items-center border-t border-black/5 dark:border-white/5">
         <h2 className="text-[28px] md:text-[36px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] mb-6">
           ¿Buscas Asesoría Personalizada?
         </h2>
         <p className="text-[16px] md:text-[18px] text-black dark:text-white max-w-[600px] mb-10 leading-relaxed">
           Agenda una llamada con {tenantData.name} para explorar opciones exclusivas adaptadas a tu estilo de vida.
         </p>
         <Link 
           href="/#contact"
           className="inline-block px-12 py-5 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-black dark:hover:text-white border border-black dark:border-white/20 transition-colors"
         >
           CONTACTAR AHORA
         </Link>
      </section>

      <Footer 
        tenantName={tenantData.name} 
        domain={tenantData.domain}
        facebookUrl={settings.facebookUrl}
        instagramUrl={settings.instagramUrl}
        youtubeUrl={settings.youtubeUrl}
        tiktokUrl={settings.tiktokUrl}
        agentPhoto={settings.agentPhoto}
        agentTitle={settings.agentTitle}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
      />
    </main>
  );
}
