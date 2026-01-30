import { createHash } from "crypto";
import path from "path";

export async function getUploadUrl(
  key: string,
  _contentType: string
): Promise<string> {
  return `/uploads/${key}`;
}

export async function getDownloadUrl(key: string): Promise<string> {
  return `/uploads/${key}`;
}

export function generateStorageKey(orgId: string, filename: string): string {
  const timestamp = Date.now();
  const hash = createHash("md5")
    .update(`${orgId}-${filename}-${timestamp}`)
    .digest("hex")
    .slice(0, 8);
  return path.join(orgId, `${timestamp}-${hash}-${filename}`);
}

export function hashFile(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex");
}
