"use client";

import { useState } from "react";
import { Check, X, Trash2, Star, Clock, Edit, Plus } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
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
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
    } else {
      setEditingTestimonial({ clientName: '', role: 'Cliente', content: '', rating: 5, isApproved: true });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    setIsLoading("saving");
    
    const isNew = !editingTestimonial.id;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch('/api/admin/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTestimonial)
      });
      
      if (res.ok) {
        const data = await res.json();
        if (isNew) {
          setTestimonials([data.testimonial, ...testimonials]);
        } else {
          setTestimonials(testimonials.map(t => t.id === data.testimonial.id ? data.testimonial : t));
        }
        closeModal();
        router.refresh();
      } else {
        alert("Error al guardar el testimonio");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nuevo Testimonio
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-sm p-12 text-center">
          <p className="text-gray-500">Aún no tienes ningún testimonio. Puedes agregar uno manualmente o esperar a que un cliente lo envíe.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-sm p-6 flex flex-col md:flex-row gap-6 relative">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{t.clientName}</h3>
                  <span className="text-xs bg-gray-100 dark:bg-neutral-800 px-2 py-1 uppercase tracking-widest text-gray-600 dark:text-gray-300 rounded-sm">{t.role}</span>
                  {!t.isApproved && (
                    <span className="flex items-center gap-1 text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-1 uppercase tracking-widest font-bold rounded-sm">
                      <Clock className="w-3 h-3" /> Pendiente
                    </span>
                  )}
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-current" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{t.content}"</p>
                <p className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex md:flex-col gap-2 justify-start md:justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-neutral-800 pt-4 md:pt-0 md:pl-6">
                <button
                  onClick={() => openModal(t)}
                  disabled={isLoading === t.id}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 dark:border-neutral-700 rounded-sm hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors flex-1"
                >
                  <Edit className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={() => handleToggleApproval(t.id, t.isApproved)}
                  disabled={isLoading === t.id}
                  className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border rounded-sm transition-colors flex-1 ${
                    t.isApproved 
                      ? "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/10" 
                      : "border-green-200 text-green-600 hover:bg-green-50 dark:border-green-900/30 dark:hover:bg-green-900/10"
                  }`}
                >
                  {t.isApproved ? <><X className="w-4 h-4" /> Ocultar</> : <><Check className="w-4 h-4" /> Aprobar</>}
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  disabled={isLoading === t.id}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 dark:border-neutral-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-sm transition-colors flex-1"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && editingTestimonial && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-lg rounded-sm shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-neutral-800">
              <h2 className="text-xl font-bold uppercase tracking-wider">{editingTestimonial.id ? 'Editar Testimonio' : 'Nuevo Testimonio'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-black dark:hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="testimonial-form" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Nombre del Cliente</label>
                  <input required type="text" value={editingTestimonial.clientName || ''} onChange={e => setEditingTestimonial({...editingTestimonial, clientName: e.target.value})} className="w-full bg-gray-50 dark:bg-neutral-950 text-black dark:text-white border border-gray-200 dark:border-neutral-800 px-4 py-2 rounded-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Rol / Tipo</label>
                  <input required type="text" value={editingTestimonial.role || ''} onChange={e => setEditingTestimonial({...editingTestimonial, role: e.target.value})} placeholder="Ej: Comprador, Inversionista..." className="w-full bg-gray-50 dark:bg-neutral-950 text-black dark:text-white border border-gray-200 dark:border-neutral-800 px-4 py-2 rounded-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Puntuación (1-5)</label>
                  <input required type="number" min="1" max="5" value={editingTestimonial.rating || 5} onChange={e => setEditingTestimonial({...editingTestimonial, rating: parseInt(e.target.value)})} className="w-full bg-gray-50 dark:bg-neutral-950 text-black dark:text-white border border-gray-200 dark:border-neutral-800 px-4 py-2 rounded-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Testimonio</label>
                  <textarea required rows={4} value={editingTestimonial.content || ''} onChange={e => setEditingTestimonial({...editingTestimonial, content: e.target.value})} className="w-full bg-gray-50 dark:bg-neutral-950 text-black dark:text-white border border-gray-200 dark:border-neutral-800 px-4 py-2 rounded-sm focus:outline-none focus:border-black dark:focus:border-white"></textarea>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="isApproved" checked={editingTestimonial.isApproved} onChange={e => setEditingTestimonial({...editingTestimonial, isApproved: e.target.checked})} className="w-4 h-4" />
                  <label htmlFor="isApproved" className="text-sm">Aprobado y Visible en el portal</label>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-neutral-800 flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white transition-colors">Cancelar</button>
              <button type="submit" form="testimonial-form" disabled={isLoading === "saving"} className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2">
                {isLoading === "saving" ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
