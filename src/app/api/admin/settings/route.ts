import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
      include: { tenant: true }
    });

    if (!user || !user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { name, heroTitle, heroImage, siteSettings } = await req.json();

    if (!name && !siteSettings) {
      return NextResponse.json({ error: 'Data is required' }, { status: 400 });
    }

    let newSiteSettings = user.tenant?.siteSettings;
    if (siteSettings) {
      try {
        const currentSettings = user.tenant?.siteSettings ? JSON.parse(user.tenant.siteSettings) : {};
        newSiteSettings = JSON.stringify({ ...currentSettings, ...siteSettings });
      } catch (e) {
        newSiteSettings = JSON.stringify(siteSettings);
      }
    }

    const updated = await db.tenant.update({
      where: { id: user.tenantId },
      data: { 
        ...(name && { name }), 
        ...(heroTitle !== undefined && { heroTitle }), 
        ...(heroImage !== undefined && { heroImage }),
        ...(newSiteSettings !== undefined && { siteSettings: newSiteSettings })
      }
    });

    return NextResponse.json({ message: 'Configuración actualizada', tenant: updated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
