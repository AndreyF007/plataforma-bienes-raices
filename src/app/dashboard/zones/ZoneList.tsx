"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

interface Zone {
  id: string;
  name: string;
  image: string;
}

export default function ZoneList({ initialZones }: { initialZones: Zone[] }) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  });

  const router = useRouter();

  const handleOpenModal = (zone?: Zone) => {
    if (zone) {
      setEditingId(zone.id);
      setFormData({
        name: zone.name,
        image: zone.image
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const method = editingId ? 'PATCH' : 'POST';
    const body = editingId ? { id: editingId, ...formData } : formData;

    try {
      const res = await fetch('/api/admin/zones', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        if (editingId) {
          setZones(zones.map(z => z.id === editingId ? data.zone : z));
        } else {
          setZones([...zones, data.zone]);
        }
        handleCloseModal();
        router.refresh();
      } else {
        alert("Error al guardar la zona");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta zona?")) return;
    
    try {
      const res = await fetch(`/api/admin/zones?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setZones(zones.filter(z => z.id !== id));
        router.refresh();
      } else {
        alert("Error al eliminar la zona");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-black/80 transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar Zona
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((z) => (
          <div key={z.id} className="bg-white border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="h-48 bg-gray-100 relative">
              <img src={z.image} alt={z.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                 <h3 className="text-white font-light uppercase tracking-[0.2em] text-lg text-center px-4">{z.name}</h3>
              </div>
            </div>
            
            <div className="flex bg-white">
              <button 
                onClick={() => handleOpenModal(z)}
                className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors border-r border-gray-100"
              >
                <Edit2 className="w-3 h-3" /> Editar
              </button>
              <button 
                onClick={() => handleDelete(z.id)}
                className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-red-50 text-red-600 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Eliminar
              </button>
            </div>
          </div>
        ))}
        {zones.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-200">
            No hay zonas creadas. Haz clic en "Agregar Zona" para empezar.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white w-full max-w-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest">
                {editingId ? 'Editar Zona' : 'Nueva Zona'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Nombre de la Zona</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 p-3 text-sm focus:border-black outline-none" 
                  placeholder="Ej. GUANACASTE"
                />
              </div>

              <div>
                <ImageUpload 
                  label="Imagen de la Zona"
                  value={formData.image}
                  onChange={url => setFormData({...formData, image: url as string})}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-black text-white py-3 mt-4 text-xs uppercase tracking-widest font-bold hover:bg-black/80 flex justify-center items-center h-12"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'GUARDAR ZONA'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
