import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  const p = await params;
  const decodedDomain = decodeURIComponent(p.domain);
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${decodedDomain}`;

  const robots = `# Configuración oficial para motores de búsqueda (SEO) e Inteligencia Artificial (GEO/AEO)
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/admin/
Disallow: /login/

User-agent: GPTBot
Allow: /
Disallow: /dashboard/

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /
Disallow: /dashboard/

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /
Disallow: /dashboard/

User-agent: Anthropic-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
