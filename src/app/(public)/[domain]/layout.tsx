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

  return {
    title: `${tenantData.name} | Luxury Real Estate`,
    description: `Top luxury Realtor. Specializes in exclusive homes.`,
  };
}

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

  return (
    <div className={`min-h-screen ${quicksand.variable} ${raleway.variable} font-sans antialiased bg-white text-black`}>
      {props.children}
    </div>
  );
}
