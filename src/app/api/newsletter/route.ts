import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, email, tenantName } = await req.json();

    if (!name || !email || !tenantName) {
      return NextResponse.json(
        { error: 'Name, email, and tenantName are required' },
        { status: 400 }
      );
    }

    // Buscar el tenantId por el nombre del tenant para poder asociarlo
    // En un caso real, el tenantDomain sería más seguro, pero por ahora usaremos tenantName o el primer tenant
    let tenant = await db.tenant.findFirst({
      where: { name: tenantName }
    });

    // Si no existe, usar el primer tenant disponible (para propósitos de la demo)
    if (!tenant) {
       tenant = await db.tenant.findFirst();
    }

    if (!tenant) {
       return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      );
    }

    // Verificar si ya está suscrito
    const existingSubscriber = await db.newsletterSubscriber.findFirst({
      where: { 
         email,
         tenantId: tenant.id
      }
    });

    if (existingSubscriber) {
      // Si ya está, retornamos éxito igualmente para no revelar info, o un mensaje
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 }
      );
    }

    // Crear el suscriptor en la BD
    await db.newsletterSubscriber.create({
      data: {
        name,
        email,
        tenantId: tenant.id
      }
    });

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
