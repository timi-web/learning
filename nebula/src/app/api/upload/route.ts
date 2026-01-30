import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { recordUpload } from "@/lib/store";

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadsDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadsDir, filename);
  await fs.writeFile(filePath, buffer);

  const upload = await recordUpload({
    filename,
    originalName: file.name,
    size: buffer.length
  });

  return NextResponse.json({ upload });
}
