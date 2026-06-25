import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers.get('host')!;

  // If in production with Vercel preview URLs, extract the real domain
  if (
    hostname.includes('---') &&
    process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  } else if (
    process.env.NEXT_PUBLIC_ROOT_DOMAIN && 
    hostname.endsWith('.localhost:3000')
  ) {
    // Only replace localhost if NEXT_PUBLIC_ROOT_DOMAIN is actually defined
    hostname = hostname.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  // Si estamos intentando acceder al dashboard o login directamente (por ejemplo en localhost)
  // evitamos reescribir a la carpeta de tenants públicos para que funcionen las rutas.
  // IMPORTANTE: Esto debe ir antes de las reglas de dominios para que los redirects funcionen correctamente.
  if (path.startsWith('/dashboard') || path.startsWith('/login') || path.startsWith('/superadmin') || path.startsWith('/api/superadmin')) {
    return NextResponse.next();
  }

  // Rewrites for app pages
  if (hostname === `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/admin${path === '/' ? '' : path}`, req.url)
    );
  }

  // Rewrites for dashboard pages
  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/dashboard${path === '/' ? '' : path}`, req.url)
    );
  }

  // Rewrite for public tenant pages (e.g., juanperez.com or juan.premiumrealty.com)
  // We rewrite to /(public)/[domain]
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
