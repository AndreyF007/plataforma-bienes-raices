"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/dashboard") return null;

  return (
    <div className="mb-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar
      </button>
    </div>
  );
}
