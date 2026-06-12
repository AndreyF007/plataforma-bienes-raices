import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Mail, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function NewsletterAdminPage() {
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

  const subscribers = await db.newsletterSubscriber.findMany({
    where: { tenantId: user.tenantId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white">Lista VIP (Newsletter)</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Lista de clientes suscritos a tu boletín exclusivo.</p>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-sm p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">Aún no tienes suscriptores. Aparecerán aquí cuando un cliente se una desde el pie de página.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-bold">Nombre</th>
                <th className="px-6 py-4 font-bold">Correo Electrónico</th>
                <th className="px-6 py-4 font-bold text-right">Fecha de Suscripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-black dark:text-white">{sub.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${sub.email}`} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                      <Mail className="w-4 h-4" /> {sub.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 align-top text-right text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-end gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(sub.createdAt).toLocaleDateString()}
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
