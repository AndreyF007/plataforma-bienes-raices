"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string | null;
  published: boolean;
  createdAt: Date;
};

export default function BlogList({ initialPosts, tenantId }: { initialPosts: BlogPost[], tenantId: string }) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setCategory("General");
    setContent("");
    setImage("");
    setPublished(false);
    setEditingId(null);
    setError("");
    setSelectedFile(null);
  };

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingId(post.id);
      setTitle(post.title);
      setSlug(post.slug);
      setCategory(post.category);
      setContent(post.content);
      setImage(post.image || "");
      setPublished(post.published);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           
      .replace(/[^\w\-]+/g, '')       
      .replace(/\-\-+/g, '-')         
      .replace(/^-+/, '')             
      .replace(/-+$/, '');            
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!title || !slug || !content) {
      setError("Título, slug y contenido son requeridos.");
      setIsLoading(false);
      return;
    }

    try {
      let finalImageUrl = image;

      if (selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("images", selectedFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formDataUpload });
        if (!uploadRes.ok) throw new Error("Fallo al subir la imagen");
        const uploadData = await uploadRes.json();
        if (uploadData.urls && uploadData.urls.length > 0) {
          finalImageUrl = uploadData.urls[0];
        }
      }

      const payload = { title, slug, category, content, image: finalImageUrl, published };
      let res;
      
      if (editingId) {
        res = await fetch(`/api/admin/blog/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`/api/admin/blog`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar el artículo");
      }

      const refreshRes = await fetch(`/api/admin/blog`);
      const refreshData = await refreshRes.json();
      setPosts(refreshData.posts || []);
      
      setIsModalOpen(false);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este artículo?")) return;
    
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Error al eliminar");
      
      setPosts(posts.filter(p => p.id !== id));
      router.refresh();
    } catch (err) {
      alert("Error al eliminar el artículo.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-black dark:text-white">Artículos Publicados ({posts.length})</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 text-sm tracking-wider uppercase font-medium hover:bg-blue-700 transition-colors rounded shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Artículo
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
          <thead className="bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium text-black dark:text-white">Imagen</th>
              <th className="px-6 py-4 font-medium text-black dark:text-white">Título</th>
              <th className="px-6 py-4 font-medium text-black dark:text-white">Categoría</th>
              <th className="px-6 py-4 font-medium text-black dark:text-white">Estado</th>
              <th className="px-6 py-4 font-medium text-black dark:text-white">Fecha</th>
              <th className="px-6 py-4 font-medium text-black dark:text-white text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                <td className="px-6 py-4">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-16 h-12 object-cover bg-neutral-200" />
                  ) : (
                    <div className="w-16 h-12 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px]">No img</div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-black dark:text-white">{post.title}</td>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4">
                  {post.published ? (
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium"><CheckCircle className="w-3 h-3"/> Publicado</span>
                  ) : (
                    <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-xs font-medium"><XCircle className="w-3 h-3"/> Borrador</span>
                  )}
                </td>
                <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleOpenModal(post)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Editar">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                  No hay artículos publicados. ¡Crea el primero!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center sticky top-0 bg-white dark:bg-neutral-950 z-10">
              <h3 className="text-xl font-light tracking-widest uppercase text-black dark:text-white">
                {editingId ? 'Editar Artículo' : 'Nuevo Artículo'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-black dark:hover:text-white">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
              {error && <div className="p-4 bg-red-100 text-red-700 text-sm">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Título</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingId) setSlug(generateSlug(e.target.value));
                    }}
                    className="p-3 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-black dark:focus:border-white w-full"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">URL Slug</label>
                  <input 
                    type="text" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)}
                    className="p-3 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-black dark:focus:border-white w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Categoría</label>
                  <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-black dark:focus:border-white w-full"
                    placeholder="Ej. Mercado Inmobiliario"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Estado</label>
                  <select 
                    value={published ? "true" : "false"} 
                    onChange={(e) => setPublished(e.target.value === "true")}
                    className="p-3 bg-transparent border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-black dark:focus:border-white w-full text-black dark:text-white"
                  >
                    <option value="false" className="text-black">Borrador</option>
                    <option value="true" className="text-black">Publicado</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Imagen de Portada</label>
                <div className="flex items-center gap-4">
                  {selectedFile ? (
                    <div className="w-32 h-20 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-xs text-neutral-500 overflow-hidden px-2 text-center">
                      {selectedFile.name}
                    </div>
                  ) : image ? (
                    <img src={image} alt="Preview" className="w-32 h-20 object-cover border border-neutral-300 dark:border-neutral-700" />
                  ) : null}
                  <label className="cursor-pointer flex items-center justify-center px-6 py-3 border border-black dark:border-white text-xs uppercase tracking-wider font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                    {selectedFile || image ? "Cambiar Imagen" : "Subir Imagen"}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Contenido del Artículo</label>
                <div className="bg-white text-black border border-neutral-300 dark:border-neutral-700 min-h-[400px] quill-editor-wrapper">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    style={{ height: '350px', background: 'white', color: 'black' }}
                    modules={{
                      toolbar: [
                        [{ 'header': [2, 3, 4, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'clean']
                      ],
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-sm tracking-wider uppercase font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm tracking-wider uppercase font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? 'Guardando...' : 'Guardar Artículo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
