import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Users, LogOut, LayoutDashboard, Globe } from "lucide-react";
import { db } from "@/lib/db";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
  });

  if (!user || user.role !== 'superadmin') {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-950 font-sans text-black dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white border-r border-blue-800 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Globe className="w-5 h-5" /> AGENCIA SAAS
          </h2>
          <p className="text-xs text-blue-200 mt-2">{session.user?.email}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="/superadmin" className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100 hover:text-white hover:bg-white/10 rounded-sm transition-colors">
            <LayoutDashboard className="w-4 h-4" /> General
          </a>
          <a href="/superadmin/tenants" className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100 hover:text-white hover:bg-white/10 rounded-sm transition-colors">
            <Users className="w-4 h-4" /> Inquilinos (Agentes)
          </a>
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100 hover:text-white hover:bg-white/10 rounded-sm transition-colors">
            <LogOut className="w-4 h-4" /> Volver al Dashboard
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-10 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
