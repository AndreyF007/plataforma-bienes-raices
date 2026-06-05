import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user || !user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { name, image } = await req.json();

    if (!name || !image) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const newZone = await db.zone.create({
      data: {
        name,
        image,
        tenantId: user.tenantId
      }
    });

    return NextResponse.json({ message: 'Zona creada', zone: newZone }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user || !user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id, name, image } = await req.json();

    if (!id) return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });

    const zone = await db.zone.findUnique({ where: { id } });
    if (!zone || zone.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }

    const updated = await db.zone.update({
      where: { id },
      data: { name, image }
    });

    return NextResponse.json({ message: 'Zona actualizada', zone: updated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user || !user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });

    const zone = await db.zone.findUnique({ where: { id } });
    if (!zone || zone.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }

    await db.zone.delete({ where: { id } });

    return NextResponse.json({ message: 'Zona eliminada' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
