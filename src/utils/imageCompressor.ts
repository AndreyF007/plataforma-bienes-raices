/**
 * Comprime y redimensiona imágenes del lado del cliente antes de ser enviadas a /api/upload o almacenadas como Base64.
 * Garantiza que fotos pesadas (ej. 5MB a 15MB tomadas con celular o cámara) se reduzcan automáticamente a ~150-250KB en resolución HD (max 1600px).
 * Esto evita errores 413 Payload Too Large en Vercel Serverless, asegura un guardado casi instantáneo en PostgreSQL y previene pantallas negras o fallos de carga en el celular y la PC.
 */
export async function compressImage(file: File, maxDimension = 1600, quality = 0.82): Promise<Blob> {
  // Si no es un formato de imagen procesable en canvas (o si es GIF animado/SVG), devolver original
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // Redimensionar proporcionalmente si excede maxDimension
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(file); // Fallback al archivo original si falla el contexto de dibujo
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Exportar como JPEG optimizado para web
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            resolve(blob);
          } else {
            resolve(file); // Si la compresión no logró reducir peso, usar archivo original
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // Ante cualquier error de carga en memoria, continuar con el archivo original
    };

    img.src = objectUrl;
  });
}
