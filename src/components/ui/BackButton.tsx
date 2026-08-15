"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md hover:bg-black text-white text-[11px] uppercase font-bold tracking-[0.2em] py-2 px-5 rounded-none border border-white/20 transition-all duration-300 shadow-xl"
    >
      <ArrowLeft className="w-4 h-4 text-white animate-pulse" />
      VOLVER
    </button>
  );
}
