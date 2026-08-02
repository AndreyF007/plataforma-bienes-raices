import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ domain: string, slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  const tenantData = await db.tenant.findUnique({ where: { domain: decodedDomain } });
  if (!tenantData) return { title: 'Artículo no encontrado' };
  
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post || !post.published) return { title: 'Artículo no encontrado | Andrey Realty' };

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const url = `${protocol}://${decodedDomain}/blog/${post.slug}`;
  const description = post.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

  return {
    title: `${post.title} | Blog Inmobiliario | ${tenantData.name}`,
    description,
    keywords: [post.title, post.category || 'Bienes Raíces', 'Costa Rica Real Estate', tenantData.name, 'Blog Inmobiliario'],
    authors: [{ name: tenantData.name }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'es_CR',
      url,
      title: post.title,
      description,
      siteName: tenantData.name,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ domain: string, slug: string }> }) {
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

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const url = `${protocol}://${decodedDomain}/blog/${post.slug}`;
  const cleanDescription = post.content.replace(/<[^>]*>?/gm, '').substring(0, 250);

  // Esquema Semantico para Motores de Búsqueda e Inteligencia Artificial (Google News, ChatGPT, Perplexity)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": cleanDescription,
    "image": post.image ? [post.image] : [],
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "RealEstateAgent",
      "name": tenantData.name,
      "url": `${protocol}://${decodedDomain}`
    },
    "publisher": {
      "@type": "Organization",
      "name": tenantData.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${protocol}://${decodedDomain}/favicon.ico`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-[family-name:var(--font-quicksand)] selection:bg-black selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar tenantName={tenantData.name} contactPhone={settings?.contactPhone} contactEmail={settings?.contactEmail} />
      <FloatingContact contactEmail={settings.contactEmail} contactPhone={settings.contactPhone} />

      <article className="w-full pt-32 pb-24">
        {/* Header */}
        <header className="max-w-[1000px] mx-auto px-6 mb-12 text-center">
          <div className="flex items-center justify-center text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-black dark:text-white mb-6">
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
