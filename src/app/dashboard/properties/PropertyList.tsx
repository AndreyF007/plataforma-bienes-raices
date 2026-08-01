"use client";

import { useState, useRef, useMemo } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Upload, Image as ImageIcon, ChevronLeft, ChevronRight, Bed, Bath, Maximize, MapPin, Calendar, Layers, Search, Map as MapIcon, ChevronRight as ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/utils/imageCompressor";

interface Property {
  id: string;
  title: string;
  description: string | null;
  location: string;
  price: string;
  beds: number;
  baths: number;
  constructionArea: number;
  lotArea: number;
  yearBuilt: number | null;
  floors: number;
  propertyType: string;
  status: string;
  images: string; // JSON string array
  province: string;
  canton: string;
}

const LOCATION_DATA: Record<string, string[]> = {
  "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés Castro"],
  "Alajuela": ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
  "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
  "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
  "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
  "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito", "Monteverde", "Puerto Jiménez"],
  "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"]
};
const PROVINCES = Object.keys(LOCATION_DATA);

type ViewMode = 'PROVINCES' | 'CANTONS' | 'PROPERTIES';

export default function PropertyList({ initialProperties }: { initialProperties: Property[] }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);
  
  // NAVEGACIÓN Y BÚSQUEDA
  const [viewMode, setViewMode] = useState<ViewMode>('PROVINCES');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCanton, setSelectedCanton] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    beds: "",
    baths: "",
    constructionArea: "",
    lotArea: "",
    yearBuilt: "",
    floors: "1",
    propertyType: "Casa",
    status: "En Venta",
    province: "Guanacaste",
    canton: "Santa Cruz"
  });
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // FILTER LOGIC
  const filteredProperties = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return properties.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.location.toLowerCase().includes(q) || 
        p.province.toLowerCase().includes(q) || 
        p.canton.toLowerCase().includes(q)
      );
    }
    
    if (viewMode === 'PROPERTIES' && selectedProvince && selectedCanton) {
      return properties.filter(p => p.province === selectedProvince && p.canton === selectedCanton);
    }
    return properties;
  }, [properties, viewMode, selectedProvince, selectedCanton, searchQuery]);

  const propertiesByProvince = useMemo(() => {
    const map = new Map<string, number>();
    PROVINCES.forEach(p => map.set(p, 0));
    properties.forEach(p => {
      const count = map.get(p.province) || 0;
      map.set(p.province, count + 1);
    });
    return map;
  }, [properties]);

  const propertiesByCanton = useMemo(() => {
    if (!selectedProvince) return new Map<string, number>();
    const cantons = LOCATION_DATA[selectedProvince] || [];
    const map = new Map<string, number>();
    cantons.forEach(c => map.set(c, 0));
    properties.filter(p => p.province === selectedProvince).forEach(p => {
      const count = map.get(p.canton) || 0;
      map.set(p.canton, count + 1);
    });
    return map;
  }, [properties, selectedProvince]);

  const handleOpenModal = (property?: Property) => {
    if (property) {
      setEditingId(property.id);
      setFormData({
        title: property.title,
        description: property.description || "",
        location: property.location,
        price: property.price,
        beds: property.beds?.toString() || "0",
        baths: property.baths?.toString() || "0",
        constructionArea: property.constructionArea?.toString() || "0",
        lotArea: property.lotArea?.toString() || "0",
        yearBuilt: property.yearBuilt?.toString() || "",
        floors: property.floors?.toString() || "1",
        propertyType: property.propertyType,
        status: property.status,
        province: property.province,
        canton: property.canton
      });
      try {
        setExistingImages(JSON.parse(property.images));
      } catch (e) {
        setExistingImages([]);
      }
    } else {
      setEditingId(null);
      setFormData({
        title: "", description: "", location: "", price: "", beds: "", baths: "", constructionArea: "", lotArea: "", yearBuilt: "", floors: "1", propertyType: "Casa", status: "En Venta", province: selectedProvince || "Guanacaste", canton: selectedCanton || "Santa Cruz"
      });
      setExistingImages([]);
    }
    setSelectedFiles([]);
    setPreviewUrls([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const totalImages = existingImages.length + selectedFiles.length + filesArray.length;
      if (totalImages > 10) {
        alert("El límite máximo es de 10 imágenes por propiedad.");
        return;
      }
      setSelectedFiles(prev => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      const urls = [...prev];
      URL.revokeObjectURL(urls[index]);
      return urls.filter((_, i) => i !== index);
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let newUploadedUrls: string[] = [];
      if (selectedFiles.length > 0) {
        const formDataUpload = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
          const f = selectedFiles[i];
          const compressed = await compressImage(f);
          const name = compressed instanceof Blob && !(compressed instanceof File) ? f.name.replace(/\.[^/.]+$/, "") + ".jpg" : f.name;
          formDataUpload.append("images", compressed, name);
        }
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formDataUpload });
        if (!uploadRes.ok) throw new Error("Fallo al subir imágenes");
        const uploadData = await uploadRes.json();
        newUploadedUrls = uploadData.urls;
      }

      const finalImages = [...existingImages, ...newUploadedUrls];
      
      if (finalImages.length === 0) {
        alert("Debes agregar al menos 1 imagen.");
        setIsLoading(false);
        return;
      }

      const payload = { ...formData, images: JSON.stringify(finalImages) };
      const method = editingId ? "PATCH" : "POST";
      const url = "/api/admin/properties";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload)
      });

      if (!res.ok) throw new Error("Error al guardar propiedad");

      const data = await res.json();

      if (editingId) {
        setProperties(properties.map(p => p.id === editingId ? data.property : p));
      } else {
        setProperties([data.property, ...properties]);
      }

      handleCloseModal();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error al procesar la propiedad");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta propiedad?")) return;
    try {
      const res = await fetch("/api/admin/properties", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error("Fallo al eliminar");
      setProperties(properties.filter(p => p.id !== id));
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  const nextCardImage = (id: string, total: number) => {
    setCardImageIndices(prev => {
      const current = prev[id] || 0;
      return { ...prev, [id]: (current + 1) % total };
    });
  };

  const prevCardImage = (id: string, total: number) => {
    setCardImageIndices(prev => {
      const current = prev[id] || 0;
      return { ...prev, [id]: (current - 1 + total) % total };
    });
  };

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <div>
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white dark:bg-neutral-950 p-6 shadow-sm border border-black/5">
        <div className="w-full md:w-auto">
          <h1 className="text-3xl font-[family-name:var(--font-raleway)] text-black dark:text-white mb-1">
             Inventario de Lujo
          </h1>
          <p className="text-[11px] uppercase tracking-widest text-black/40 font-semibold">
            {properties.length} Propiedades Totales
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* BARRA DE BÚSQUEDA */}
          <div className="relative w-full md:w-80 group">
            <input 
              type="text"
              placeholder="Buscar por nombre, cantón..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 pl-10 pr-4 py-3 text-[13px] font-[family-name:var(--font-quicksand)] focus:border-black dark:focus:border-white/20 focus:ring-0 outline-none transition-all placeholder:text-gray-400 group-hover:bg-white dark:group-hover:bg-neutral-950"
            />
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-black/30" />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3.5 text-black/30 hover:text-black dark:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="w-full md:w-auto bg-black text-white px-6 py-3 text-[11px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>
      </div>

      {/* BREADCRUMBS & NAVIGATION */}
      {!isSearchActive && (
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-black/40 mb-6 bg-white dark:bg-neutral-950 py-4 px-6 border border-black/5 shadow-sm overflow-x-auto">
          {viewMode !== 'PROVINCES' && (
            <button 
              onClick={() => {
                if (viewMode === 'PROPERTIES') { setViewMode('CANTONS'); setSelectedCanton(null); }
                else if (viewMode === 'CANTONS') { setViewMode('PROVINCES'); setSelectedProvince(null); setSelectedCanton(null); }
              }}
              className="flex items-center gap-1.5 text-black dark:text-white hover:opacity-70 transition-opacity border-r border-black/10 dark:border-white/10 pr-4 mr-2"
            >
              <ChevronLeft className="w-4 h-4" /> Regresar
            </button>
          )}

          <button 
            onClick={() => { setViewMode('PROVINCES'); setSelectedProvince(null); setSelectedCanton(null); }}
            className={`hover:text-black dark:text-white transition-colors whitespace-nowrap ${viewMode === 'PROVINCES' ? 'text-black dark:text-white' : ''}`}
          >
            Provincias
          </button>
          
          {(viewMode === 'CANTONS' || viewMode === 'PROPERTIES') && selectedProvince && (
            <>
              <ArrowRight className="w-3 h-3" />
              <button 
                onClick={() => { setViewMode('CANTONS'); setSelectedCanton(null); }}
                className={`hover:text-black dark:text-white transition-colors ${viewMode === 'CANTONS' ? 'text-black dark:text-white' : ''}`}
              >
                {selectedProvince}
              </button>
            </>
          )}

          {viewMode === 'PROPERTIES' && selectedCanton && (
            <>
              <ArrowRight className="w-3 h-3" />
              <span className="text-black dark:text-white">{selectedCanton}</span>
            </>
          )}
        </div>
      )}

      {/* VIEWS */}
      
      {/* 1. PROVINCES VIEW */}
      {!isSearchActive && viewMode === 'PROVINCES' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PROVINCES.map((prov) => {
            const count = propertiesByProvince.get(prov) || 0;
            return (
              <div 
                key={prov} 
                onClick={() => {
                  setSelectedProvince(prov);
                  setViewMode('CANTONS');
                }}
                className="group relative bg-black aspect-[4/3] cursor-pointer overflow-hidden border border-black/10 shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Pattern / Subtle Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 transform group-hover:scale-105 transition-transform duration-700">
                  <MapIcon className="w-8 h-8 mb-4 text-white/50 group-hover:text-white transition-colors" />
                  <h3 className="text-2xl font-[family-name:var(--font-raleway)] font-light tracking-wide text-center uppercase mb-2">{prov}</h3>
                  <div className="w-8 h-px bg-white/30 mb-4 group-hover:w-16 transition-all duration-500"></div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 group-hover:text-white/80 transition-colors">
                    {count} {count === 1 ? 'Propiedad' : 'Propiedades'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. CANTONS VIEW */}
      {!isSearchActive && viewMode === 'CANTONS' && selectedProvince && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {LOCATION_DATA[selectedProvince].map((canton) => {
            const count = propertiesByCanton.get(canton) || 0;
            return (
              <div 
                key={canton} 
                onClick={() => {
                  setSelectedCanton(canton);
                  setViewMode('PROPERTIES');
                }}
                className="group relative bg-white dark:bg-neutral-950 aspect-square cursor-pointer overflow-hidden border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-black dark:text-white bg-gray-50 dark:bg-neutral-950 group-hover:bg-white dark:group-hover:bg-neutral-900 transition-colors">
                  <h3 className="text-lg font-[family-name:var(--font-raleway)] font-medium text-center mb-2">{canton}</h3>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${count > 0 ? 'text-black/60 dark:text-white/60' : 'text-black/20'}`}>
                    {count} {count === 1 ? 'Propiedad' : 'Propiedades'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. PROPERTIES VIEW & SEARCH RESULTS */}
      {(isSearchActive || viewMode === 'PROPERTIES') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(p => {
            let imgs: string[] = [];
            try { imgs = JSON.parse(p.images); } catch (e) {}
            const currentIndex = cardImageIndices[p.id] || 0;

            return (
              <div key={p.id} className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col group">
                {/* Carrusel de la tarjeta */}
                <div 
                  className="h-56 bg-black relative overflow-hidden cursor-pointer"
                  onClick={() => setPreviewProperty(p)}
                >
                  {imgs.length > 0 ? (
                    <img src={imgs[currentIndex]} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8 opacity-50" />
                    </div>
                  )}
                  
                  {/* Controles del Carrusel (Solo visibles en hover si hay más de 1 imagen) */}
                  {imgs.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevCardImage(p.id, imgs.length); }}
                        className="bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-black dark:text-white p-1.5 rounded-full shadow-md transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextCardImage(p.id, imgs.length); }}
                        className="bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-black dark:text-white p-1.5 rounded-full shadow-md transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3 bg-white dark:bg-neutral-950 text-black dark:text-white text-[9px] uppercase px-3 py-1 font-bold shadow-md">
                    {p.status}
                  </div>
                </div>
                
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold uppercase tracking-widest text-sm line-clamp-1">{p.title}</h3>
                    <span className="text-[9px] bg-black text-white px-2 py-0.5 uppercase tracking-wider font-semibold">{p.propertyType}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1 font-[family-name:var(--font-quicksand)]"><MapPin className="w-3 h-3"/> {p.canton}, {p.province}</p>
                  <p className="text-lg font-[family-name:var(--font-raleway)] font-medium text-black dark:text-white mb-4">{p.price}</p>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide font-bold">
                    <div className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5 text-black/40"/> {p.beds} Camas</div>
                    <div className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5 text-black/40"/> {p.baths} Baños</div>
                    <div className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-black/40"/> {p.constructionArea}m² C.</div>
                    <div className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-black/40"/> {p.lotArea}m² L.</div>
                  </div>
                </div>
                <div className="flex border-t border-gray-100 dark:border-neutral-800">
                  <button 
                    onClick={() => handleOpenModal(p)}
                    className="flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors border-r border-gray-100 dark:border-neutral-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            )
          })}
          {filteredProperties.length === 0 && (
            <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">No se encontraron propiedades</p>
              <p className="text-xs text-gray-400 mt-2 font-[family-name:var(--font-quicksand)]">Intenta usar otros términos de búsqueda o agrega una propiedad.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de Formularios (Crear/Editar) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white dark:bg-neutral-950 w-full max-w-4xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/10">
              <h2 className="text-lg font-[family-name:var(--font-raleway)] font-bold uppercase tracking-widest">
                {editingId ? 'Editar Propiedad de Lujo' : 'Nueva Propiedad de Lujo'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black dark:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Bloque 1: Ubicación Jerárquica */}
              <div className="bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-4">Ubicación Geográfica</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Provincia</label>
                    <select 
                      value={formData.province} 
                      onChange={e => {
                        const newProv = e.target.value;
                        setFormData({...formData, province: newProv, canton: LOCATION_DATA[newProv][0]});
                      }} 
                      className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none bg-white dark:bg-neutral-950 font-[family-name:var(--font-quicksand)]"
                    >
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Cantón</label>
                    <select 
                      value={formData.canton} 
                      onChange={e => setFormData({...formData, canton: e.target.value})} 
                      className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none bg-white dark:bg-neutral-950 font-[family-name:var(--font-quicksand)]"
                    >
                      {LOCATION_DATA[formData.province].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Dirección Exacta</label>
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
                      placeholder="Ej. Condominio Del Sol, Casa 4"
                    />
                  </div>
                </div>
              </div>

              {/* Bloque 2: Información Principal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Título de la Propiedad</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
                    placeholder="Ej. VILLA PACÍFICO"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Precio de Venta / Alquiler</label>
                  <input 
                    type="text" 
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
                    placeholder="Ej. $1,250,000"
                  />
                </div>
              </div>

              {/* Bloque 3: Características */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Tipo de Propiedad</label>
                  <select value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none bg-white dark:bg-neutral-950 font-[family-name:var(--font-quicksand)]">
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Lote">Lote</option>
                    <option value="Finca">Finca</option>
                    <option value="Local Comercial">Local Comercial</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Estado</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none bg-white dark:bg-neutral-950 font-[family-name:var(--font-quicksand)]">
                    <option value="En Venta">En Venta</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Alquiler">Alquiler</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Cuartos</label>
                  <input type="number" min="0" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Baños</label>
                  <input type="number" min="0" step="0.5" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
              </div>

              {/* Bloque 4: Medidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Construcción m²</label>
                  <input type="number" min="0" value={formData.constructionArea} onChange={e => setFormData({...formData, constructionArea: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Lote m²</label>
                  <input type="number" min="0" value={formData.lotArea} onChange={e => setFormData({...formData, lotArea: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Año Const.</label>
                  <input type="number" min="1800" max="2100" value={formData.yearBuilt} onChange={e => setFormData({...formData, yearBuilt: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" placeholder="Ej. 2024" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Pisos</label>
                  <input type="number" min="1" value={formData.floors} onChange={e => setFormData({...formData, floors: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Descripción Detallada</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 p-4 text-sm focus:border-black dark:border-white/20 outline-none resize-y font-[family-name:var(--font-quicksand)] leading-loose" 
                  placeholder="Escribe aquí los detalles, amenidades y características destacadas..."
                />
              </div>

              {/* Galería de Imágenes */}
              <div className="bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Galería Fotográfica (Máx 10)</label>
                  <span className="text-xs text-black dark:text-white font-bold">{existingImages.length + selectedFiles.length}/10</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                  {existingImages.map((img, idx) => (
                    <div key={`exist-${idx}`} className="relative h-24 bg-gray-200 border border-gray-300 group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-all">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {previewUrls.map((url, idx) => (
                    <div key={`new-${idx}`} className="relative h-24 bg-gray-200 border border-gray-300 group">
                      <img src={url} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-black text-white text-[8px] uppercase px-1 font-bold">NUEVA</div>
                      <button type="button" onClick={() => removeSelectedFile(idx)} className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-all">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {existingImages.length + selectedFiles.length < 10 && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-black dark:text-white hover:border-black dark:border-white/20 cursor-pointer transition-colors bg-white dark:bg-neutral-950"
                    >
                      <Upload className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-bold uppercase">Añadir</span>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  multiple 
                  accept="image/jpeg,image/png,image/webp" 
                  className="hidden" 
                />
              </div>

              <div className="pt-4 border-t border-black/10 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-black text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-black/80 transition-colors flex items-center justify-center shadow-lg disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? 'Guardar Cambios' : 'Publicar Propiedad')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Previsualización (Visor de Galería y Descripción) */}
      {previewProperty && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 animate-in fade-in zoom-in-[0.98] duration-500">
          <div 
            className="absolute inset-0 bg-white/90 backdrop-blur-xl z-0 cursor-pointer"
            onClick={() => setPreviewProperty(null)}
          />
          <div className="relative z-10 w-full h-full md:h-auto md:max-h-[90vh] max-w-6xl bg-white dark:bg-neutral-950 shadow-2xl flex flex-col md:flex-row overflow-hidden border border-black/5">
            <button 
              onClick={() => setPreviewProperty(null)}
              className="absolute top-6 right-6 z-50 bg-black text-white hover:bg-black/70 p-3 rounded-full transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full md:w-[55%] h-[50vh] md:h-full relative bg-[#0a0a0a] group/modal flex flex-col">
              <div className="flex-1 relative overflow-hidden p-4">
                 {(() => {
                    let previewImgs: string[] = [];
                    try { previewImgs = JSON.parse(previewProperty.images || "[]"); } catch(e) {}
                    const idx = cardImageIndices[previewProperty.id] || 0;
                    if(previewImgs.length > 0) {
                      return <img src={previewImgs[idx]} className="w-full h-full object-contain" />;
                    } else {
                      return <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-12 h-12 text-white/30" /></div>;
                    }
                 })()}
                 
                 {(() => {
                    let previewImgs: string[] = [];
                    try { previewImgs = JSON.parse(previewProperty.images || "[]"); } catch(e) {}
                    if (previewImgs.length > 1) {
                      return (
                        <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <button onClick={(e) => { e.stopPropagation(); prevCardImage(previewProperty.id, previewImgs.length); }} className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white dark:bg-neutral-950 text-white hover:text-black dark:text-white p-4 rounded-full border border-white/20 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); nextCardImage(previewProperty.id, previewImgs.length); }} className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white dark:bg-neutral-950 text-white hover:text-black dark:text-white p-4 rounded-full border border-white/20 transition-colors">
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      )
                    }
                    return null;
                 })()}
              </div>
              {/* Miniaturas */}
              {(() => {
                  let previewImgs: string[] = [];
                  try { previewImgs = JSON.parse(previewProperty.images || "[]"); } catch(e) {}
                  const currentIndex = cardImageIndices[previewProperty.id] || 0;
                  if (previewImgs.length > 1) {
                    return (
                      <div className="h-24 bg-black/50 backdrop-blur-lg flex gap-3 items-center px-6 overflow-x-auto border-t border-white/10 no-scrollbar">
                        {previewImgs.map((img, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => setCardImageIndices(prev => ({...prev, [previewProperty.id]: idx}))}
                            className={`h-16 w-24 flex-shrink-0 transition-all duration-300 overflow-hidden ${idx === currentIndex ? 'border-b-2 border-white opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
                          >
                            <img src={img} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )
                  }
                  return null;
              })()}
            </div>
            
            <div className="w-full md:w-[45%] bg-white dark:bg-neutral-950 p-8 md:p-12 overflow-y-auto flex flex-col custom-scrollbar">
              <div className="text-[10px] uppercase tracking-[0.3em] font-semibold text-black/40 dark:text-white/40 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
                {previewProperty.status} <span className="text-black/20 dark:text-white/20">|</span> {previewProperty.propertyType}
              </div>
              
              <h2 className="text-[36px] md:text-[42px] font-[family-name:var(--font-raleway)] font-light text-black dark:text-white mb-2 leading-[1.1] uppercase tracking-wide">
                {previewProperty.title}
              </h2>
              <p className="text-[16px] font-[family-name:var(--font-quicksand)] font-bold text-black/50 dark:text-white/50 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {previewProperty.canton}, {previewProperty.province}
              </p>
              <p className="text-[14px] font-[family-name:var(--font-quicksand)] text-black/60 dark:text-white/60 mb-10 flex items-center gap-2">
                 {previewProperty.location}
              </p>
              
              <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-8 mb-10 text-center">
                <p className="text-[32px] font-medium font-[family-name:var(--font-raleway)] text-black dark:text-white">{previewProperty.price}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Precio de Venta</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-4 mb-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <Bed className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{previewProperty.beds}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Camas</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Bath className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{previewProperty.baths}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Baños</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Layers className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{previewProperty.floors}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Pisos</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Maximize className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{previewProperty.constructionArea}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Const. (m²)</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Maximize className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{previewProperty.lotArea}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Lote (m²)</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Calendar className="w-5 h-5 text-black/30 dark:text-white/30 mb-2" />
                  <span className="text-[18px] font-light text-black dark:text-white">{previewProperty.yearBuilt || '-'}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-1">Año</span>
                </div>
              </div>

              <div className="w-8 h-px bg-black/20 dark:bg-white/20 mb-8"></div>
              
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-6 text-black dark:text-white">Acerca de la Propiedad</h4>
              <div className="text-[14px] text-black/70 dark:text-white/70 font-[family-name:var(--font-quicksand)] leading-loose mb-12 whitespace-pre-wrap break-words">
                {previewProperty.description || "Póngase en contacto con nosotros para obtener más información exclusiva sobre esta propiedad de lujo."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
