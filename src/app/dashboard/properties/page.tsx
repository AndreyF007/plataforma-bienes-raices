import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import PropertyList from "./PropertyList";

export const dynamic = 'force-dynamic';

export default async function PropertiesAdminPage() {
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

  const properties = await db.property.findMany({
    where: { tenantId: user.tenantId },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white">Propiedades Activas</h1>
        <p className="text-sm text-gray-500 mt-2">Gestiona el inventario de casas que aparecen en la sección de propiedades.</p>
      </div>

      <PropertyList initialProperties={properties} />
    </div>
  );
}
