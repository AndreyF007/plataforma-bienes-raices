import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Home, Settings, Building, LogOut, Grid, MessageSquare, Globe, ClipboardList, Mail, BookOpen } from "lucide-react";
import LivePreviewPane from "@/components/admin/LivePreviewPane";
import { db } from "@/lib/db";

export default async function DashboardLayout({
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
    include: { tenant: true }
  });

  const tenantDomain = user?.tenant?.domain || "localhost:3000";
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const previewUrl = `${protocol}://${tenantDomain}`;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-950 font-sans text-black dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-sm font-light uppercase tracking-widest">Panel Admin</h2>
          <p className="text-xs text-gray-400 mt-1">{session.user?.email}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="/dashboard/properties" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <Building className="w-4 h-4" /> Propiedades
          </a>
          <a href="/dashboard/blog" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <BookOpen className="w-4 h-4" /> Blog
          </a>
          <a href="/dashboard/zones" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <Grid className="w-4 h-4" /> Zonas
          </a>
          <a href="/dashboard/testimonials" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <MessageSquare className="w-4 h-4" /> Testimonios
          </a>
          <a href="/dashboard/valuations" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <ClipboardList className="w-4 h-4" /> Valoraciones
          </a>
          <a href="/dashboard/newsletter" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <Mail className="w-4 h-4" /> Lista VIP
          </a>
          <a href="/dashboard/guias" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <BookOpen className="w-4 h-4" /> Guías
          </a>
          <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <Settings className="w-4 h-4" /> Configuración
          </a>

          {user?.role === 'superadmin' && (
            <div className="pt-4 mt-4 border-t border-white/10">
              <a href="/superadmin" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-sm transition-colors">
                🏢 Panel de Agencia
              </a>
            </div>
          )}
        </nav>
        
        <div className="p-4 border-t border-white/10 space-y-2">
          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-sm text-green-400 font-bold hover:text-green-300 hover:bg-white/5 rounded-sm transition-colors">
            <Globe className="w-4 h-4" /> Ver Mi Web
          </a>
          <a href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-10">
          {children}
        </div>
      </main>

      {/* Live Preview Pane */}
      <LivePreviewPane previewUrl={previewUrl} />
    </div>
  );
}
