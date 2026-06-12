import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ValuationsAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
    include: { tenant: true }
  });

  if (!user || !user.tenantId) {
    return <div>No autorizado</div>;
  }

  const valuations = await db.valuationRequest.findMany({
    where: { tenantId: user.tenantId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white">Valoraciones Solicitadas</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Lista de clientes interesados en conocer el valor de su vivienda o venderla.</p>
      </div>

      {valuations.length === 0 ? (
        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-sm p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">Aún no tienes solicitudes de valoración. Aparecerán aquí cuando un cliente llene el formulario.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-bold">Cliente</th>
                <th className="px-6 py-4 font-bold">Propiedad</th>
                <th className="px-6 py-4 font-bold">Plazo</th>
                <th className="px-6 py-4 font-bold text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {valuations.map((val) => (
                <tr key={val.id} className="hover:bg-gray-50 dark:bg-neutral-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-black dark:text-white">{val.name}</div>
                    <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <a href={`mailto:${val.email}`} className="flex items-center gap-2 hover:text-black dark:text-white">
                        <Mail className="w-3 h-3" /> {val.email}
                      </a>
                      <a href={`tel:${val.phone}`} className="flex items-center gap-2 hover:text-black dark:text-white">
                        <Phone className="w-3 h-3" /> {val.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-[family-name:var(--font-quicksand)]">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-black/50 dark:text-white/50" />
                      {val.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 text-[10px] uppercase tracking-widest rounded-sm">
                      {val.timeframe || "No especificado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top text-right text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-end gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(val.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
