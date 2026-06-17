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

    const { title, slug, content, category, image, published } = await req.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Todos los campos obligatorios son requeridos' }, { status: 400 });
    }

    const newPost = await db.blogPost.create({
      data: {
        title,
        slug,
        content,
        category: category || "General",
        image: image || null,
        published: published || false,
        tenantId: user.tenantId
      }
    });

    return NextResponse.json({ message: 'Artículo creado', post: newPost }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user || !user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const posts = await db.blogPost.findMany({
      where: { tenantId: user.tenantId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
