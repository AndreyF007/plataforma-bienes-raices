import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { db } from '@/lib/db';
import { Raleway, Quicksand } from 'next/font/google';
import '../../globals.css'; // Make sure global css is imported

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['100', '200', '300', '400', '500', '600', '700']
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700']
});

export async function generateMetadata(
  props: { params: Promise<{ domain: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain }
  });

  if (!tenantData) {
    return { title: 'Site Not Found' };
  }

  let settings: any = {};
  try {
    settings = JSON.parse(tenantData.siteSettings || "{}");
  } catch(e) {}

  const title = `${tenantData.name} | ${settings.heroSubtitle || 'Luxury Real Estate Agent'}`;
  const description = settings.heroText || `Especialista en bienes raíces de lujo. ${tenantData.name} le ayuda a comprar y vender propiedades exclusivas.`;
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${decodedDomain}`;
  const ogImage = settings.aboutImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1920&q=80";

  return {
    title: title,
    description: description,
    keywords: ['Bienes Raíces', 'Real Estate', 'Lujo', 'Agente Inmobiliario', tenantData.name, 'Propiedades exclusivas', 'Casas en venta'],
    authors: [{ name: tenantData.name }],
    creator: tenantData.name,
    publisher: tenantData.name,
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'es_CR',
      url: baseUrl,
      title: title,
      description: description,
      siteName: tenantData.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tenantData.name} - Agente Inmobiliario de Lujo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default async function TenantLayout(props: {
  children: ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const params = await props.params;
  const decodedDomain = decodeURIComponent(params.domain);
  
  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain }
  });
  
  if (!tenantData) {
    notFound();
  }

  if (!tenantData.isActive) {
    return (
      <div className={`min-h-screen ${quicksand.variable} ${raleway.variable} font-sans antialiased bg-black text-white flex flex-col items-center justify-center p-6 text-center`}>
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-[family-name:var(--font-raleway)] font-light uppercase tracking-[0.1em]">
            Sitio Suspendido
          </h1>
          <p className="text-white/60 font-[family-name:var(--font-quicksand)] leading-relaxed">
            Esta página se encuentra temporalmente fuera de servicio. Por favor, contacte al administrador.
          </p>
        </div>
      </div>
    );
  }

  let settings: any = {};
  try {
    settings = JSON.parse(tenantData.siteSettings || "{}");
  } catch(e) {}

  const contactPhone = settings.contactPhone || "+506 6041 3905";

  return (
    <div className={`min-h-screen ${quicksand.variable} ${raleway.variable} font-sans antialiased bg-white dark:bg-neutral-950 text-black dark:text-white relative`}>
      {props.children}
      <WhatsAppButton phone={contactPhone} />
    </div>
  );
}
