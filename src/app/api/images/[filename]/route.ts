import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mime from "mime";

export async function GET(req: NextRequest, props: { params: Promise<{ filename: string }> }) {
  const params = await props.params;
  const filename = params.filename;
  
  if (!filename) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filepath = path.join(uploadDir, filename);

  try {
    const fileBuffer = await fs.readFile(filepath);
    const mimeType = mime.getType(filepath) || "application/octet-stream";
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch (err) {
    return new NextResponse("File Not Found", { status: 404 });
  }
}
