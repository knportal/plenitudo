import { NextResponse } from "next/server";
import { buildDaily } from "@/server/aiDaily/buildDaily";

export async function GET() {
  try {
    const count = await buildDaily({ limit: 10 });
    return NextResponse.json({ ok: true, count });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { ok: false, error: e.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
