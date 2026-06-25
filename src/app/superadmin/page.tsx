import { db } from "@/lib/db";
import { Users, Globe, Building } from "lucide-react";

export default async function SuperAdminHome() {
  const tenantsCount = await db.tenant.count();
  const usersCount = await db.user.count({ where: { role: 'tenant' } });
  const propertiesCount = await db.property.count();

  return (
    <div>
      <h1 className="text-3xl font-bold font-sans tracking-wide mb-8">Resumen de Agencia (SaaS)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-lg shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Inquilinos Activos</p>
            <p className="text-2xl font-bold">{tenantsCount}</p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-lg shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Agentes (Usuarios)</p>
            <p className="text-2xl font-bold">{usersCount}</p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-lg shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Propiedades</p>
            <p className="text-2xl font-bold">{propertiesCount}</p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Bienvenido a tu imperio de Software</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          Desde aquí puedes crear nuevos entornos (Inquilinos) para otros agentes inmobiliarios. Cada agente que crees tendrá su propio dominio web, panel de control, base de datos de propiedades aislada, y configuraciones independientes. Para empezar, dirígete a la sección <strong>Inquilinos</strong> en el menú lateral.
        </p>
      </div>
    </div>
  );
}
