import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

  // Basic routes
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

  // Dynamically fetch properties
  const properties = await db.property.findMany({
    where: { tenantId: tenantData.id },
    select: { id: true },
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static routes
  routes.forEach((route) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add blog posts
  posts.forEach((post) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add properties
  properties.forEach((property) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/propiedad/${property.id}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
