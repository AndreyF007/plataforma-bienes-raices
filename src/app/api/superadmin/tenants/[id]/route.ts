import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    const { name, domain, siteSettings } = body;

    // Validate inputs
    if (!name || !domain) {
      return NextResponse.json(
        { error: 'Name and domain are required' },
        { status: 400 }
      );
    }

    const updatedTenant = await db.tenant.update({
      where: { id: params.id },
      data: {
        name,
        domain,
        ...(siteSettings && { siteSettings }),
      },
    });

    return NextResponse.json(updatedTenant);
  } catch (error: any) {
    console.error('Error updating tenant:', error);
    // Unique constraint on domain
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Domain already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    const { isActive } = body;

    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'isActive must be a boolean' },
        { status: 400 }
      );
    }

    const updatedTenant = await db.tenant.update({
      where: { id: params.id },
      data: { isActive },
    });

    return NextResponse.json(updatedTenant);
  } catch (error: any) {
    console.error('Error pausing/unpausing tenant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    
    await db.tenant.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting tenant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
