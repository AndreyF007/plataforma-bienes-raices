"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales inválidas");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black font-sans">
      <div className="max-w-md w-full bg-white dark:bg-neutral-950 p-10 rounded-sm shadow-xl border border-gray-100 dark:border-neutral-800">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white mb-2">Ingresar</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Accede a tu panel de administración</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-500 text-sm text-center border border-red-100 dark:border-red-800">{error}</div>}
          
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              style={{ colorScheme: "dark" }}
              className="w-full px-4 py-3 bg-transparent text-black dark:text-white border border-gray-200 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-colors placeholder:text-gray-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              style={{ colorScheme: "dark" }}
              className="w-full px-4 py-3 bg-transparent text-black dark:text-white border border-gray-200 dark:border-neutral-700 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-colors placeholder:text-gray-400"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black px-4 py-4 text-xs uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors mt-8"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
