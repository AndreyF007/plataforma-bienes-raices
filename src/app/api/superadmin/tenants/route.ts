import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const superadmin = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!superadmin || superadmin.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { name, domain, userEmail, userPassword, userName, siteSettings } = await req.json();

    if (!name || !domain) {
      return NextResponse.json({ error: 'Nombre y dominio son requeridos' }, { status: 400 });
    }

    let defaultSettings = {
      heroSubtitle: "AGENTE INMOBILIARIO",
      heroText: `Bienvenido a ${name}. Encuentra tu propiedad ideal con nosotros.`,
    };

    if (siteSettings) {
      defaultSettings = { ...defaultSettings, ...siteSettings };
    }

    let userData = undefined;
    if (userEmail && userPassword) {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      userData = {
        create: {
          email: userEmail,
          password: hashedPassword,
          name: userName || name,
          role: 'tenant'
        }
      };
    }

    const newTenant = await db.tenant.create({
      data: {
        name,
        domain,
        siteSettings: JSON.stringify(defaultSettings),
        ...(userData && { users: userData })
      },
      include: {
        _count: {
          select: { users: true, properties: true }
        }
      }
    });

    return NextResponse.json(newTenant, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
