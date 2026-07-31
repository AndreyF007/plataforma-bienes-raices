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

const PROVINCES_DATA = [
  {
    name: "San José",
    description: "Capital y corazón del país. Incluye 20 cantones oficiales.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Teatro_Nacional_de_Costa_Rica.jpg",
    cantons: [
      "San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés Castro"
    ]
  },
  {
    name: "Alajuela",
    description: "Tierra de volcanes, aeropuerto, parques exóticos y llanuras. 16 cantones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Juan_Santamaria_Statue_Alajuela.jpg/800px-Juan_Santamaria_Statue_Alajuela.jpg",
    cantons: [
      "Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"
    ]
  },
  {
    name: "Cartago",
    description: "Antigua metrópoli, historia colonial, valles exuberantes e Irazú. 8 cantones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg/1280px-Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg",
    cantons: [
      "Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"
    ]
  },
  {
    name: "Heredia",
    description: "La Ciudad de las Flores, montañas del Barva y bosques lluviosos. 10 cantones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/El_Fort%C3%ADn_Heredia_Costa_Rica.jpg/1280px-El_Fort%C3%ADn_Heredia_Costa_Rica.jpg",
    cantons: [
      "Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"
    ]
  },
  {
    name: "Guanacaste",
    description: "La pampa del Pacífico Norte, playas paradisíacas de arena dorada. 11 cantones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tamarindo_Beach_Costa_Rica.jpg/1280px-Tamarindo_Beach_Costa_Rica.jpg",
    cantons: [
      "Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"
    ]
  },
  {
    name: "Puntarenas",
    description: "La Perla del Pacífico, Manuel Antonio, Monteverde y Corcovado. 13 cantones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Manuel_Antonio_Beach_Costa_Rica.jpg/1280px-Manuel_Antonio_Beach_Costa_Rica.jpg",
    cantons: [
      "Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito", "Monteverde", "Puerto Jiménez"
    ]
  },
  {
    name: "Limón",
    description: "La costa del Caribe, biodiversidad en Puerto Viejo y Tortuguero. 6 cantones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Puerto_Viejo_de_Talamanca_Beach.jpg/1280px-Puerto_Viejo_de_Talamanca_Beach.jpg",
    cantons: [
      "Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"
    ]
  }
];

const DEFAULT_CANTON_IMAGES: Record<string, string> = {
  "San José": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Teatro_Nacional_de_Costa_Rica.jpg",
  "Escazú": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Church_of_San_Miguel_in_Escazu.jpg",
  "Desamparados": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Catedral_de_Nuestra_Se%C3%B1ora_de_los_Desamparados.jpg",
  "Puriscal": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ruinas_de_la_Antigua_Iglesia_de_Puriscal.jpg",
  "Tarrazú": "https://upload.wikimedia.org/wikipedia/commons/3/33/San_Marcos_de_Tarraz%C3%BAn%2C_Costa_Rica.jpg",
  "Aserrí": "https://upload.wikimedia.org/wikipedia/commons/9/90/Vista_de_Aserri_y_sus_monta%C3%B1as.jpg",
  "Mora": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Ciudad_Col%C3%B3n_centro.jpg",
  "Goicoechea": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Guadalupe_Goicoechea_parque.jpg",
  "Santa Ana": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Valley_of_Santa_Ana%2C_Costa_Rica.jpg",
  "Alajuelita": "https://upload.wikimedia.org/wikipedia/commons/8/8e/La_Cruz_de_Alajuelita_Cerro_San_Miguel.jpg",
  "Vázquez de Coronado": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Iglesia_de_Coronado_Costa_Rica.jpg",
  "Acosta": "https://upload.wikimedia.org/wikipedia/commons/5/5e/San_Ignacio_de_Acosta_templo.jpg",
  "Tibás": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Estadio_Ricardo_Saprissa.jpg",
  "Moravia": "https://upload.wikimedia.org/wikipedia/commons/d/df/San_Vicente_de_Moravia_iglesia.jpg",
  "Montes de Oca": "https://upload.wikimedia.org/wikipedia/commons/6/64/Fuente_de_la_Hispanidad_Costa_Rica.jpg",
  "Turrubares": "https://upload.wikimedia.org/wikipedia/commons/2/25/San_Pablo_de_Turrubares_Costa_Rica.jpg",
  "Dota": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Santa_Maria_de_Dota_Costa_Rica.jpg",
  "Curridabat": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Curridabat_centro_iglesia.jpg",
  "Pérez Zeledón": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Cerro_Chirrip%C3%B3_Costa_Rica.jpg",
  "León Cortés Castro": "https://upload.wikimedia.org/wikipedia/commons/0/02/San_Pablo_de_Leon_Cortes.jpg",
  "Alajuela": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Juan_Santamaria_Statue_Alajuela.jpg/800px-Juan_Santamaria_Statue_Alajuela.jpg",
  "San Ramón": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/San_Ramon_Costa_Rica_Church.jpg/800px-San_Ramon_Costa_Rica_Church.jpg",
  "Grecia": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Metal_Church_Grecia_Costa_Rica.jpg/800px-Metal_Church_Grecia_Costa_Rica.jpg",
  "San Carlos": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg/800px-Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg",
  "Zarcero": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Zarcero_Topiary_Park_Costa_Rica.jpg/800px-Zarcero_Topiary_Park_Costa_Rica.jpg",
  "Sarchí": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sarchi_Oxcart_Costa_Rica.jpg/800px-Sarchi_Oxcart_Costa_Rica.jpg",
  "Cartago": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg/800px-Bas%C3%ADlica_de_Nuestra_Se%C3%B1ora_de_los_%C3%81ngeles_Cartago_Costa_Rica.jpg",
  "Heredia": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/El_Fort%C3%ADn_Heredia_Costa_Rica.jpg/800px-El_Fort%C3%ADn_Heredia_Costa_Rica.jpg",
  "Liberia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liberia_Costa_Rica_Colonial_Architecture.jpg/800px-Liberia_Costa_Rica_Colonial_Architecture.jpg",
  "Puntarenas": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Paseo_de_los_Turistas_Puntarenas.jpg/800px-Paseo_de_los_Turistas_Puntarenas.jpg",
  "Limón": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Puerto_Limon_Coast_Costa_Rica.jpg/800px-Puerto_Limon_Coast_Costa_Rica.jpg"
};

export default function ZoneList({ initialZones }: { initialZones: Zone[] }) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
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

  const handleOpenModal = (zone?: Zone, initialTab = 'basic', prefilledName?: string, prefilledImg?: string) => {
    setActiveTab(initialTab);
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
      const defaultImg = prefilledImg || (prefilledName ? (DEFAULT_CANTON_IMAGES[prefilledName] || "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg/800px-Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg") : "");
      setFormData({ 
        name: prefilledName || "", 
        image: defaultImg, 
        coverImage: defaultImg, 
        description: prefilledName ? `Hermoso cantón de la provincia y gran zona para vivir y adquirir propiedad.` : "", 
        population: "", medianAge: "", avgIncome: "", 
        walkScore: "80", bikeScore: "70", videos: "" 
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

  const currentProvinceData = selectedProvince ? PROVINCES_DATA.find(p => p.name === selectedProvince) : null;
  
  const getCantonsToRender = () => {
    if (searchTerm.trim() !== "") {
      const allCantons = PROVINCES_DATA.flatMap(p => p.cantons.map(c => ({ cantonName: c, province: p.name })));
      return allCantons.filter(item => item.cantonName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (currentProvinceData) {
      return currentProvinceData.cantons.map(c => ({ cantonName: c, province: currentProvinceData.name }));
    }
    return [];
  };

  const cantonsList = getCantonsToRender();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white dark:bg-neutral-900 p-4 border border-gray-200 dark:border-neutral-800 shadow-sm">
        <div className="w-full sm:w-96">
          <input 
            type="text" 
            placeholder="🔍 Búsqueda rápida por cantón (ej. Escazú, Tamarindo)..." 
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              if (e.target.value.trim() !== "") setSelectedProvince("Búsqueda");
              else setSelectedProvince(null);
            }}
            className="w-full text-sm p-2.5 border border-gray-300 dark:border-white/20 bg-transparent outline-none focus:border-black dark:focus:border-white rounded-none"
          />
        </div>
        <button 
          onClick={() => handleOpenModal(undefined, 'basic')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-black/80 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Agregar Zona Personalizada
        </button>
      </div>

      {!selectedProvince && searchTerm.trim() === "" && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-1">🇨🇷 Selecciona una Provincia</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Haz clic en cualquiera de las <strong>7 provincias de Costa Rica</strong> para abrir el catálogo organizado de sus cantones individuales y editar sus fotos o textos de tarjeta de forma ordenada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PROVINCES_DATA.map((prov) => {
              const matchingZone = zones.find(z => z.name.toLowerCase() === prov.name.toLowerCase());
              const displayImg = matchingZone?.image || prov.image;

              return (
                <div 
                  key={prov.name} 
                  onClick={() => setSelectedProvince(prov.name)}
                  className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-md flex flex-col relative overflow-hidden group cursor-pointer hover:border-black dark:hover:border-white transition-all transform hover:-translate-y-1"
                >
                  <div className="h-56 bg-gray-100 dark:bg-neutral-900 relative">
                    <img src={displayImg} alt={prov.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-end p-5">
                       <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-black px-2 py-0.5 w-max mb-1.5 shadow-sm">
                         {prov.cantons.length} Cantones
                       </span>
                       <h3 className="text-white font-bold uppercase tracking-[0.2em] text-2xl drop-shadow-md">{prov.name}</h3>
                       <p className="text-white/80 text-xs mt-1 font-light leading-relaxed line-clamp-2">{prov.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3.5 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between text-xs uppercase tracking-wider font-bold text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                    <span>📂 Ver {prov.name}</span>
                    <span>➡️</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(selectedProvince || searchTerm.trim() !== "") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 dark:bg-neutral-900 p-5 border border-gray-200 dark:border-neutral-800 shadow-sm">
            <div>
              <button 
                onClick={() => { setSelectedProvince(null); setSearchTerm(""); }} 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline uppercase tracking-widest mb-2"
              >
                ⬅️ Volver a las 7 Provincias de Costa Rica
              </button>
              <h2 className="text-xl font-light uppercase tracking-[0.15em] text-black dark:text-white">
                {searchTerm.trim() !== "" ? (
                  <span>Resultados para: <strong className="font-bold">"{searchTerm}"</strong></span>
                ) : (
                  <span>Cantones de la Provincia: <strong className="font-bold text-amber-600 dark:text-amber-400">{selectedProvince}</strong></span>
                )}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Aquí puedes editar la información y subir las fotos individuales de la tarjeta y portada de cada cantón.
              </p>
            </div>

            {currentProvinceData && (
              <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 px-4 py-2.5 text-right shrink-0">
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Total en esta provincia</span>
                <span className="text-lg font-bold uppercase tracking-widest text-black dark:text-white">{currentProvinceData.cantons.length} Cantones</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cantonsList.map(({ cantonName, province }) => {
              const matchedZone = zones.find(z => z.name.toLowerCase() === cantonName.toLowerCase());
              const isCustomized = !!matchedZone;
              const displayImg = matchedZone ? (matchedZone.image || matchedZone.coverImage) : (DEFAULT_CANTON_IMAGES[cantonName] || "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg/800px-Volc%C3%A1n_Arenal_desde_el_lago_Arenal.jpg");
              const displayDesc = matchedZone?.description ? matchedZone.description : `Cantón perteneciente a la provincia de ${province}.`;

              return (
                <div key={cantonName} className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col relative overflow-hidden group">
                  <div className="h-48 bg-gray-100 dark:bg-neutral-900 relative">
                    <img src={displayImg as string} alt={cantonName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                       <div className="flex items-center justify-between gap-2 mb-1">
                         <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">{province}</span>
                         {isCustomized ? (
                           <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-none uppercase tracking-widest font-bold shadow">Guardada en DB</span>
                         ) : (
                           <span className="text-[9px] bg-black/60 text-gray-300 border border-white/20 px-2 py-0.5 rounded-none uppercase tracking-widest">Foto oficial tica</span>
                         )}
                       </div>
                       <h3 className="text-white font-bold uppercase tracking-[0.15em] text-lg leading-tight">{cantonName}</h3>
                       <p className="text-white/80 text-[11px] truncate mt-0.5">{displayDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 divide-x divide-gray-100 dark:divide-neutral-800">
                    <button 
                      onClick={() => handleOpenModal(matchedZone, 'multimedia', cantonName, displayImg as string)}
                      className="flex-1 py-3 text-[11px] uppercase tracking-wider font-bold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors flex items-center justify-center gap-1.5"
                      title={`Cambiar fotos de tarjeta y hero para ${cantonName}`}
                    >
                      🖼️ Fotos
                    </button>
                    <button 
                      onClick={() => handleOpenModal(matchedZone, 'basic', cantonName, displayImg as string)}
                      className="flex-1 py-3 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" /> Info / Textos
                    </button>
                    {isCustomized && (
                      <button 
                        onClick={() => handleDelete(matchedZone.id)}
                        className="py-3 px-3.5 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 transition-colors"
                        title="Eliminar de la base de datos"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {cantonsList.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800">
                No se encontró ningún cantón que coincida con la búsqueda.
              </div>
            )}
          </div>
        </div>
      )}

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

            <div className="flex border-b border-gray-100 dark:border-neutral-800 px-6 overflow-x-auto">
              {[
                { id: 'multimedia', label: '🖼️ FOTOS Y PORTADAS' },
                { id: 'basic', label: '📝 Info y Descripción' },
                { id: 'stats', label: '📊 Estadísticas' },
                { id: 'lifestyle', label: '✨ Estilo de Vida' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 text-xs uppercase tracking-widest font-bold border-b-2 whitespace-nowrap transition-colors ${
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
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-sm">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-400 mb-1">💡 Gestión de Fotos de este Cantón</h4>
                    <p className="text-[12px] text-amber-800/80 dark:text-amber-300/80">
                      Sube o cambia aquí las fotos que representarán a <strong>{formData.name || 'esta zona'}</strong> en la plataforma. Al guardar, los cambios se reflejarán instantáneamente en todo el catálogo de comunidades.
                    </p>
                  </div>
                  <div className="border border-gray-100 dark:border-neutral-800 p-4 bg-gray-50/50 dark:bg-neutral-900/50">
                    <ImageUpload 
                      label="1. Foto de la Tarjeta (Miniatura en parrilla /comunidades)"
                      value={formData.image}
                      onChange={url => setFormData({...formData, image: url as string})}
                    />
                  </div>
                  <div className="border border-gray-100 dark:border-neutral-800 p-4 bg-gray-50/50 dark:bg-neutral-900/50">
                    <ImageUpload 
                      label="2. Foto de Portada / Hero 4K (Fondo panorámico al abrir el cantón)"
                      value={formData.coverImage}
                      onChange={url => setFormData({...formData, coverImage: url as string})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">IDs de Videos de YouTube (Uno por línea - Opcional)</label>
                    <textarea 
                      value={formData.videos}
                      onChange={e => setFormData({...formData, videos: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none min-h-[80px] transition-colors" 
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
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-500">Ingreso Promedio Individual (Mensual)</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const val = formData.avgIncome ? formData.avgIncome.replace(/^(\$|₡)\s*/, '') : '680,000';
                            setFormData({...formData, avgIncome: `₡${val}`});
                          }}
                          className="px-3 py-1 text-[11px] font-semibold bg-emerald-600 text-white rounded shadow-sm hover:bg-emerald-700 transition-colors flex items-center gap-1"
                        >
                          <span>Establecer Moneda Oficial: Colón (₡)</span>
                        </button>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      value={formData.avgIncome}
                      onChange={e => setFormData({...formData, avgIncome: e.target.value})}
                      className="w-full border border-gray-300 dark:border-white/20 bg-transparent p-3 text-sm focus:border-black dark:focus:border-white outline-none font-medium" 
                      placeholder="Ej. ₡680,000 (Salario promedio mensual según INEC)"
                    />
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      💡 <strong>Dato Automático:</strong> Si dejas este campo en blanco o contuvo un símbolo de dólar antiguo de pruebas, el sistema protegerá la pantalla y colocará automáticamente el promedio salarial real estimado por el <strong>INEC</strong> estrictamente en <strong>Colones Costarricenses (₡)</strong> para el cantón seleccionado.
                    </p>
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
