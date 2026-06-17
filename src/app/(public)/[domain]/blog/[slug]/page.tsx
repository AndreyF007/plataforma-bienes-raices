import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function BlogPostPage(props: { params: Promise<{ domain: string, slug: string }> }) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
  });
  
  if (!tenantData) return notFound();

  const post = await db.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || post.tenantId !== tenantData.id || !post.published) {
    return notFound();
  }

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      <Navbar tenantName={tenantData.name} />
      <FloatingContact />

      <article className="w-full pt-32 pb-24">
        {/* Header */}
        <header className="max-w-[1000px] mx-auto px-6 mb-12 text-center">
          <div className="flex items-center justify-center text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-black/60 dark:text-white/60 mb-6">
            <span>{post.category}</span>
            <span className="mx-3 w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40"></span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          
          <h1 className="text-[32px] md:text-[56px] font-[family-name:var(--font-raleway)] font-light leading-[1.1] uppercase tracking-[0.1em] mb-12">
            {post.title}
          </h1>

          {post.image && (
            <div className="w-full relative pt-[56.25%] overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-xl">
              <img 
                src={post.image} 
                alt={post.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-6">
          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-[family-name:var(--font-raleway)] prose-headings:font-light prose-headings:uppercase prose-headings:tracking-wider prose-p:leading-relaxed prose-p:text-[18px] prose-a:text-black dark:prose-a:text-white mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-20 pt-10 border-t border-black/10 dark:border-white/10 flex justify-center">
            <Link 
              href="/blog" 
              className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-medium border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" /> Volver al Blog
            </Link>
          </div>
        </div>
      </article>

      <Footer tenantName={tenantData.name} />
    </main>
  );
}
