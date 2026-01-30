import { NextResponse } from "next/server";

import { deleteSession } from "@/lib/store";

export async function POST(request: Request): Promise<Response> {
  const sessionId = request.headers
    .get("cookie")
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith("nebula_session="))
    ?.split("=")[1];

  if (sessionId) {
    await deleteSession(sessionId);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("nebula_session", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  response.cookies.set("nebula_user", "", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  return response;
}
