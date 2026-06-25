import { db } from "@/lib/db";
import TenantClient from "./TenantClient";

export default async function TenantsPage() {
  const tenants = await db.tenant.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { users: true, properties: true }
      }
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Inquilinos</h1>
      <TenantClient initialTenants={tenants} />
    </div>
  );
}
