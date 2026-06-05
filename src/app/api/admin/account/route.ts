import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'El correo electrónico es requerido' }, { status: 400 });
    }

    const dataToUpdate: any = { email };

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await db.user.update({
      where: { email: session.user.email as string },
      data: dataToUpdate
    });

    return NextResponse.json({ message: 'Credenciales actualizadas correctamente' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating account credentials:', error);
    // Verificar si es error de email duplicado en Prisma (P2002)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Este correo electrónico ya está en uso' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
