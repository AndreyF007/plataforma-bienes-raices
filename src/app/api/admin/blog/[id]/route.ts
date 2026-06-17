import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user || !user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const postId = params.id;
    const existingPost = await db.blogPost.findUnique({ where: { id: postId } });

    if (!existingPost || existingPost.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const { title, slug, content, category, image, published } = await req.json();

    const updatedPost = await db.blogPost.update({
      where: { id: postId },
      data: {
        title: title !== undefined ? title : existingPost.title,
        slug: slug !== undefined ? slug : existingPost.slug,
        content: content !== undefined ? content : existingPost.content,
        category: category !== undefined ? category : existingPost.category,
        image: image !== undefined ? image : existingPost.image,
        published: published !== undefined ? published : existingPost.published,
      }
    });

    return NextResponse.json({ message: 'Artículo actualizado', post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user || !user.tenantId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const postId = params.id;
    const existingPost = await db.blogPost.findUnique({ where: { id: postId } });

    if (!existingPost || existingPost.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    await db.blogPost.delete({ where: { id: postId } });

    return NextResponse.json({ message: 'Artículo eliminado' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
