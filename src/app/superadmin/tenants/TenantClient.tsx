"use client";

import { useState } from "react";
import { Plus, UserPlus, Globe, Settings } from "lucide-react";

type Tenant = {
  id: string;
  name: string;
  domain: string;
  siteSettings?: string;
  isActive?: boolean;
  createdAt: Date;
  _count: { users: number; properties: number };
};

export default function TenantClient({ initialTenants }: { initialTenants: any[] }) {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);

  const [tenantName, setTenantName] = useState("");
  const [tenantDomain, setTenantDomain] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    agentPhoto: "",
    agentTitle: "",
    contactEmail: "",
    contactPhone: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    tiktokUrl: ""
  });

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/superadmin/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: tenantName, 
          domain: tenantDomain,
          userEmail: userEmail,
          userPassword: userPassword,
          userName: userName,
          siteSettings: settingsForm
        }),
      });
      if (!res.ok) throw new Error("Error creating tenant");
      
      const newTenant = await res.json();
      setTenants([newTenant, ...tenants]);
      setShowTenantModal(false);
      setTenantName("");
      setTenantDomain("");
      setUserEmail("");
      setUserPassword("");
      setUserName("");
      setSettingsForm({
        agentPhoto: "", agentTitle: "", contactEmail: "", contactPhone: "", facebookUrl: "", instagramUrl: "", youtubeUrl: "", tiktokUrl: ""
      });
      alert("Inquilino y Configuración creados exitosamente.");
    } catch (error) {
      alert("Error al crear inquilino. Asegúrate de que el dominio sea único y el correo no exista.");
    }
  };

  const openSettingsModal = (tenant: Tenant) => {
    setSelectedTenantId(tenant.id);
    setTenantName(tenant.name);
    setTenantDomain(tenant.domain);
    let parsed: any = {};
    try {
      parsed = JSON.parse(tenant.siteSettings || "{}");
    } catch(e) {}
    
    setSettingsForm({
      agentPhoto: parsed.agentPhoto || "",
      agentTitle: parsed.agentTitle || "",
      contactEmail: parsed.contactEmail || "",
      contactPhone: parsed.contactPhone || "",
      facebookUrl: parsed.facebookUrl || "",
      instagramUrl: parsed.instagramUrl || "",
      youtubeUrl: parsed.youtubeUrl || "",
      tiktokUrl: parsed.tiktokUrl || ""
    });
    setShowSettingsModal(true);
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenantId) return;

    try {
      const res = await fetch(`/api/superadmin/tenants/${selectedTenantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: tenantName, 
          domain: tenantDomain,
          siteSettings: JSON.stringify(settingsForm)
        }),
      });
      if (!res.ok) throw new Error("Error updating tenant");
      
      const updatedTenant = await res.json();
      alert("Configuración actualizada exitosamente.");
      setShowSettingsModal(false);
      
      // Update locally
      setTenants(tenants.map(t => t.id === selectedTenantId ? { ...t, ...updatedTenant } : t));
    } catch (error) {
      alert("Error al actualizar la configuración.");
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    if (!confirm(`¿Estás seguro de que deseas ${currentStatus ? 'PAUSAR' : 'REACTIVAR'} este inquilino?`)) return;
    try {
      const res = await fetch(`/api/superadmin/tenants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (!res.ok) throw new Error("Error toggling tenant status");
      
      setTenants(tenants.map(t => t.id === id ? { ...t, isActive: !currentStatus } : t));
    } catch (error) {
      alert("Error al cambiar el estado del inquilino.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¡ADVERTENCIA! ¿Estás ABSOLUTAMENTE SEGURO de que deseas ELIMINAR este inquilino? Esta acción borrará todas sus propiedades, usuarios y configuraciones para siempre.")) return;
    try {
      const res = await fetch(`/api/superadmin/tenants/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Error deleting tenant");
      
      setTenants(tenants.filter(t => t.id !== id));
      alert("Inquilino eliminado exitosamente.");
    } catch (error) {
      alert("Error al eliminar el inquilino.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("images", file); // existing route expects 'images'

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error subiendo imagen");
      
      const data = await res.json();
      if (data.urls && data.urls.length > 0) {
        setSettingsForm({ ...settingsForm, agentPhoto: data.urls[0] });
      }
    } catch (error) {
      alert("Error al subir la imagen.");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => {
            setTenantName(""); setTenantDomain(""); setUserEmail(""); setUserPassword(""); setUserName("");
            setSettingsForm({agentPhoto: "", agentTitle: "", contactEmail: "", contactPhone: "", facebookUrl: "", instagramUrl: "", youtubeUrl: "", tiktokUrl: ""});
            setShowTenantModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 rounded hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Inquilino
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-neutral-950 border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold">Agencia</th>
              <th className="px-6 py-4 font-semibold">Dominio (URL)</th>
              <th className="px-6 py-4 font-semibold">Usuarios</th>
              <th className="px-6 py-4 font-semibold">Propiedades</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {tenant.name.substring(0,2).toUpperCase()}
                  </div>
                  {tenant.name}
                </td>
                <td className="px-6 py-4">
                  <a href={`http://${tenant.domain}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {tenant.domain}
                  </a>
                </td>
                <td className="px-6 py-4">{tenant._count.users}</td>
                <td className="px-6 py-4">{tenant._count.properties}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${tenant.isActive ?? true ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {tenant.isActive ?? true ? 'Activo' : 'Pausado'}
                  </span>
                </td>
                <td className="px-6 py-4 flex flex-col gap-2">
                  <button 
                    onClick={() => openSettingsModal(tenant)}
                    className="text-xs flex items-center justify-center gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1.5 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    <Settings className="w-3 h-3" /> Editar
                  </button>
                  <button 
                    onClick={() => handleToggleActive(tenant.id, tenant.isActive ?? true)}
                    className="text-xs flex items-center justify-center gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1.5 rounded hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
                  >
                    {tenant.isActive ?? true ? 'Pausar' : 'Reactivar'}
                  </button>
                  <button 
                    onClick={() => handleDelete(tenant.id)}
                    className="text-xs flex items-center justify-center gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {tenants.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No tienes inquilinos todavía. ¡Crea el primero!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tenant Modal COMPLETO */}
      {showTenantModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-lg w-full max-w-3xl my-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Plus className="w-6 h-6"/> Crear Nuevo Inquilino (Perfil Completo)</h2>
            <form onSubmit={handleCreateTenant} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna Izquierda: Datos del Entorno */}
                <div className="space-y-4">
                  <h3 className="font-semibold border-b border-black/10 dark:border-white/10 pb-2">1. Entorno de la Agencia</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre de la Agencia</label>
                    <input required type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="Ej. Soto Realty" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Dominio Web</label>
                    <input required type="text" value={tenantDomain} onChange={(e) => setTenantDomain(e.target.value)} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="Ej. soto.localhost:3000" />
                  </div>

                  <h3 className="font-semibold border-b border-black/10 dark:border-white/10 pb-2 mt-6">2. Acceso del Agente</h3>
                  <p className="text-xs text-gray-500">Opcional. Si lo dejas en blanco, no se creará un usuario de acceso.</p>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre Completo del Agente</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="Ej. Carlos Soto" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email (Para iniciar sesión)</label>
                    <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="agente@correo.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contraseña</label>
                    <input type="text" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="********" />
                  </div>
                </div>

                {/* Columna Derecha: Configuración Pública */}
                <div className="space-y-4">
                  <h3 className="font-semibold border-b border-black/10 dark:border-white/10 pb-2">3. Perfil Público (Página Web)</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Foto de Perfil</label>
                    <div className="flex gap-2">
                      <input type="text" value={settingsForm.agentPhoto} onChange={(e) => setSettingsForm({...settingsForm, agentPhoto: e.target.value})} className="flex-1 border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="URL o subir archivo..." />
                      <label className="bg-blue-600 text-white px-3 py-2 rounded text-sm cursor-pointer hover:bg-blue-700 flex items-center justify-center shrink-0">
                        Subir Imagen
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    {settingsForm.agentPhoto && (
                      <img src={settingsForm.agentPhoto} alt="Preview" className="w-16 h-16 object-cover rounded-full mt-2 border border-black/10 dark:border-white/10" />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Título / Eslogan</label>
                    <input type="text" value={settingsForm.agentTitle} onChange={(e) => setSettingsForm({...settingsForm, agentTitle: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="Ej. Especialista Inmobiliario" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email de Contacto Público</label>
                    <input type="email" value={settingsForm.contactEmail} onChange={(e) => setSettingsForm({...settingsForm, contactEmail: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="contacto@agencia.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Teléfono (WhatsApp)</label>
                    <input type="text" value={settingsForm.contactPhone} onChange={(e) => setSettingsForm({...settingsForm, contactPhone: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="+506 6000 0000" />
                  </div>
                  
                  <h3 className="font-semibold border-b border-black/10 dark:border-white/10 pb-2 mt-6">4. Redes Sociales</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={settingsForm.facebookUrl} onChange={(e) => setSettingsForm({...settingsForm, facebookUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="Facebook URL" />
                    <input type="text" value={settingsForm.instagramUrl} onChange={(e) => setSettingsForm({...settingsForm, instagramUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="Instagram URL" />
                    <input type="text" value={settingsForm.youtubeUrl} onChange={(e) => setSettingsForm({...settingsForm, youtubeUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="YouTube URL" />
                    <input type="text" value={settingsForm.tiktokUrl} onChange={(e) => setSettingsForm({...settingsForm, tiktokUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="TikTok URL" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-black/10 dark:border-white/10">
                <button type="button" onClick={() => setShowTenantModal(false)} className="px-6 py-2 border rounded border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors shadow-lg">Crear Inquilino y Generar Web</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-lg w-full max-w-2xl my-auto">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="w-5 h-5"/> Configurar Agente / Inquilino</h2>
            <form onSubmit={handleUpdateSettings} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre (URL)</label>
                  <input required type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dominio Web</label>
                  <input required type="text" value={tenantDomain} onChange={(e) => setTenantDomain(e.target.value)} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" />
                </div>
              </div>

              <div className="border-t border-black/10 dark:border-white/10 pt-4 mt-4">
                <h3 className="font-semibold mb-3">Información Pública del Agente</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Foto de Perfil</label>
                    <div className="flex gap-2">
                      <input type="text" value={settingsForm.agentPhoto} onChange={(e) => setSettingsForm({...settingsForm, agentPhoto: e.target.value})} className="flex-1 border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="URL o subir archivo..." />
                      <label className="bg-blue-600 text-white px-3 py-2 rounded text-sm cursor-pointer hover:bg-blue-700 flex items-center justify-center shrink-0">
                        Subir Imagen
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    {settingsForm.agentPhoto && (
                      <img src={settingsForm.agentPhoto} alt="Preview" className="w-16 h-16 object-cover rounded-full mt-2 border border-black/10 dark:border-white/10" />
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Título del Agente</label>
                    <input type="text" value={settingsForm.agentTitle} onChange={(e) => setSettingsForm({...settingsForm, agentTitle: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="Ej. Especialista Inmobiliario" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email de Contacto</label>
                    <input type="email" value={settingsForm.contactEmail} onChange={(e) => setSettingsForm({...settingsForm, contactEmail: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="contacto@agencia.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Teléfono (WhatsApp)</label>
                    <input type="text" value={settingsForm.contactPhone} onChange={(e) => setSettingsForm({...settingsForm, contactPhone: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" placeholder="+506 6000 0000" />
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 dark:border-white/10 pt-4 mt-4">
                <h3 className="font-semibold mb-3">Redes Sociales</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Facebook URL</label>
                    <input type="text" value={settingsForm.facebookUrl} onChange={(e) => setSettingsForm({...settingsForm, facebookUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram URL</label>
                    <input type="text" value={settingsForm.instagramUrl} onChange={(e) => setSettingsForm({...settingsForm, instagramUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">YouTube URL</label>
                    <input type="text" value={settingsForm.youtubeUrl} onChange={(e) => setSettingsForm({...settingsForm, youtubeUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">TikTok URL</label>
                    <input type="text" value={settingsForm.tiktokUrl} onChange={(e) => setSettingsForm({...settingsForm, tiktokUrl: e.target.value})} className="w-full border p-2 rounded dark:bg-neutral-950 dark:border-neutral-800 text-sm" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4">
                <button type="button" onClick={() => setShowSettingsModal(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
