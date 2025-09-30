import { NextResponse } from "next/server";
import { buildDaily } from "@/server/aiDaily/buildDaily";

export async function GET() {
  try {
    const count = await buildDaily({ limit: 10 });
    return NextResponse.json({ ok: true, count });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "error" },
      { status: 500 }
    );
  }
}
