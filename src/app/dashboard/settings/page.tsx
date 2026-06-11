import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SettingsForm from "./SettingsForm";
import AccountForm from "./AccountForm";

export const dynamic = 'force-dynamic';

export default async function SettingsAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
    include: { tenant: true }
  });

  if (!user || !user.tenant) {
    return <div>No autorizado</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white">Configuración General</h1>
        <p className="text-sm text-gray-500 mt-2">Personaliza la información principal de tu agencia inmobiliaria.</p>
      </div>

      <div className="bg-white dark:bg-neutral-950 border border-gray-200 p-8 shadow-sm">
        <SettingsForm 
          initialName={user.tenant.name} 
          initialHeroTitle={user.tenant.heroTitle || ""} 
          initialHeroImage={user.tenant.heroImage || ""} 
          initialSiteSettings={user.tenant.siteSettings || "{}"}
        />
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white">Seguridad</h1>
        <p className="text-sm text-gray-500 mt-2 mb-6">Cambia el correo electrónico y la contraseña para iniciar sesión en tu panel.</p>
        
        <div className="bg-white dark:bg-neutral-950 border border-gray-200 p-8 shadow-sm">
          <AccountForm initialEmail={user.email} />
        </div>
      </div>
    </div>
  );
}
