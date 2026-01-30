import { NextResponse } from "next/server";

import { createProject, listProjects } from "@/lib/store";

type ProjectPayload = {
  organisationId: string;
  name: string;
  description?: string;
};

export async function GET(request: Request): Promise<Response> {
  const organisationId = new URL(request.url).searchParams.get("organisationId");
  if (!organisationId) {
    return NextResponse.json(
      { error: "organisationId is required" },
      { status: 400 }
    );
  }
  const projects = await listProjects(organisationId);
  return NextResponse.json({ projects });
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as ProjectPayload;
  if (!body.organisationId || !body.name) {
    return NextResponse.json(
      { error: "organisationId and name are required" },
      { status: 400 }
    );
  }
  const project = await createProject({
    organisationId: body.organisationId,
    name: body.name,
    description: body.description
  });
  return NextResponse.json({ project });
}
