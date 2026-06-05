import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

// PATCH: Aprobar o desaprobar un testimonio
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, isApproved } = await req.json();

    if (!id || typeof isApproved !== 'boolean') {
      return NextResponse.json(
        { error: 'ID e isApproved son obligatorios' },
        { status: 400 }
      );
    }

    // Verify the user owns the tenant this testimonial belongs to
    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
      include: { tenant: true }
    });

    if (!user || !user.tenantId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const testimonial = await db.testimonial.findUnique({
      where: { id }
    });

    if (!testimonial || testimonial.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Testimonial not found or forbidden' }, { status: 404 });
    }

    const updatedTestimonial = await db.testimonial.update({
      where: { id },
      data: { isApproved }
    });

    return NextResponse.json(
      { message: 'Testimonio actualizado', testimonial: updatedTestimonial },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un testimonio
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'El ID es obligatorio' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
      include: { tenant: true }
    });

    if (!user || !user.tenantId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const testimonial = await db.testimonial.findUnique({
      where: { id }
    });

    if (!testimonial || testimonial.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Testimonial not found or forbidden' }, { status: 404 });
    }

    await db.testimonial.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Testimonio eliminado con éxito' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
