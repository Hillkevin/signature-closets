import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.password || typeof body.password !== "string") {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 500 },
    );
  }

  if (!verifyPassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
