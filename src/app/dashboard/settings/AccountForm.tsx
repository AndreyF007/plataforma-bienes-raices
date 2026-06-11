"use client";

import { useState } from "react";
import { Loader2, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

interface AccountFormProps {
  initialEmail: string;
}

export default function AccountForm({ initialEmail }: AccountFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/account', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Credenciales actualizadas exitosamente. Si cambiaste tu correo, utiliza el nuevo correo en tu próximo inicio de sesión.");
        setPassword("");
        setConfirmPassword("");
        router.refresh();
      } else {
        alert(data.error || "Error al actualizar las credenciales");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-light uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Credenciales de Acceso</h2>
      </div>

      <div className="grid gap-6 max-w-md">
        <div>
          <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Correo Electrónico (Para Iniciar Sesión)</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
          />
        </div>

        <div className="p-4 bg-gray-50 border border-gray-100 space-y-4">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Cambiar Contraseña</h3>
          <p className="text-xs text-gray-400 font-[family-name:var(--font-quicksand)] mb-4">
            Deja los campos en blanco si no deseas cambiar tu contraseña actual.
          </p>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Nueva Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Confirmar Nueva Contraseña</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-start">
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-black text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/80 flex justify-center items-center gap-3 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
          {isLoading ? 'GUARDANDO...' : 'ACTUALIZAR CREDENCIALES'}
        </button>
      </div>
    </form>
  );
}
