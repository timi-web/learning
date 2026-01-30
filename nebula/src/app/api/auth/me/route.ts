import { NextResponse } from "next/server";

import { findUserById, getSession } from "@/lib/store";

export async function GET(request: Request): Promise<Response> {
  const sessionId = request.headers
    .get("cookie")
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith("nebula_session="))
    ?.split("=")[1];

  if (!sessionId) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const session = await getSession(sessionId);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
}
