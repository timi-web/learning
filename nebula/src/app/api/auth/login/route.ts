import { NextResponse } from "next/server";

import { generateSessionToken, verifyPassword } from "@/lib/auth";
import { createSession, findUserByEmail } from "@/lib/store";

type LoginPayload = {
  email: string;
  password: string;
};

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as LoginPayload;

  if (!body.email || !body.password) {
    return NextResponse.json(
      { error: { form: ["Email and password are required."] } },
      { status: 400 }
    );
  }

  const user = await findUserByEmail(body.email);
  if (!user || !verifyPassword(body.password, user.passwordHash)) {
    return NextResponse.json(
      { error: { form: ["Invalid email or password."] } },
      { status: 401 }
    );
  }

  const session = await createSession(user.id);
  const response = NextResponse.json({ success: true });
  response.cookies.set("nebula_session", session.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  response.cookies.set("nebula_user", user.name, {
    httpOnly: false,
    sameSite: "lax",
    path: "/"
  });
  return response;
}
