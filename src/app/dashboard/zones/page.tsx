import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ZoneList from "./ZoneList";

export const dynamic = 'force-dynamic';

export default async function ZonesAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
  });

  if (!user || !user.tenantId) {
    return <div>No autorizado</div>;
  }

  let zones = await db.zone.findMany({
    where: { tenantId: user.tenantId },
  });

  if (zones.length === 0) {
    const defaultZones = [
      { name: 'San José', image: 'https://images.unsplash.com/photo-1590059336111-82743825a07c?auto=format&fit=crop&w=800&q=80', tenantId: user.tenantId },
      { name: 'Guanacaste', image: 'https://images.unsplash.com/photo-1590493060411-9a7c645b36bd?auto=format&fit=crop&w=800&q=80', tenantId: user.tenantId },
      { name: 'Puntarenas', image: 'https://images.unsplash.com/photo-1563299796-17596c367e0e?auto=format&fit=crop&w=800&q=80', tenantId: user.tenantId },
      { name: 'Limón', image: 'https://images.unsplash.com/photo-1620023403332-9017f8b9ec7c?auto=format&fit=crop&w=800&q=80', tenantId: user.tenantId },
      { name: 'Alajuela', image: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?auto=format&fit=crop&w=800&q=80', tenantId: user.tenantId },
      { name: 'Heredia', image: 'https://images.unsplash.com/photo-1616422285623-14981329ee7a?auto=format&fit=crop&w=800&q=80', tenantId: user.tenantId },
      { name: 'Cartago', image: 'https://images.unsplash.com/photo-1583095123989-130a10996cb2?auto=format&fit=crop&w=800&q=80', tenantId: user.tenantId }
    ];
    await db.zone.createMany({ data: defaultZones });
    zones = await db.zone.findMany({
      where: { tenantId: user.tenantId },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white">Zonas de Mercado</h1>
        <p className="text-sm text-gray-500 mt-2">Gestiona las áreas, barrios o ciudades donde ofreces tus servicios.</p>
      </div>

      <ZoneList initialZones={zones} />
    </div>
  );
}
