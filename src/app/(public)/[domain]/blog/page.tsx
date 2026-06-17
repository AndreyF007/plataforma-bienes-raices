import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import Footer from '@/components/ui/Footer';
import { Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default async function BlogPage(props: { params: Promise<{ domain: string }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
  });
  
  if (!tenantData) return notFound();

  // Dummy data for the blog layout
  const blogPosts = [
    {
      id: 1,
      title: "Las Mejores Zonas para Invertir en Bienes Raíces este 2026",
      category: "MERCADO INMOBILIARIO",
      date: "15 JUN 2026",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
    },
    {
      id: 2,
      title: "Cómo Preparar Tu Casa para la Venta: Guía Completa",
      category: "CONSEJOS PARA VENDEDORES",
      date: "10 JUN 2026",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
    },
    {
      id: 3,
      title: "Diseño Interior: Tendencias Minimalistas y Elegantes",
      category: "ESTILO DE VIDA",
      date: "05 JUN 2026",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
    },
    {
      id: 4,
      title: "Beneficios de Comprar Propiedades en Preventa",
      category: "INVERSIÓN",
      date: "28 MAY 2026",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
    }
  ];

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      <Navbar tenantName={tenantData.name} />
      <FloatingContact />

      {/* 1. HERO SECTION */}
      <section className="group relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 animate-slow-zoom transition-transform duration-[20s] ease-linear"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80)' }}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1 className="text-[40px] md:text-[70px] font-[family-name:var(--font-raleway)] font-light text-white uppercase tracking-[0.2em] mb-6 leading-tight drop-shadow-lg">
            Blog
          </h1>
          <p className="text-[18px] md:text-[21px] text-white/90 font-[family-name:var(--font-quicksand)] leading-[1.6] drop-shadow-md max-w-[800px]">
            Novedades, noticias y estilo de vida inmobiliario
          </p>
        </div>
      </section>

      {/* 2. BLOG CONTENT AREA */}
      <section className="w-full max-w-[1300px] mx-auto px-6 py-[100px] md:py-[120px]">
        
        {/* Search & Filter Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="w-full md:max-w-[485px] relative">
            <input 
              type="text" 
              placeholder="Buscar en el blog..." 
              className="w-full h-[50px] bg-transparent border-b border-black/20 dark:border-white/20 text-[16px] text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black dark:focus:border-white transition-colors pb-2"
            />
            <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50 dark:text-white/50" />
          </div>
          <div className="w-full md:w-auto">
             <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-black/20 dark:border-white/20 text-[12px] uppercase tracking-[0.15em] font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
               CATEGORÍAS <ChevronDown className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {blogPosts.map((post, idx) => (
            <article key={post.id} className="group cursor-pointer flex flex-col">
              <div className="relative w-full pt-[70%] bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-8">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              
              <div className="flex flex-col flex-1">
                <div className="flex items-center text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] text-black/60 dark:text-white/60 mb-4">
                  <span>{post.category}</span>
                  <span className="mx-3 w-1 h-1 rounded-full bg-black/40 dark:bg-white/40"></span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-[24px] md:text-[30px] font-[family-name:var(--font-raleway)] font-light leading-tight mb-6 uppercase tracking-[0.1em]">
                  {post.title}
                </h3>
                
                <div className="w-24 h-[1px] bg-black/20 dark:bg-white/20 mb-8 transition-all duration-300 group-hover:w-full"></div>
                
                <div className="mt-auto">
                  <span className="inline-block text-[12px] uppercase tracking-[0.15em] font-medium border-b border-transparent group-hover:border-black dark:group-hover:border-white transition-colors pb-1">
                    LEER MÁS
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* 3. CLOSING SECTION */}
      <section className="bg-neutral-100 dark:bg-neutral-900 py-[80px] px-6 text-center flex flex-col items-center border-t border-black/5 dark:border-white/5">
         <h2 className="text-[28px] md:text-[36px] font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.2em] mb-6">
           ¿Buscas Asesoría Personalizada?
         </h2>
         <p className="text-[16px] md:text-[18px] text-black/80 dark:text-white/80 max-w-[600px] mb-10 leading-relaxed">
           Agenda una llamada con {tenantData.name} para explorar opciones exclusivas adaptadas a tu estilo de vida.
         </p>
         <Link 
           href="/#contact"
           className="inline-block px-12 py-5 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-black dark:hover:text-white border border-black dark:border-white/20 transition-colors"
         >
           CONTACTAR AHORA
         </Link>
      </section>

      <Footer tenantName={tenantData.name} />
    </main>
  );
}
