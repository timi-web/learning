import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth";
import { createUser, findUserByEmail } from "@/lib/store";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as RegisterPayload;

    if (!body.name || body.name.length < 2) {
      return NextResponse.json(
        { error: { name: ["Name is required."] } },
        { status: 400 }
      );
    }

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json(
        { error: { email: ["Valid email required."] } },
        { status: 400 }
      );
    }

    if (!body.password || body.password.length < 6) {
      return NextResponse.json(
        { error: { password: ["Password must be at least 6 characters."] } },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { error: { confirmPassword: ["Passwords do not match."] } },
        { status: 400 }
      );
    }

    const existingUser = await findUserByEmail(body.email);
    if (existingUser) {
      return NextResponse.json(
        { error: { email: ["Email is already registered."] } },
        { status: 409 }
      );
    }

    await createUser({
      name: body.name,
      email: body.email,
      passwordHash: hashPassword(body.password)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration failed", error);
    return NextResponse.json(
      { error: { form: ["Unable to register right now."] } },
      { status: 500 }
    );
  }
}
