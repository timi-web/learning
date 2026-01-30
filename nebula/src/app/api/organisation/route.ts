import { NextResponse } from "next/server";

import { createOrganisation, listOrganisations } from "@/lib/store";

type OrganisationPayload = {
  name: string;
  ownerId: string;
};

export async function GET(request: Request): Promise<Response> {
  const ownerId = new URL(request.url).searchParams.get("ownerId");
  if (!ownerId) {
    return NextResponse.json({ error: "ownerId is required" }, { status: 400 });
  }
  const organisations = await listOrganisations(ownerId);
  return NextResponse.json({ organisations });
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as OrganisationPayload;
  if (!body.name || !body.ownerId) {
    return NextResponse.json(
      { error: "name and ownerId are required" },
      { status: 400 }
    );
  }
  const organisation = await createOrganisation({
    name: body.name,
    ownerId: body.ownerId
  });
  return NextResponse.json({ organisation });
}
