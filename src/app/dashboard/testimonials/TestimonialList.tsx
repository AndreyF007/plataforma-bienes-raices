"use client";

import { useState } from "react";
import { Check, X, Trash2, Star, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  content: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

export default function TestimonialList({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    setIsLoading(id);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: !currentStatus })
      });

      if (res.ok) {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, isApproved: !currentStatus } : t));
        router.refresh();
      } else {
        alert("Error al actualizar el estado");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este testimonio de forma permanente?")) return;
    
    setIsLoading(id);
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
        router.refresh();
      } else {
        alert("Error al eliminar el testimonio");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  if (testimonials.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm p-12 text-center">
        <p className="text-gray-500">Aún no tienes ningún testimonio. Cuando los clientes llenen el formulario en tu web, aparecerán aquí para tu aprobación.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {testimonials.map((t) => (
        <div key={t.id} className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col md:flex-row gap-6 relative">
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-lg">{t.clientName}</h3>
              <span className="text-xs bg-gray-100 px-2 py-1 uppercase tracking-widest text-gray-600 rounded-sm">{t.role}</span>
              
              {!t.isApproved && (
                <span className="flex items-center gap-1 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 uppercase tracking-widest font-bold rounded-sm">
                  <Clock className="w-3 h-3" /> Pendiente
                </span>
              )}
            </div>

            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-current" : "text-gray-200"}`} />
              ))}
            </div>

            <p className="text-sm text-gray-600 italic">"{t.content}"</p>
            <p className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[150px]">
            <button 
              disabled={isLoading === t.id}
              onClick={() => handleToggleApproval(t.id, t.isApproved)}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 text-xs uppercase tracking-widest font-bold rounded-sm transition-colors ${
                t.isApproved 
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                  : "bg-black text-white hover:bg-gray-800"
              } disabled:opacity-50`}
            >
              {t.isApproved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              {t.isApproved ? "Ocultar" : "Aprobar"}
            </button>
            
            <button 
              disabled={isLoading === t.id}
              onClick={() => handleDelete(t.id)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs uppercase tracking-widest font-bold text-red-600 border border-red-200 hover:bg-red-50 rounded-sm transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
