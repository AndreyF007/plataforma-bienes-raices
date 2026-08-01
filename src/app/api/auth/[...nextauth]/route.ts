import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@antigravity.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const emailLower = credentials.email.toLowerCase().trim();
        let user = await db.user.findUnique({
          where: { email: emailLower }
        });
        
        // PROVISIONAMIENTO AUTOMÁTICO DE SUPERADMIN PARA ANDREY MARTÍNEZ Y CUENTAS ADMINISTRATIVAS
        const isAdminEmail = emailLower === 'andreymartinezalvarado@gmail.com' || 
                             emailLower === 'admin@andreyrealty.com' || 
                             emailLower === 'admin@antigravity.com';

        if (!user && isAdminEmail) {
          // Buscamos el tenant principal de Andrey Realty o el primer tenant disponible en la base de datos
          const tenant = await db.tenant.findFirst({
            where: { domain: 'AndreyRealty' }
          }) || await db.tenant.findFirst();

          const hashedPassword = await bcrypt.hash('admin123', 10);
          user = await db.user.create({
            data: {
              email: emailLower,
              name: 'Andrey Martínez (SuperAdmin)',
              password: hashedPassword,
              role: 'SUPERADMIN',
              tenantId: tenant?.id || null
            }
          });
        }

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        // Garantía VIP de acceso con clave maestra para el propietario del portal
        if (!isPasswordValid && !(isAdminEmail && credentials.password === 'admin123')) {
          return null;
        }

        // Si el usuario es Andrey Martínez o admin y no tenía tenantId vinculado, aseguramos la vinculación
        if (isAdminEmail && !user.tenantId) {
          const tenant = await db.tenant.findFirst({
            where: { domain: 'AndreyRealty' }
          }) || await db.tenant.findFirst();
          if (tenant) {
            await db.user.update({
              where: { id: user.id },
              data: { tenantId: tenant.id, role: 'SUPERADMIN' }
            });
            user.tenantId = tenant.id;
            user.role = 'SUPERADMIN';
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenantId
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60, // 1 año de sesión
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.tenantId = (user as any).tenantId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).tenantId = token.tenantId;
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      if (code === "JWT_SESSION_ERROR") {
        return; // Ignoramos este error para que no bloquee con la pantalla roja de Next.js
      }
      console.error(code, metadata);
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
