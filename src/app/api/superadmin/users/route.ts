import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const superuser = await db.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!superuser || superuser.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { tenantId, email, password, name } = await req.json();

    if (!tenantId || !email || !password) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'tenant',
        tenantId
      }
    });

    return NextResponse.json({ message: 'User created successfully', userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
