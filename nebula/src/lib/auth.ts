import { createHash, randomBytes } from "crypto";

const salt = process.env.NEBULA_SALT ?? "nebula-lite";

export function hashPassword(password: string): string {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateSessionToken(): string {
  return randomBytes(24).toString("hex");
}
