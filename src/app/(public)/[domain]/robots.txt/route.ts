import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  const p = await params;
  const decodedDomain = decodeURIComponent(p.domain);
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${decodedDomain}`;

  const robots = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/admin/
Disallow: /login/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
