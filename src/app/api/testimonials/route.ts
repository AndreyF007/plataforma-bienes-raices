import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST: Enviar un nuevo testimonio (queda como pendiente de aprobación)
export async function POST(req: NextRequest) {
  try {
    const { clientName, role, content, rating, tenantName } = await req.json();

    if (!clientName || !role || !content || !tenantName) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    let tenant = await db.tenant.findFirst({
      where: { name: tenantName }
    });

    if (!tenant) {
      tenant = await db.tenant.findFirst();
    }

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      );
    }

    const newTestimonial = await db.testimonial.create({
      data: {
        clientName,
        role,
        content,
        rating: rating || 5,
        isApproved: false, // Default: Pending approval
        tenantId: tenant.id
      }
    });

    return NextResponse.json(
      { message: 'Testimonio enviado con éxito', testimonial: newTestimonial },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in testimonial submission:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// GET: Obtener solo los testimonios APROBADOS para el carrusel público
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantName = searchParams.get('tenantName');

    if (!tenantName) {
      return NextResponse.json(
        { error: 'tenantName is required' },
        { status: 400 }
      );
    }

    let tenant = await db.tenant.findFirst({
      where: { name: tenantName }
    });

    if (!tenant) {
      tenant = await db.tenant.findFirst();
    }

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      );
    }

    const approvedTestimonials = await db.testimonial.findMany({
      where: {
        tenantId: tenant.id,
        isApproved: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(
      { testimonials: approvedTestimonials },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
