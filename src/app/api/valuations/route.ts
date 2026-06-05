import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { address, name, email, phone, timeframe, tenantId } = await req.json();

    if (!address || !name || !email || !phone || !tenantId) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const valuationRequest = await db.valuationRequest.create({
      data: {
        address,
        name,
        email,
        phone,
        timeframe,
        tenantId,
      }
    });

    return NextResponse.json(
      { message: 'Solicitud recibida con éxito', valuationRequest },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating valuation request:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
