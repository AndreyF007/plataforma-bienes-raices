"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteValuationButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta solicitud de valoración? Esta acción no se puede deshacer.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/valuations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar la solicitud");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-sm disabled:opacity-50"
      title="Eliminar solicitud"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
