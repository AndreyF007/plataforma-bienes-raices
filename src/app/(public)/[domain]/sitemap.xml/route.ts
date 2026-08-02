import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { DEFAULT_CANTON_IMAGES } from '@/data/crDemographics';
import { allProperties } from '@/data/mockProperties';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  const p = await params;
  const decodedDomain = decodeURIComponent(p.domain);

  const tenantData = await db.tenant.findUnique({
    where: { domain: decodedDomain },
  });

  if (!tenantData) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${decodedDomain}`;

  // Basic static routes
  const routes = [
    '',
    '/portal',
    '/comunidades',
    '/comprador',
    '/vendedor',
    '/blog',
  ];

  // Dynamically fetch blog posts
  const posts = await db.blogPost.findMany({
    where: { tenantId: tenantData.id, published: true },
    select: { slug: true, updatedAt: true },
  });

  // Dynamically fetch database properties
  const dbProperties = await db.property.findMany({
    where: { tenantId: tenantData.id },
    select: { id: true },
  });

  // Dynamically fetch zones in DB to ensure zero cantons are left behind
  const dbZones = await db.zone.findMany({
    where: { tenantId: tenantData.id },
    select: { name: true },
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const seenUrls = new Set<string>();
  const addUrl = (loc: string, changefreq: string, priority: string, lastmod?: string) => {
    if (seenUrls.has(loc)) return;
    seenUrls.add(loc);
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod || new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  };

  // Add static routes
  routes.forEach((route) => {
    addUrl(`${baseUrl}${route}`, 'daily', route === '' ? '1.0' : '0.8');
  });

  // Add all 84 cantons and communities (from DB + default catalogue)
  const allCantonNames = new Set<string>();
  Object.keys(DEFAULT_CANTON_IMAGES).forEach(name => allCantonNames.add(name));
  dbZones.forEach(z => {
    if (z.name) allCantonNames.add(z.name);
  });

  allCantonNames.forEach((cantonName) => {
    const slug = cantonName.toLowerCase().replace(/ /g, '-');
    addUrl(`${baseUrl}/comunidades/${encodeURIComponent(slug)}`, 'weekly', '0.85');
  });

  // Add blog posts
  posts.forEach((post) => {
    addUrl(`${baseUrl}/blog/${post.slug}`, 'weekly', '0.7', post.updatedAt.toISOString());
  });

  // Add DB properties
  dbProperties.forEach((property) => {
    addUrl(`${baseUrl}/propiedad/db-${property.id}`, 'weekly', '0.9');
  });

  // Add mock properties
  allProperties.forEach((property) => {
    addUrl(`${baseUrl}/propiedad/${property.id}`, 'weekly', '0.85');
  });

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
