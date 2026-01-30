import { NextResponse } from "next/server";

import {
  createObligation,
  listObligations,
  updateObligationStatus
} from "@/lib/store";

type ObligationPayload = {
  projectId: string;
  title: string;
  description: string;
};

type StatusPayload = {
  obligationId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};

export async function GET(request: Request): Promise<Response> {
  const projectId = new URL(request.url).searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json({ error: "projectId is required" }, { status: 400 });
  }
  const obligations = await listObligations(projectId);
  return NextResponse.json({ obligations });
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as ObligationPayload;
  if (!body.projectId || !body.title) {
    return NextResponse.json(
      { error: "projectId and title are required" },
      { status: 400 }
    );
  }
  const obligation = await createObligation({
    projectId: body.projectId,
    title: body.title,
    description: body.description ?? ""
  });
  return NextResponse.json({ obligation });
}

export async function PATCH(request: Request): Promise<Response> {
  const body = (await request.json()) as StatusPayload;
  if (!body.obligationId || !body.status) {
    return NextResponse.json(
      { error: "obligationId and status are required" },
      { status: 400 }
    );
  }
  const obligation = await updateObligationStatus({
    obligationId: body.obligationId,
    status: body.status
  });
  return NextResponse.json({ obligation });
}
