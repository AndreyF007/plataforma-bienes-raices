import { ReactNode } from 'react';
import { LayoutDashboard, Users, CreditCard, Settings, LayoutTemplate, ShieldCheck } from 'lucide-react';

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#fafafa]">
      {/* Sidebar - Super Admin */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="font-semibold text-sm tracking-widest uppercase">Super Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <a href="/" className="flex items-center px-3 py-2 text-sm bg-white/10 rounded-md text-white">
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Overview
          </a>
          <a href="/tenants" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md">
            <Users className="w-4 h-4 mr-3" />
            Agencies / Tenants
          </a>
          <a href="/billing" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md">
            <CreditCard className="w-4 h-4 mr-3" />
            Billing & Plans
          </a>
          <a href="/templates" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md">
            <LayoutTemplate className="w-4 h-4 mr-3" />
            Theme AI Engine
          </a>
          <a href="/settings" className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md">
            <Settings className="w-4 h-4 mr-3" />
            Platform Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white dark:bg-neutral-950 border-b border-gray-200 flex items-center px-8">
          <h1 className="text-lg font-medium text-gray-900">Platform Overview</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
