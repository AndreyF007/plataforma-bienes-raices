"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string | string[];
  onChange: (urls: string | string[]) => void;
  multiple?: boolean;
}

export default function ImageUpload({ label, value, onChange, multiple = false }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = Array.isArray(value) ? value : value ? [value] : [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const uploadedUrls = data.urls;

      if (multiple) {
        onChange([...images, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
    } catch (error) {
      console.error(error);
      alert("Error al subir la imagen. Por favor, intenta de nuevo.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (urlToRemove: string) => {
    if (multiple) {
      onChange(images.filter((url) => url !== urlToRemove));
    } else {
      onChange("");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500">
        {label}
      </label>

      {/* Galería de imágenes existentes */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, idx) => (
            <div key={idx} className="relative aspect-video group bg-gray-100 border border-gray-200">
              <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Botón de subida */}
      {(!value || (multiple && value)) && (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-gray-300 dark:border-neutral-700 p-8 text-center cursor-pointer hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors flex flex-col items-center justify-center gap-3 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8 text-gray-400" />
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400 font-[family-name:var(--font-quicksand)]">
            {isUploading ? (
              <span>Subiendo archivo...</span>
            ) : (
              <span>
                <span className="font-bold text-black dark:text-white">Toca aquí</span> para abrir tu galería o explorador de archivos
              </span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple={multiple}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
