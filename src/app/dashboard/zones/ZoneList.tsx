"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

interface Zone {
  id: string;
  name: string;
  image: string;
  coverImage?: string | null;
  description?: string | null;
  population?: string | null;
  medianAge?: number | null;
  avgIncome?: string | null;
  walkScore?: number | null;
  bikeScore?: number | null;
  videos?: string | null;
}

export default function ZoneList({ initialZones }: { initialZones: Zone[] }) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState('basic');
  
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    coverImage: "",
    description: "",
    population: "",
    medianAge: "",
    avgIncome: "",
    walkScore: "",
    bikeScore: "",
    videos: ""
  });

  const router = useRouter();

  const handleOpenModal = (zone?: Zone) => {
    setActiveTab('basic');
    if (zone) {
      setEditingId(zone.id);
      setFormData({
        name: zone.name || "",
        image: zone.image || "",
        coverImage: zone.coverImage || "",
        description: zone.description || "",
        population: zone.population || "",
        medianAge: zone.medianAge ? zone.medianAge.toString() : "",
        avgIncome: zone.avgIncome || "",
        walkScore: zone.walkScore ? zone.walkScore.toString() : "",
        bikeScore: zone.bikeScore ? zone.bikeScore.toString() : "",
        videos: zone.videos ? (() => {
          try {
            const arr = JSON.parse(zone.videos);
            return Array.isArray(arr) ? arr.join('\n') : '';
          } catch(e) { return ''; }
        })() : ""
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: "", image: "", coverImage: "", description: "", 
        population: "", medianAge: "", avgIncome: "", 
        walkScore: "", bikeScore: "", videos: "" 
      });
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

    let parsedVideos = "[]";
    if (formData.videos) {
      const lines = formData.videos.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      parsedVideos = JSON.stringify(lines);
    }

    const payload = {
      ...formData,
      videos: parsedVideos
    };

    const method = editingId ? 'PATCH' : 'POST';
    const body = editingId ? { id: editingId, ...payload } : payload;

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
          <div key={z.id} className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="h-48 bg-gray-100 dark:bg-neutral-900 relative">
              <img src={z.image} alt={z.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                 <h3 className="text-white font-light uppercase tracking-[0.2em] text-lg text-center px-4">{z.name}</h3>
              </div>
            </div>
            
            <div className="flex bg-white dark:bg-neutral-950">
              <button 
                onClick={() => handleOpenModal(z)}
                className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors border-r border-gray-100 dark:border-neutral-800"
              >
                <Edit2 className="w-3 h-3" /> Editar
              </button>
              <button 
                onClick={() => handleDelete(z.id)}
                className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Eliminar
              </button>
            </div>
          </div>
        ))}
        {zones.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800">
            No hay zonas creadas. Haz clic en "Agregar Zona" para empezar.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white dark:bg-neutral-950 w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-neutral-800">
              <h2 className="text-sm font-bold uppercase tracking-widest">
                {editingId ? 'Editar Zona' : 'Nueva Zona'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black dark:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-gray-100 dark:border-neutral-800 px-6">
              {[
                { id: 'basic', label: 'Info' },
                { id: 'multimedia', label: 'Multimedia' },
                { id: 'stats', label: 'Estadísticas' },
                { id: 'lifestyle', label: 'Estilo de Vida' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 text-xs uppercase tracking-widest font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-black dark:border-white text-black dark:text-white' 
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Nombre de la Zona / Cantón</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors" 
                      placeholder="Ej. GUANACASTE"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Descripción (Acerca de)</label>
                    <textarea 
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none min-h-[120px] transition-colors" 
                      placeholder="Breve descripción que reemplazará a Wikipedia..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'multimedia' && (
                <div className="space-y-6">
                  <div>
                    <ImageUpload 
                      label="Imagen Miniatura (Tarjeta)"
                      value={formData.image}
                      onChange={url => setFormData({...formData, image: url as string})}
                    />
                  </div>
                  <div>
                    <ImageUpload 
                      label="Imagen Hero Principal (Fondo 4K)"
                      value={formData.coverImage}
                      onChange={url => setFormData({...formData, coverImage: url as string})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">IDs de Videos de YouTube (Uno por línea)</label>
                    <textarea 
                      value={formData.videos}
                      onChange={e => setFormData({...formData, videos: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none min-h-[100px] transition-colors" 
                      placeholder="Ejemplo:&#10;LXb3EKWsInQ&#10;pA0H2_GjT50"
                    />
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Solo pega el ID del video. Máximo recomendado: 4 videos.</p>
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Población</label>
                      <input 
                        type="text" 
                        value={formData.population}
                        onChange={e => setFormData({...formData, population: e.target.value})}
                        className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none" 
                        placeholder="Ej. 25,000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Edad Media</label>
                      <input 
                        type="number" 
                        value={formData.medianAge}
                        onChange={e => setFormData({...formData, medianAge: e.target.value})}
                        className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none" 
                        placeholder="Ej. 35"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Ingreso Promedio Individual</label>
                    <input 
                      type="text" 
                      value={formData.avgIncome}
                      onChange={e => setFormData({...formData, avgIncome: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none" 
                      placeholder="Ej. $45,000"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'lifestyle' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Walk Score (0-100)</label>
                    <input 
                      type="number" 
                      min="0" max="100"
                      value={formData.walkScore}
                      onChange={e => setFormData({...formData, walkScore: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none" 
                      placeholder="Ej. 85"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Bike Score (0-100)</label>
                    <input 
                      type="number" 
                      min="0" max="100"
                      value={formData.bikeScore}
                      onChange={e => setFormData({...formData, bikeScore: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none" 
                      placeholder="Ej. 65"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 mt-6 border-t border-gray-100 dark:border-neutral-800">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-black/80 flex justify-center items-center h-12"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'GUARDAR ZONA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
