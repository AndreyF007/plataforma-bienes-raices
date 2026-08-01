import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = file.type || "image/jpeg";
      
      // En entornos Serverless en la nube (como Vercel), el disco de sistema es de SOLO LECTURA (Read-Only).
      // Al convertir la imagen en un Data URL (Base64), garantizamos que se pueda guardar directamente
      // de manera nativa y permanente dentro de la base de datos PostgreSQL del portal, sin depender 
      // ni requerir servicios externos de almacenamiento en la nube ni fallar por bloqueos de disco.
      const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;
      
      try {
        // Opcional: Si el servidor corre de manera local con acceso de escritura al disco, creamos un respaldo en disco
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadDir, { recursive: true });
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + "-" + file.name.replace(/\s+/g, "_");
        const filepath = path.join(uploadDir, filename);
        await fs.writeFile(filepath, buffer);
      } catch (fsError) {
        // Ignoramos silenciosamente la restricción EROFS (Read-Only) al correr en los clústers de Vercel
      }
      
      uploadedUrls.push(base64Url);
    }

    return NextResponse.json({ urls: uploadedUrls }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
