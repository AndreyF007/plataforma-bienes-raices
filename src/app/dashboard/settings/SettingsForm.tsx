"use client";

import { useState } from "react";
import { Loader2, Save, LayoutTemplate, UserCircle, MessageSquare, Phone, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

interface SettingsFormProps {
  initialName: string;
  initialHeroTitle: string;
  initialHeroImage: string;
  initialSiteSettings: string;
}

export default function SettingsForm({ initialName, initialHeroTitle, initialHeroImage, initialSiteSettings }: SettingsFormProps) {
  
  const defaultSettings = {
    heroSubtitle: "AGENTE INMOBILIARIO DE LUJO",
    heroText: "El mercado inmobiliario de lujo se mueve rápido. Necesitas un guía que conozca cada barrio, gane las negociaciones y haga el proceso sin esfuerzo.",
    heroButton1Text: "BUSCAR PROPIEDADES",
    heroButton1Link: "/portal",
    heroButton2Text: "HABLEMOS",
    heroButton2Link: "mailto:info@example.com",
    
    aboutTitle: "TU GUÍA",
    aboutSubtitle: "ELENA LICARI",
    aboutImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1920&q=80",
    aboutText1: "Comprar o vender una casa de lujo en Silicon Valley es una de las decisiones más importantes que tomarás, y un agente inmobiliario inadecuado puede costarte cientos de miles de dólares.",
    aboutText2: "Cuenta con más de 15 años de experiencia en el sector inmobiliario, una trayectoria y un historial de ventas excepcional. Se especializa en las comunidades más codiciadas.",
    aboutText3: "Su método es sencillo: escuchar lo que realmente quieres, brindarte información honesta del mercado y negociar sin descanso en tu nombre. Sin presiones, sin rodeos, solo resultados.",
    aboutButton1Text: "VER PROPIEDADES",
    aboutButton2Text: "CONSULTA AHORA",
    
    statsSectionSubtitle: "LOGROS Y RECONOCIMIENTOS",
    statsSectionTitle: "¿POR QUÉ LOS CLIENTES CONFÍAN EN NOSOTROS?",
    
    newsletterTitle: "MERCADO EXCLUSIVO",
    newsletterText: "Únase a nuestra lista VIP y reciba acceso anticipado a propiedades fuera del mercado y análisis profundo del sector de lujo.",
    
    portalHeroSubtitle: "PROPIEDADES EXCLUSIVAS",
    portalHeroTitle: "Descubre nuestra selección de propiedades de lujo",
    
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "contacto@agencia.com",
    
    socialFacebook: "#",
    socialInstagram: "#",
    socialYoutube: "#",
    socialTiktok: "#",
    
    footerText: "Todos los derechos reservados. Luxury Real Estate.",
    
    statsList: [
      { value: "15+", label: "AÑOS DE EXPERIENCIA" },
      { value: "$50M+", label: "EN VENTAS TOTALES" },
      { value: "TOP 1%", label: "EN COSTA RICA" },
      { value: "200+", label: "FAMILIAS FELICES" }
    ]
  };

  let parsedSettings = defaultSettings;
  try {
    const parsed = JSON.parse(initialSiteSettings);
    parsedSettings = { ...defaultSettings, ...parsed };
  } catch(e) {}

  const [formData, setFormData] = useState({
    name: initialName,
    heroTitle: initialHeroTitle,
    heroImage: initialHeroImage
  });
  
  const [settings, setSettings] = useState(parsedSettings);
  const [activeTab, setActiveTab] = useState('hero');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        siteSettings: settings
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("¡Todos los cambios de la página fueron guardados exitosamente!");
        router.refresh();
      } else {
        alert("Error al guardar la configuración");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index: number, field: 'value' | 'label', val: string) => {
    setSettings(prev => {
      const newList = [...(prev.statsList || defaultSettings.statsList)];
      newList[index] = { ...newList[index], [field]: val };
      return { ...prev, statsList: newList };
    });
  };

  const tabs = [
    { id: 'hero', label: 'Portada (Hero)', icon: LayoutTemplate },
    { id: 'about', label: 'Sobre Nosotros', icon: UserCircle },
    { id: 'contact', label: 'Contacto & Redes', icon: Phone },
    { id: 'general', label: 'Textos Generales', icon: MessageSquare },
    { id: 'extra', label: 'Títulos Adicionales', icon: Type }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 p-4 text-sm uppercase tracking-widest font-bold transition-colors ${
                activeTab === tab.id 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'bg-gray-50 dark:bg-neutral-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:bg-neutral-800 hover:text-black dark:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
           <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Instrucciones</h4>
           <p className="text-xs text-gray-500 dark:text-gray-400 font-[family-name:var(--font-quicksand)] leading-relaxed">
             Todos los cambios que realices aquí se reflejarán instantáneamente en tu página de inicio pública. Si dejas un campo vacío, se mostrará el texto por defecto.
           </p>
        </div>
      </div>

      {/* Main Form Area */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-8">
        
        {/* TAB 1: HERO (Portada) */}
        {activeTab === 'hero' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-xl font-light uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-neutral-800 pb-4">Configuración de Portada</h2>
            </div>
            
            <div className="grid gap-6">
              <div>
                <ImageUpload 
                  label="Imagen de Fondo (Portada Principal)"
                  value={formData.heroImage}
                  onChange={url => setFormData({...formData, heroImage: url as string})}
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Título Gigante Principal</label>
                <input 
                  type="text" 
                  value={formData.heroTitle}
                  onChange={e => setFormData({...formData, heroTitle: e.target.value})}
                  className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Subtítulo Pequeño (Arriba del título)</label>
                <input 
                  type="text" name="heroSubtitle"
                  value={settings.heroSubtitle} onChange={handleSettingsChange}
                  className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Texto Descriptivo Principal</label>
                <textarea 
                  name="heroText" rows={3}
                  value={settings.heroText} onChange={handleSettingsChange}
                  className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)] leading-loose" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-neutral-900 p-4 border border-gray-100 dark:border-neutral-800">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Texto Botón 1</label>
                  <input type="text" name="heroButton1Text" value={settings.heroButton1Text} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Link Botón 1</label>
                  <input type="text" name="heroButton1Link" value={settings.heroButton1Link} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Texto Botón 2</label>
                  <input type="text" name="heroButton2Text" value={settings.heroButton2Text} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Link Botón 2</label>
                  <input type="text" name="heroButton2Link" value={settings.heroButton2Link} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-xl font-light uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-neutral-800 pb-4">Sección de Biografía</h2>
            </div>
            
            <div className="grid gap-6">
              <div>
                <ImageUpload 
                  label="Imagen de Perfil / Agencia"
                  value={settings.aboutImage}
                  onChange={url => setSettings({...settings, aboutImage: url as string})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Título de la sección</label>
                  <input type="text" name="aboutTitle" value={settings.aboutTitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Subtítulo (Tu Nombre Comercial)</label>
                  <input type="text" name="aboutSubtitle" value={settings.aboutSubtitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Párrafo Biográfico 1</label>
                <textarea name="aboutText1" rows={3} value={settings.aboutText1} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)] leading-loose" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Párrafo Biográfico 2</label>
                <textarea name="aboutText2" rows={3} value={settings.aboutText2} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)] leading-loose" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Párrafo Biográfico 3</label>
                <textarea name="aboutText3" rows={3} value={settings.aboutText3} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)] leading-loose" />
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-neutral-900 p-4 border border-gray-100 dark:border-neutral-800">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Botón Inferior 1 (Texto)</label>
                  <input type="text" name="aboutButton1Text" value={settings.aboutButton1Text} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Botón Inferior 2 (Texto)</label>
                  <input type="text" name="aboutButton2Text" value={settings.aboutButton2Text} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT & REDES */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-xl font-light uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-neutral-800 pb-4">Contacto y Redes Sociales</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800 space-y-4">
                 <h3 className="text-[10px] uppercase tracking-widest font-bold">Datos de Contacto</h3>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Teléfono</label>
                  <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                 </div>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Correo Electrónico</label>
                  <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                 </div>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Dirección de la Oficina</label>
                  <textarea name="officeAddress" value={settings.officeAddress} onChange={handleSettingsChange} rows={2} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)] resize-none" />
                 </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800 space-y-4">
                 <h3 className="text-[10px] uppercase tracking-widest font-bold">Enlaces de Redes (URLs)</h3>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Instagram</label>
                  <input type="text" name="socialInstagram" value={settings.socialInstagram} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                 </div>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Facebook</label>
                  <input type="text" name="socialFacebook" value={settings.socialFacebook} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                 </div>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">TikTok URL</label>
                  <input type="text" name="socialTiktok" value={settings.socialTiktok} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
               </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800 space-y-4">
                 <h3 className="text-[10px] uppercase tracking-widest font-bold">Perfil del Agente (Footer)</h3>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Foto del Agente (URL)</label>
                  <ImageUpload 
                    value={settings.agentPhoto || ""} 
                    onChange={(url) => setSettings({ ...settings, agentPhoto: url })} 
                    label="Subir Foto del Agente"
                  />
                 </div>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Título del Agente</label>
                  <input type="text" name="agentTitle" value={settings.agentTitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                 </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800 space-y-4">
                 <h3 className="text-[10px] uppercase tracking-widest font-bold">Aviso Legal (Disclaimer)</h3>
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Texto Legal (Footer)</label>
                  <textarea name="disclaimerText" value={settings.disclaimerText} onChange={handleSettingsChange} rows={8} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)] resize-y" />
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GENERAL */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-xl font-light uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-neutral-800 pb-4">Textos Generales del Sitio</h2>
            </div>
            
            <div className="grid gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Nombre de la Agencia (Navbar & Global)</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Texto del Footer (Copyright)</label>
                <input 
                  type="text" name="footerText"
                  value={settings.footerText} onChange={handleSettingsChange}
                  className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" 
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EXTRA TEXTS */}
        {activeTab === 'extra' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-xl font-light uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-neutral-800 pb-4">Títulos de Secciones Adicionales</h2>
            </div>
            
            <div className="grid gap-8">
              <div className="space-y-4 bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800">
                <h3 className="text-[10px] uppercase tracking-widest font-bold">Sección de Estadísticas (Logros)</h3>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Subtítulo Pequeño</label>
                  <input type="text" name="statsSectionSubtitle" value={settings.statsSectionSubtitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Título Gigante</label>
                  <input type="text" name="statsSectionTitle" value={settings.statsSectionTitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-4">Cifras y Datos (Los 4 logros)</label>
                  <div className="grid gap-3">
                    {(settings.statsList || defaultSettings.statsList).map((stat: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-1/3">
                          <input type="text" placeholder="Ej: 15+" value={stat.value} onChange={e => handleStatChange(idx, 'value', e.target.value)} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-bold" />
                        </div>
                        <div className="w-2/3">
                          <input type="text" placeholder="Ej: AÑOS DE EXPERIENCIA" value={stat.label} onChange={e => handleStatChange(idx, 'label', e.target.value)} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800">
                <h3 className="text-[10px] uppercase tracking-widest font-bold">Sección de Suscripción (Newsletter)</h3>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Título Principal</label>
                  <input type="text" name="newsletterTitle" value={settings.newsletterTitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Texto Descriptivo</label>
                  <textarea name="newsletterText" rows={2} value={settings.newsletterText} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 dark:bg-neutral-900 p-6 border border-gray-100 dark:border-neutral-800">
                <h3 className="text-[10px] uppercase tracking-widest font-bold">Portal de Propiedades (/portal)</h3>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Subtítulo Pequeño Superior</label>
                  <input type="text" name="portalHeroSubtitle" value={settings.portalHeroSubtitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Título Principal</label>
                  <input type="text" name="portalHeroTitle" value={settings.portalHeroTitle} onChange={handleSettingsChange} className="w-full bg-transparent border border-gray-300 dark:border-neutral-700 p-3 text-sm focus:border-black dark:border-white/20 outline-none font-[family-name:var(--font-quicksand)]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-gray-100 dark:border-neutral-800 sticky bottom-0 bg-white dark:bg-neutral-950 pb-4 z-10 flex justify-end">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-black text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-black/80 flex justify-center items-center gap-3 transition-colors shadow-xl disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isLoading ? 'PUBLICANDO CAMBIOS...' : 'GUARDAR Y PUBLICAR EN LA WEB'}
          </button>
        </div>
      </form>
    </div>
  );
}
