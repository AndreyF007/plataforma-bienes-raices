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

    const { title, description, location, price, beds, baths, constructionArea, lotArea, yearBuilt, floors, propertyType, status, images, province, canton } = await req.json();

    if (!title || !location || !price || !images || !province || !canton) {
      return NextResponse.json({ error: 'Todos los campos obligatorios son requeridos' }, { status: 400 });
    }

    const newProperty = await db.property.create({
      data: {
        title,
        description,
        location,
        price,
        beds: parseInt(beds) || 0,
        baths: parseInt(baths) || 0,
        constructionArea: parseInt(constructionArea) || 0,
        lotArea: parseInt(lotArea) || 0,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        floors: parseInt(floors) || 1,
        propertyType: propertyType || 'Casa',
        status: status || 'En Venta',
        images,
        province,
        canton,
        tenantId: user.tenantId
      }
    });

    return NextResponse.json({ message: 'Propiedad creada', property: newProperty }, { status: 201 });
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

    const { id, title, description, location, price, beds, baths, constructionArea, lotArea, yearBuilt, floors, propertyType, status, images, province, canton } = await req.json();

    if (!id) return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });

    const property = await db.property.findUnique({ where: { id } });
    if (!property || property.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }

    const updated = await db.property.update({
      where: { id },
      data: { 
        title, 
        description, 
        location, 
        price, 
        beds: parseInt(beds) || 0,
        baths: parseInt(baths) || 0,
        constructionArea: parseInt(constructionArea) || 0,
        lotArea: parseInt(lotArea) || 0,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        floors: parseInt(floors) || 1,
        propertyType: propertyType || 'Casa',
        status: status || 'En Venta',
        images,
        province,
        canton
      }
    });

    return NextResponse.json({ message: 'Propiedad actualizada', property: updated }, { status: 200 });
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

    const property = await db.property.findUnique({ where: { id } });
    if (!property || property.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }

    await db.property.delete({ where: { id } });

    return NextResponse.json({ message: 'Propiedad eliminada' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
