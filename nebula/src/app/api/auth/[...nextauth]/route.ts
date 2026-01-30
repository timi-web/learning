import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  return NextResponse.json(
    { message: "Nebula Lite uses cookie-based auth. Use /api/auth/login." },
    { status: 410 }
  );
}

export async function POST(): Promise<Response> {
  return NextResponse.json(
    { message: "Nebula Lite uses cookie-based auth. Use /api/auth/login." },
    { status: 410 }
  );
}
