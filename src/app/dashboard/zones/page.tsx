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

  const zones = await db.zone.findMany({
    where: { tenantId: user.tenantId },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black">Zonas de Mercado</h1>
        <p className="text-sm text-gray-500 mt-2">Gestiona las áreas, barrios o ciudades donde ofreces tus servicios.</p>
      </div>

      <ZoneList initialZones={zones} />
    </div>
  );
}
