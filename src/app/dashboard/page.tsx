import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return null; // layout.tsx se encargará de redirigir a /login
  }

  // Find the tenant associated with this user
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { tenant: true }
  });

  const tenant = user?.tenant;

  if (!tenant) {
    return <div>No hay una cuenta de agencia (tenant) asociada a este usuario.</div>;
  }

  const propertiesCount = await db.property.count({ where: { tenantId: tenant.id } });
  const zonesCount = await db.zone.count({ where: { tenantId: tenant.id } });

  return (
    <div>
      <h1 className="text-2xl font-light tracking-[0.2em] uppercase mb-8 border-b border-gray-200 pb-4">
        Resumen de tu Agencia
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-950 p-8 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gray-500">Configuración Actual</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Nombre Comercial</label>
              <div className="text-lg">{tenant.name}</div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Dominio Asignado</label>
              <div className="text-lg">{tenant.domain}</div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Imagen de Portada (Hero)</label>
              <div className="mt-2 relative w-full h-32 bg-gray-100 dark:bg-neutral-900 overflow-hidden">
                <img src={tenant.heroImage || '/images/hero-bg.png'} alt="Hero" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <button className="mt-8 px-6 py-3 border border-black dark:border-white/20 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
            Editar Configuración
          </button>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white dark:bg-neutral-950 p-8 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-light">{propertiesCount}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Propiedades Activas</p>
            </div>
            <a href="/dashboard/properties" className="text-xs uppercase tracking-widest border-b border-black dark:border-white/20 pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">Gestionar</a>
          </div>
          
          <div className="bg-white dark:bg-neutral-950 p-8 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-light">{zonesCount}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Zonas de Mercado</p>
            </div>
            <a href="/dashboard/zones" className="text-xs uppercase tracking-widest border-b border-black dark:border-white/20 pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">Gestionar</a>
          </div>
        </div>
      </div>
    </div>
  );
}
